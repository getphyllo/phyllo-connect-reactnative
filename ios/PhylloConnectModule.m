#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PhylloConnectModule, NSObject)

RCT_EXTERN_METHOD(initialize:clientDisplayName:token:userId:environment:workPlatformId:singleAccount)
RCT_EXTERN_METHOD(open)


@end
