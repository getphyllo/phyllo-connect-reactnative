//
//  AppDelegate.swift
//  rn_phylloconnect
//
//  Created by Pankaj Patel on 25/01/22.
//

import Foundation
import UIKit

#if DEBUG
#if FB_SONARKIT_ENABLED
import FlipperKit
#endif
#endif

var rtcBridge :RCTBridge?

class PublicBridgeHelper {
    func getBridge () -> RCTBridge {
    return rtcBridge!
  }
}


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  var window: UIWindow?
  var bridge: RCTBridge!
  
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    
    #if DEBUG
    initializeFlipper(with: application)
    #endif
    let jsCodeLocation: URL
    
    jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "rn_phylloconnect", initialProperties: nil, launchOptions: launchOptions)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    rtcBridge = rootView.bridge
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    return true
  }
  
  private func initializeFlipper(with application: UIApplication) {
    #if DEBUG
    #if FB_SONARKIT_ENABLED
    let client = FlipperClient.shared()
    let layoutDescriptorMapper = SKDescriptorMapper(defaults: ())
    FlipperKitLayoutComponentKitSupport.setUpWith(layoutDescriptorMapper)
    client?.add(FlipperKitLayoutPlugin(rootNode: application, with: layoutDescriptorMapper!))
    client?.add(FKUserDefaultsPlugin(suiteName: nil))
    client?.add(FlipperKitReactPlugin())
    client?.add(FlipperKitNetworkPlugin(networkAdapter: SKIOSNetworkAdapter()))
    client?.add(FlipperReactPerformancePlugin.sharedInstance())
    client?.start()
    #endif
    #endif
  }
}
