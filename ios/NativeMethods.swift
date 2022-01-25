//
//  NativeMethods.swift
//  parcelbound
//
//  Created by Pankaj Patel on 17/09/21.
//

import Foundation

public var phylloConnectInstance = PhylloManager()  //DeviceManager.swift instance
var nativeMethodInstance = NativeMethods()


@objc(NativeMethods)
public class NativeMethods: RCTEventEmitter {
  
  override public func supportedEvents() -> [String]! {
    //I will be honest, I am sending these events from DeviceManager.swift, but react native's packager gripes if I dont put the events that DeviceManager.swift is sending through the rootView's bridge here
    return ["onAccountConnected","onAccountDisconnected","onTokenExpired","onExit"]
  }
  
  public override init() {
    super.init()
  }
  
  @objc(initialize:::::)
  func initialize(clientDisplayName:String,token:String,userId:String ,environment:String, workPlatformId:String) {
    debugPrint("start initialize ..........")
    phylloConnectInstance.initialize(clientDisplayName: clientDisplayName, token: token, userId: userId, environment: environment, workPlatformId: workPlatformId)
  }
    
  @objc public override static func requiresMainQueueSetup() -> Bool {
      return false
  }
}
