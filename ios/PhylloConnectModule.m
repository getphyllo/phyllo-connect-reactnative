//
//  PhyConnectModule.m
//  PhyConnectModule
//
//  Copyright © 2022 Pankaj Patel. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PhylloConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:clientDisplayName:token:userId:environment:workPlatformId)
RCT_EXTERN_METHOD(open)
RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:env:(RCTResponseSenderBlock)callback)

@end
