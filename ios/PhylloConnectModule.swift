//
//  PhyConnectModule.swift
//  PhyConnectModule
//
//  Copyright © 2022 Phyllo. All rights reserved.
//


import Foundation
import PhylloConnect


@objc(PhylloConnectModule)
public class PhylloConnectModule: RCTEventEmitter {
    
    var hasObservers:Bool?
    
    override public func supportedEvents() -> [String]! {
        return ["onAccountConnected","onAccountDisconnected","onTokenExpired","onExit"]
    }
    
    public override init() {
        super.init()
    }
    
    public override func startObserving() {
        self.hasObservers = true
        super.startObserving()
    }
    
    public override func stopObserving() {
        self.hasObservers = false
        super.stopObserving()
    }
    
    
    @objc(initialize:::::)
    func initialize(clientDisplayName:String,token:String,userId:String ,environment:String, workPlatformId:String) {
        DispatchQueue.main.async {
            var phylloConfig = PhylloConfig()
          
            phylloConfig.clientDisplayName = clientDisplayName
            phylloConfig.token = "Bearer \(token)"
            phylloConfig.userId = userId
            phylloConfig.environment = self.getEnvironment(env: environment)
            phylloConfig.workPlatformId = workPlatformId
            PhylloConnect.shared.initialize(config: phylloConfig)
        }
    }

   @objc(open)
    func open() {
        DispatchQueue.main.async {
            PhylloConnect.shared.phylloConnectDelegate = self
            PhylloConnect.shared.open()
        }
    }
    

    func getEnvironment(env:String) -> PhylloEnvironment {
        switch env {
        case "development":
            return PhylloEnvironment.dev
        case "sandbox":
            return PhylloEnvironment.sandbox
        case "production":
            return PhylloEnvironment.prod
        default:
            return PhylloEnvironment.sandbox
        }
    }
    
    @objc public override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

extension PhylloConnectModule : PhylloConnectDelegate {
  
  public func onAccountConnected(account_id: String, work_platform_id: String, user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["account_id"] = account_id
      dic["work_platform_id"] = work_platform_id
      dic["user_id"] = user_id
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onAccountConnected", body: dic)
      }
    }
    
  }
  
  public func onAccountDisconnected(account_id: String, work_platform_id: String, user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["account_id"] = account_id
      dic["work_platform_id"] = work_platform_id
      dic["user_id"] = user_id
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onAccountDisconnected", body: dic)
      }
    }
  }
  
  public func onTokenExpired(user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["user_id"] = user_id
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onTokenExpired", body: dic)
      }
    }
  }
  
  public func onExit(reason: String, user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var dic = [String:String]()
      dic["user_id"] = user_id
      dic["reason"] = reason
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onExit", body: dic)
      }
    }
  }
}
