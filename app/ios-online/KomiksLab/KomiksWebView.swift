import SwiftUI
import WebKit

/// WKWebView із сайтом. Довіряємо лише https://bilohash.com/comiks — решту посилань відкриваємо в Safari.
/// Доступність: VoiceOver, збільшений текст і Switch Control працюють у WKWebView нативно;
/// масштабування не вимикаємо (сайт сам має екран доступності).
struct KomiksWebView: UIViewRepresentable {
    static let home = URL(string: "https://bilohash.com/comiks/?app=ios")!
    let store: StoreKitBridge

    func makeCoordinator() -> Coordinator { Coordinator(store: store) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.applicationNameForUserAgent = "KomiksLabIOS/" + (Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0.0")
        let controller = WKUserContentController()
        controller.add(context.coordinator, name: "KomiksStoreKit")
        config.userContentController = controller

        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.uiDelegate = context.coordinator
        web.allowsBackForwardNavigationGestures = true
        web.scrollView.contentInsetAdjustmentBehavior = .automatic
        web.backgroundColor = UIColor(named: "LaunchBackground")
        web.isOpaque = false
        web.accessibilityLabel = "Komiks·Lab"
        context.coordinator.web = web
        store.web = web

        let refresh = UIRefreshControl()
        refresh.addTarget(context.coordinator, action: #selector(Coordinator.reload(_:)), for: .valueChanged)
        web.scrollView.refreshControl = refresh

        web.load(URLRequest(url: Self.home))
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
        let store: StoreKitBridge
        weak var web: WKWebView?
        init(store: StoreKitBridge) { self.store = store }

        static func trusted(_ url: URL?) -> Bool {
            guard let url, url.scheme == "https", url.host == "bilohash.com" else { return false }
            return url.path.hasPrefix("/comiks")
        }

        @objc func reload(_ sender: UIRefreshControl) {
            web?.reload()
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) { sender.endRefreshing() }
        }

        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url else { decisionHandler(.cancel); return }
            if Self.trusted(url) || url.scheme == "about" { decisionHandler(.allow); return }
            // вбудовані фрейми (відео YouTube на головній) лишаються всередині сторінки
            if action.targetFrame?.isMainFrame == false, url.scheme == "https" { decisionHandler(.allow); return }
            // зовнішні посилання (Google Play, YouTube, пошта) — у системі, а не всередині застосунку
            if action.targetFrame?.isMainFrame ?? true, ["https", "mailto", "tel"].contains(url.scheme ?? "") {
                UIApplication.shared.open(url)
            }
            decisionHandler(.cancel)
        }

        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url {
                if Self.trusted(url) { webView.load(URLRequest(url: url)) } else { UIApplication.shared.open(url) }
            }
            return nil
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { showOffline(webView) }
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { showOffline(webView) }

        private func showOffline(_ webView: WKWebView) {
            let html = """
            <html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1">
            <style>body{font:17px -apple-system,system-ui;background:#fff8ea;color:#1d1d1d;display:flex;align-items:center;justify-content:center;height:90vh;text-align:center;padding:24px}
            button{font:inherit;font-weight:700;padding:14px 24px;min-height:44px;border:3px solid #1d1d1d;border-radius:14px;background:#ffd23f}</style></head>
            <body><main><h1>No internet</h1><p>Komiks·Lab needs a connection. Check Wi-Fi or mobile data and try again.</p>
            <button onclick="location.href='\(KomiksWebView.home.absoluteString)'">Try again</button></main></body></html>
            """
            webView.loadHTMLString(html, baseURL: KomiksWebView.home)
        }

        /// Повідомлення з monetization.js (ті самі типи, що й в Android): billing_config, billing_purchase,
        /// billing_restore, billing_manage, billing_server_state. Приймаємо лише з довіреної сторінки.
        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "KomiksStoreKit", message.frameInfo.isMainFrame,
                  Self.trusted(message.frameInfo.request.url) || Self.trusted(web?.url),
                  let raw = message.body as? String, raw.count < 4096,
                  let data = raw.data(using: .utf8),
                  let body = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let type = body["type"] as? String else { return }
            Task { @MainActor in await store.handle(type: type, body: body) }
        }
    }
}
