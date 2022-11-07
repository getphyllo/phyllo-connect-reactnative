#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PhylloConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)clientDisplayName:(NSString *)token:(NSString *)userId:(NSString *)environment:(NSString *)workPlatformId:(BOOL *)singleAccount)
RCT_EXTERN_METHOD(open)


@end
