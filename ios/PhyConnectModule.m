//
//  PhyConnectModule.m
//  PhyConnectModule
//
//  Copyright © 2022 Pankaj Patel. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PhyConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:clientDisplayName:token:userId:environment:workPlatformId)
RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:env)
RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:env:callbackMethod:(RCTResponseSenderBlock)callback))

@end
