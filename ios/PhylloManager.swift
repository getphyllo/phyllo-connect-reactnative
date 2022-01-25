//
//  PhylloManager.swift
//  rn_phylloconnect
//
//  Created by Pankaj Patel on 25/01/22.
//

import Foundation
import PhylloConnect

var bridgeHelperInstance = PublicBridgeHelper()
var nativeMethodsInstance = NativeMethods()

@objc(PhylloManager)
public class PhylloManager: NSObject {

  func PhylloManager() -> PhylloManager {
    return PhylloManager()
  }
  
  func initialize(clientDisplayName:String,token:String,userId:String ,environment:String, workPlatformId:String) {
    
    print("Call from RN")
    DispatchQueue.main.async {
      var phylloConfig = PhylloConfig()
      phylloConfig.clientDisplayName = clientDisplayName
      phylloConfig.token = token
      phylloConfig.userId = userId
      phylloConfig.environment = self.getEnvironment(env: environment)
      phylloConfig.workPlatformId = workPlatformId
      PhylloConnect.shared.initialize(config: phylloConfig)
      PhylloConnect.shared.phylloConnectDelegate = self
      PhylloConnect.shared.open()
    }
  }
  
  func getEnvironment(env:String) -> PhylloEnvironment {
    switch env {
    case "dev":
      return PhylloEnvironment.dev
    case "sandbox":
      return PhylloEnvironment.sandbox
    case "prod":
      return PhylloEnvironment.prod
    default:
      return PhylloEnvironment.sandbox
    }
  }
}
extension PhylloManager : PhylloConnectDelegate {
  
  public func onAccountConnected(account_id: String, work_platform_id: String, user_id: String) {
    print("onAccountConnected => account_id : \(account_id),work_platform_id : \(work_platform_id),user_id : \(user_id)")
    
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["account_id"] = account_id
      dic["work_platform_id"] = work_platform_id
      dic["user_id"] = user_id
      let __bridge = bridgeHelperInstance.getBridge()
      __bridge.eventDispatcher().sendAppEvent(withName: "onAccountConnected", body: dic)
    }
    
  }
  
  public func onAccountDisconnected(account_id: String, work_platform_id: String, user_id: String) {
    print("onAccountDisconnected => account_id : \(account_id),work_platform_id : \(work_platform_id),user_id : \(user_id)")
    
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["account_id"] = account_id
      dic["work_platform_id"] = work_platform_id
      dic["user_id"] = user_id
      let __bridge = bridgeHelperInstance.getBridge()
      __bridge.eventDispatcher().sendAppEvent(withName: "onAccountDisconnected", body: dic)
    }
  }
  
  public func onTokenExpired(user_id: String) {
    print("onTokenExpired => user_id : \(user_id)")
    
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["user_id"] = user_id
      let __bridge = bridgeHelperInstance.getBridge()
      __bridge.eventDispatcher().sendAppEvent(withName: "onTokenExpired", body: dic)
    }
  }
  
  public func onExit(reason: String, user_id: String) {
    print("onExit => reason : \(reason),user_id : \(user_id)")
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["user_id"] = user_id
      dic["reason"] = reason
      let __bridge = bridgeHelperInstance.getBridge()
      __bridge.eventDispatcher().sendAppEvent(withName: "onExit", body: dic)
    }
  }
}
