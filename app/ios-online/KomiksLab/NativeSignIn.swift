import Foundation
import AuthenticationServices
import CryptoKit
import UIKit
import WebKit

/// Вхід у застосунку (від 1.0.1).
///
/// 1. «Sign in with Apple» — нативне вікно Apple (ASAuthorizationAppleIDProvider). Сторінка надсилає в обробник
///    `KomiksAppleSignIn` рядок JSON `{"type":"start","nonce":"…"}` (nonce видає сервер, api/apple-native.php);
///    у запит Apple іде лише sha256(nonce) — Apple вписує його в identityToken, а сервер звіряє.
///    Відповідь: `window.KomiksAppleNative._result({identityToken, authorizationCode, user, email?, fullName?})`
///    або `_result({error: "cancelled" | "failed" | …})`. Особу визначає ЛИШЕ сервер — за перевіреним identityToken.
///    Із fullName передаємо тільки ім'я (givenName): прізвище нам не потрібне.
///
/// 2. Google — лише разом з Apple (App Review 4.8). Вбудований WebView Google не пускає, тому адресу
///    accounts.google.com відкриваємо в ASWebAuthenticationSession (системне вікно Safari). Сервер повертає
///    одноразовий код через `komikslab://google?h=…` (той самий шлях, що в Android: app_ch + google_handoff),
///    і ми передаємо його сторінці як `#/login/gapp?h=…`.
final class NativeSignIn: NSObject, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding,
                          ASWebAuthenticationPresentationContextProviding {
    weak var web: WKWebView?
    private var controller: ASAuthorizationController?
    private var webSession: ASWebAuthenticationSession?

    // MARK: Sign in with Apple

    func startApple(nonce raw: String) {
        // nonce від сервера — 64 hex-символи (rand_hex(32)); інше не приймаємо
        guard raw.range(of: "^[A-Za-z0-9_-]{16,128}$", options: .regularExpression) != nil else {
            emit(["error": "nonce"]); return
        }
        guard controller == nil else { emit(["error": "busy"]); return }
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]
        request.nonce = Self.sha256(raw)
        let c = ASAuthorizationController(authorizationRequests: [request])
        c.delegate = self
        c.presentationContextProvider = self
        controller = c
        c.performRequests()
    }

    /// sha256 у нижньому регістрі hex — так само рахує сервер: hash('sha256', $nonce).
    static func sha256(_ text: String) -> String {
        SHA256.hash(data: Data(text.utf8)).map { String(format: "%02x", $0) }.joined()
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        self.controller = nil
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential,
              let tokenData = credential.identityToken, let identityToken = String(data: tokenData, encoding: .utf8),
              let codeData = credential.authorizationCode, let authorizationCode = String(data: codeData, encoding: .utf8) else {
            emit(["error": "credential"]); return
        }
        var payload: [String: Any] = ["identityToken": identityToken, "authorizationCode": authorizationCode, "user": credential.user]
        if let email = credential.email { payload["email"] = email }   // лише при першому вході; сервер бере пошту з токена
        if let given = credential.fullName?.givenName, !given.isEmpty { payload["fullName"] = ["givenName": given] }
        emit(payload)
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        self.controller = nil
        var code = "failed"
        if let e = error as? ASAuthorizationError {
            switch e.code {
            case .canceled: code = "cancelled"
            case .notHandled: code = "not_handled"
            case .invalidResponse: code = "invalid_response"
            default: code = "failed"
            }
        }
        emit(["error": code])
    }

    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor { anchor() }

    // MARK: Google (ASWebAuthenticationSession)

    func startGoogle(_ url: URL) {
        guard webSession == nil else { return }
        let session = ASWebAuthenticationSession(url: url, callbackURLScheme: "komikslab") { [weak self] callback, error in
            DispatchQueue.main.async {
                guard let self else { return }
                self.webSession = nil
                var query = "e=google-error"
                if let callback, callback.scheme == "komikslab", callback.host == "google", let q = callback.query,
                   q.range(of: "^[A-Za-z0-9=&_-]{1,200}$", options: .regularExpression) != nil {
                    query = q
                } else if let e = error as? ASWebAuthenticationSessionError, e.code == .canceledLogin {
                    query = "e=google-cancelled"
                }
                // query перевірено білим списком символів — безпечно вставляти в рядок JS
                self.web?.evaluateJavaScript("location.hash = '#/login/gapp?\(query)';", completionHandler: nil)
            }
        }
        session.presentationContextProvider = self
        session.prefersEphemeralWebBrowserSession = false
        webSession = session
        if !session.start() {
            webSession = nil
            web?.evaluateJavaScript("location.hash = '#/login/gapp?e=google-error';", completionHandler: nil)
        }
    }

    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor { anchor() }

    // MARK: спільне

    private func anchor() -> ASPresentationAnchor {
        if let window = web?.window { return window }
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.compactMap { $0.keyWindow }.first ?? scenes.first?.windows.first ?? ASPresentationAnchor()
    }

    private func emit(_ payload: [String: Any]) {
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        DispatchQueue.main.async { [weak self] in
            self?.web?.evaluateJavaScript("window.KomiksAppleNative && window.KomiksAppleNative._result(\(json));", completionHandler: nil)
        }
    }
}
