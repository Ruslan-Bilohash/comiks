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
    private var productId = ""
    private var accountToken: UUID?
    private var product: Product?
    private var pending: [UInt64: Transaction] = [:]
    private var updates: Task<Void, Never>?

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
        case "billing_config":
            guard let id = body["productId"] as? String, id.range(of: "^[a-z0-9._]{3,80}$", options: .regularExpression) != nil,
                  let tokenText = body["appAccountToken"] as? String, let token = UUID(uuidString: tokenText) else {
                emit(["type": "billing_state", "state": "error", "code": "config"]); return
            }
            productId = id; accountToken = token
            await loadProduct()
            await restore()
        case "billing_purchase":
            await purchase()
        case "billing_restore":
            try? await AppStore.sync()
            await restore()
        case "billing_manage":
            if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                try? await AppStore.showManageSubscriptions(in: scene)
            }
        case "billing_server_state":
            // сервер підтвердив покупку — тепер можна завершити транзакцію в StoreKit
            if (body["verified"] as? Bool) == true {
                for (_, tx) in pending { await tx.finish() }
                pending.removeAll()
                emit(["type": "billing_state", "state": "verified"])
            }
        default: break
        }
    }

    private func loadProduct() async {
        do {
            guard let p = try await Product.products(for: [productId]).first else {
                emit(["type": "billing_state", "state": "unavailable", "code": "product"]); return
            }
            product = p
            var trial = false
            if let offer = p.subscription?.introductoryOffer, offer.paymentMode == .freeTrial,
               await p.subscription?.isEligibleForIntroOffer == true { trial = true }
            emit(["type": "billing_product", "state": "ready", "formattedPrice": p.displayPrice,
                  "productId": p.id, "freeTrial": trial ? "true" : "false"])
        } catch {
            emit(["type": "billing_state", "state": "error", "code": "product"])
        }
    }

    private func purchase() async {
        if product == nil { await loadProduct() }
        guard let product, let accountToken else { emit(["type": "billing_state", "state": "error", "code": "not_ready"]); return }
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
        guard case .verified(let tx) = result, tx.productID == productId || productId.isEmpty else { return }
        if productId.isEmpty { return }   // ще немає акаунта — сервер не зможе прив'язати покупку
        pending[tx.id] = tx
        emit(["type": kind, "state": "server_verify", "signedTransaction": result.jwsRepresentation])
    }

    private func emit(_ payload: [String: Any]) {
        guard let web, let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        web.evaluateJavaScript("window.KomiksMoney && window.KomiksMoney._nativeMessage(\(json));", completionHandler: nil)
    }
}
