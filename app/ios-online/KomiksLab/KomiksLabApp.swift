import SwiftUI

/// Komiks·Lab для iPhone/iPad: вікно з сайтом bilohash.com/comiks (як Android 1.3)
/// плюс оплата Premium через StoreKit 2. Premium вмикає лише сервер після перевірки підпису Apple.
@main
struct KomiksLabApp: App {
    @StateObject private var store = StoreKitBridge()

    var body: some Scene {
        WindowGroup {
            KomiksWebView(store: store)
                .ignoresSafeArea(edges: .bottom)
                .background(Color("LaunchBackground"))
                .task { store.startListening() }
        }
    }
}
