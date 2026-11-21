import Foundation
import StoreKit
import WebKit
import UIKit

/// Оплата Premium через StoreKit 2. Застосунок нічого не «дарує» сам:
/// підписана транзакція Apple (JWS) іде на сервер (api/app-store.php), і лише сервер вмикає Premium.
/// Транзакцію завершуємо (finish) після того, як сервер підтвердив її.
@MainActor
final class StoreKitBridge: ObservableObject {
    weak var web: WKWebView?
    private let productId = "komiks_premium_monthly"
    private var accountToken: UUID?
    private var product: Product?
    private var productRequest: Task<Product?, Error>?
    private var purchaseInProgress = false
    private var awaitingVerification: UInt64?
    private var queued: [UInt64: (transaction: Transaction, message: [String: Any])] = [:]
    private var updates: Task<Void, Never>?

    func resetSession() {
        accountToken = nil
        queued.removeAll()
        awaitingVerification = nil
    }

    func startListening() {
        guard updates == nil else { return }
        updates = Task { [weak self] in
            for await result in Transaction.updates {
                await self?.deliver(result, kind: "billing_restore")
            }
        }
    }

    func handle(type: String, body: [String: Any]) async {
        switch type {
        case "billing_price":
            await loadProduct()
        case "billing_config":
            guard body["productId"] as? String == productId,
                  let tokenText = body["appAccountToken"] as? String,
                  let token = UUID(uuidString: tokenText) else {
                emit(["type": "billing_state", "state": "error", "code": "config"])
                return
            }
            let accountChanged = accountToken != token
            accountToken = token
            await loadProduct()
            if accountChanged { await restore() }
        case "billing_purchase":
            await purchase()
        case "billing_restore":
            do {
                try await AppStore.sync()
                await restore()
            } catch {
                emit(["type": "billing_state", "state": "error", "code": "restore"])
            }
        case "billing_manage":
            if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                try? await AppStore.showManageSubscriptions(in: scene)
            }
        case "billing_server_state":
            guard let id = awaitingVerification, let entry = queued.removeValue(forKey: id) else { return }
            if body["verified"] as? Bool == true {
                await entry.transaction.finish()
                emit(["type": "billing_state", "state": "verified"])
            }
            awaitingVerification = nil
            sendNextTransaction()
        default: break
        }
    }

    private func loadProduct() async {
        do {
            guard let loaded = try await fetchProduct(),
                  loaded.type == .autoRenewable, let subscription = loaded.subscription,
                  subscription.subscriptionPeriod.unit == .month, subscription.subscriptionPeriod.value == 1 else {
                product = nil
                emit(["type": "billing_state", "state": "unavailable", "code": "product"])
                return
            }
            product = loaded
            var trial = false
            if let offer = subscription.introductoryOffer, offer.paymentMode == .freeTrial,
               offer.period.unit == .day, offer.period.value * offer.periodCount == 3 {
                trial = await subscription.isEligibleForIntroOffer
            }
            emit(["type": "billing_product", "state": "ready", "formattedPrice": loaded.displayPrice,
                  "productId": loaded.id, "freeTrial": trial ? "true" : "false"])
        } catch {
            product = nil
            emit(["type": "billing_state", "state": "error", "code": "product"])
        }
    }

    private func fetchProduct() async throws -> Product? {
        if let productRequest { return try await productRequest.value }
        let id = productId
        let request = Task { try await Product.products(for: [id]).first }
        productRequest = request
        defer { productRequest = nil }
        return try await request.value
    }

    private func purchase() async {
        guard !purchaseInProgress else { return }
        guard let product, let accountToken else {
            emit(["type": "billing_state", "state": "error", "code": "not_ready"])
            return
        }
        purchaseInProgress = true
        defer { purchaseInProgress = false }
        do {
            let result = try await product.purchase(options: [.appAccountToken(accountToken)])
            switch result {
            case .success(let verification): await deliver(verification, kind: "billing_purchase")
            case .pending: emit(["type": "billing_purchase", "state": "pending"])
            case .userCancelled: emit(["type": "billing_state", "state": "canceled"])
            @unknown default: emit(["type": "billing_state", "state": "error", "code": "purchase"])
            }
        } catch {
            emit(["type": "billing_state", "state": "error", "code": "purchase"])
        }
    }

    private func restore() async {
        var found = false
        for await result in Transaction.currentEntitlements {
            if case .verified(let tx) = result, tx.productID == productId { found = true }
            await deliver(result, kind: "billing_restore")
        }
        if !found { emit(["type": "billing_restore", "state": "none"]) }
    }

    /// Передаємо на сервер лише транзакції, які StoreKit перевірив, і лише нашого продукту.
    private func deliver(_ result: VerificationResult<Transaction>, kind: String) async {
        guard accountToken != nil, case .verified(let tx) = result, tx.productID == productId else { return }
        guard queued[tx.id] == nil, awaitingVerification != tx.id else { return }
        queued[tx.id] = (tx, ["type": kind, "state": "server_verify", "signedTransaction": result.jwsRepresentation])
        sendNextTransaction()
    }

    private func sendNextTransaction() {
        guard awaitingVerification == nil, let (id, entry) = queued.first else { return }
        awaitingVerification = id
        emit(entry.message)
    }

    private func emit(_ payload: [String: Any]) {
        guard let web, let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        let condition = payload["type"] as? String == "billing_product"
            ? "window.KomiksMoney && window.KomiksMoney.state().billing !== 'disabled'"
            : "window.KomiksMoney"
        web.evaluateJavaScript("\(condition) && window.KomiksMoney._nativeMessage(\(json));", completionHandler: nil)
    }
}
