import SwiftUI
import WebKit
import StoreKit

/// WKWebView із сайтом. Довіряємо лише https://bilohash.com/comiks — решту посилань відкриваємо в Safari.
/// Доступність: VoiceOver, Switch Control, «Зменшити рух» і «Підвищити контраст» (prefers-* у CSS) працюють у WKWebView нативно.
/// Збільшений текст iOS (Dynamic Type) WKWebView сам НЕ застосовує — тому масштабуємо сторінку через pageZoom
/// за системним розміром тексту й стежимо за його зміною. Масштабування пальцями не вимикаємо.
/// Вхід через Apple використовує нативний обробник KomiksAppleSignIn.
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
        controller.add(context.coordinator, name: "KomiksAppleSignIn")   // 1.0.1: нативний «Sign in with Apple»
        controller.add(context.coordinator, name: "KomiksReview")        // 1.0.2: системне вікно відгуку App Store
        controller.addUserScript(WKUserScript(source: Self.storefrontScript,
                                              injectionTime: .atDocumentStart, forMainFrameOnly: true))
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
        context.coordinator.signIn.web = web
        store.web = web

        let refresh = UIRefreshControl()
        refresh.addTarget(context.coordinator, action: #selector(Coordinator.reload(_:)), for: .valueChanged)
        web.scrollView.refreshControl = refresh

        context.coordinator.applyTextSize()
        NotificationCenter.default.addObserver(context.coordinator, selector: #selector(Coordinator.textSizeChanged),
                                               name: UIContentSizeCategory.didChangeNotification, object: nil)

        web.load(URLRequest(url: Self.home))
        return web
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    private static let storefrontScript = #"""
    (() => {
      if (location.origin !== 'https://bilohash.com' || !/^\/comiks(?:\/|$)/.test(location.pathname)) return;

      const style = document.createElement('style');
      style.textContent = '.au-google, .au-steam { display: none !important; }';
      if (document.documentElement) document.documentElement.append(style);
      else document.addEventListener('DOMContentLoaded', () => document.head.append(style), { once: true });

      function observePremium() {
        let priceElement;
        function requestPrice() {
          const next = document.querySelector('.monetization-premium [data-play-price]');
          if (next === priceElement) return;
          priceElement = next;
          if (next) window.webkit.messageHandlers.KomiksStoreKit.postMessage('{"type":"billing_price"}');
        }
        new MutationObserver(requestPrice).observe(document.body, { childList: true, subtree: true });
        requestPrice();

        document.addEventListener('click', event => {
          const button = event.target instanceof Element && event.target.closest('.monetization-premium [data-play-buy]');
          if (!button || window.KomiksAccess?.state().account !== false) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          location.hash = '#/login';
        }, true);
      }

      document.addEventListener('DOMContentLoaded', observePremium, { once: true });
    })();
    """#

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
        let store: StoreKitBridge
        let signIn = NativeSignIn()
        weak var web: WKWebView?
        init(store: StoreKitBridge) { self.store = store }

        static func trusted(_ url: URL?) -> Bool {
            guard let url, url.scheme == "https", url.host == "bilohash.com" else { return false }
            return url.path == "/comiks" || url.path.hasPrefix("/comiks/")
        }

        static func isUnsupportedSignIn(_ url: URL) -> Bool {
            url.host == "accounts.google.com" || url.host == "steamcommunity.com" && url.path.hasPrefix("/openid/")
        }

        /// Розмір тексту iOS → масштаб сторінки (сайт адаптивний, тож текст переноситься, а не обрізається).
        static func zoom(for c: UIContentSizeCategory) -> CGFloat {
            switch c {
            case .extraSmall: return 0.85
            case .small: return 0.9
            case .medium: return 0.95
            case .large: return 1.0          // типовий розмір iOS
            case .extraLarge: return 1.1
            case .extraExtraLarge: return 1.2
            case .extraExtraExtraLarge: return 1.3
            case .accessibilityMedium: return 1.5
            case .accessibilityLarge: return 1.7
            case .accessibilityExtraLarge: return 1.85
            case .accessibilityExtraExtraLarge, .accessibilityExtraExtraExtraLarge: return 2.0
            default: return 1.0
            }
        }
        func applyTextSize() { web?.pageZoom = Self.zoom(for: UIApplication.shared.preferredContentSizeCategory) }
        @objc func textSizeChanged() { DispatchQueue.main.async { self.applyTextSize() } }

        @objc func reload(_ sender: UIRefreshControl) {
            web?.reload()
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) { sender.endRefreshing() }
        }

        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                     decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url else { decisionHandler(.cancel); return }
            if Self.isUnsupportedSignIn(url) { decisionHandler(.cancel); return }
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
            if let url = action.request.url, !Self.isUnsupportedSignIn(url) {
                if Self.trusted(url) { webView.load(URLRequest(url: url)) } else { UIApplication.shared.open(url) }
            }
            return nil
        }

        func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
            store.resetSession()
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
        /// billing_restore, billing_manage, billing_server_state — і з auth.js: KomiksAppleSignIn {type: "start", nonce}.
        /// Приймаємо лише з головного кадру довіреної сторінки.
        func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.name == "KomiksStoreKit" || message.name == "KomiksAppleSignIn" || message.name == "KomiksReview", message.frameInfo.isMainFrame,
                  Self.trusted(message.frameInfo.request.url) || Self.trusted(web?.url),
                  let raw = message.body as? String, raw.count < 4096,
                  let data = raw.data(using: .utf8),
                  let body = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let type = body["type"] as? String else { return }
            if message.name == "KomiksReview" {
                // ⭐ Лише системне вікно Apple (правило 5.6.1): iOS сама вирішує, чи показати його (не більше 3 разів на рік)
                guard type == "review" else { return }
                Task { @MainActor in
                    if let scene = UIApplication.shared.connectedScenes.first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
                        AppStore.requestReview(in: scene)
                    }
                }
                return
            }
            if message.name == "KomiksAppleSignIn" {
                guard type == "start", let nonce = body["nonce"] as? String else { return }
                signIn.startApple(nonce: nonce)
                return
            }
            Task { @MainActor in await store.handle(type: type, body: body) }
        }
    }
}
