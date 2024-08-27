//
//  AppDelegate.swift
//  RudderTyperSwiftExample
//
//  Created by Satheesh Kannan on 12/08/24.
//

import UIKit
import Rudder

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        self.initAnalyticsSDK()
        
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
}

// MARK: - Rudder SDK Initialization

extension AppDelegate {
    func initAnalyticsSDK() {
        guard let path = Bundle.main.path(forResource: "RudderConfig", ofType: "plist"),
                let data = try? Data(contentsOf: URL(fileURLWithPath: path)),
                let rudderConfig = try? PropertyListDecoder().decode(RudderConfig.self, from: data)
        else { return }
        
        let builder = RSConfigBuilder()
            .withDataPlaneUrl(rudderConfig.dataPlaneUrl)
            .withControlPlaneUrl(rudderConfig.controlPlaneUrl)
            .withTrackLifecycleEvens(false)
            .withLoglevel(RSLogLevelVerbose)
        
        RSClient.getInstance(rudderConfig.writeKey, config: builder.build())
    }
}
