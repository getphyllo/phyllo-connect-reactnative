#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
@interface RCT_EXTERN_MODULE(PhylloConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)config)
RCT_EXTERN_METHOD(open)
//RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:(NSString *)env)

RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:(NSString *)environment resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
// RCT_EXTERN_METHOD(
//     resolvePromise: (RCTPromiseResolveBlock) resolve
//     rejecter: (RCTPromiseRejectBlock) reject
//   )
//   RCT_EXTERN_METHOD(getphylloBaseUrl:(nonnull NSString *)name)
//   RCT_EXTERN_METHOD(getBaseUrl: (RCTResponseSenderBlock)callback)
@end
