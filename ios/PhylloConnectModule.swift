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

        var phylloConfig = [String:Any]()
        phylloConfig["environment"] = self.getEnvironment(env: environment)
        phylloConfig["clientDisplayName"] = clientDisplayName
        phylloConfig["token"] = token
        phylloConfig["userId"] = userId
        phylloConfig["delegate"] = self
        phylloConfig["workPlatformId"] = workPlatformId
        phylloConfig["external_sdk_name"] = "reactnative" //for Tracking
        phylloConfig["external_sdk_version"] = "0.3.0"  

        PhylloConnect.shared.initialize(config: phylloConfig)
            PhylloConnect.shared.initialize(config: phylloConfig)
        }
    }

   @objc(open)
    func open() {
        DispatchQueue.main.async {
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
      var values : [String] = [account_id, work_platform_id, user_id]
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onAccountConnected", body: values)
      }
    }
    
  }
  
  public func onAccountDisconnected(account_id: String, work_platform_id: String, user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var values : [String] = [account_id, work_platform_id, user_id]
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onAccountDisconnected", body: values)
      }
    }
  }
  
  public func onTokenExpired(user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var values : [String] = [user_id]
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onTokenExpired", body: values)
      }
    }
  }

  
  public func onExit(reason: String, user_id: String) {
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var values = [reason, user_id]
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onExit", body: values)
      }
    }
  }

  public func onConnectionFailure(reason: String,work_platform_id:String ,user_id: String) { 
    //Event Sent After Get Connect
    DispatchQueue.main.async {
      var values = [reason,work_platform_id,user_id]
      if self.hasObservers ?? false {
            self.sendEvent(withName: "onConnectionFailure", body: values)
      }
    }
  }
}
