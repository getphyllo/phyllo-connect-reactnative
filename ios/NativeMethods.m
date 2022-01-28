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
@end
