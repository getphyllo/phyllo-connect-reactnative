//
//  NativeMethods.m
//  parcelbound
//
//  Created by Pankaj Patel on 17/09/21.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>

@interface RCT_EXTERN_MODULE(NativeMethods, NSObject)
  
  RCT_EXTERN_METHOD(initialize:clientDisplayName:token:userId:environment:workPlatformId)
  RCT_EXTERN_METHOD(onAccountConnected:account_id:work_platform_id:user_id:)

@end
