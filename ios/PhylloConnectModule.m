#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <Foundation/Foundation.h>
@interface RCT_EXTERN_MODULE(PhylloConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSDictionary *)config)
RCT_EXTERN_METHOD(open)
RCT_EXTERN_METHOD(getPhylloEnvironmentUrl:(NSString *)environment callback: (RCTResponseSenderBlock)callback)
@end
