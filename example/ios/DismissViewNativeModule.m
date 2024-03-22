//
//  DismissViewNativeModule.m
//  example
//
//  Created by Mobioxy on 21/03/24.
//


#import "DismissViewNativeModule.h"
#import <UIKit/UIKit.h>

@implementation DismissViewNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(dismissViewController) {
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
        [self dismissPresentedViewController:rootViewController];
    });
}

- (void)dismissPresentedViewController:(UIViewController *)viewController {
    if (viewController.presentedViewController) {
        [viewController.presentedViewController dismissViewControllerAnimated:YES completion:nil];
        [self dismissPresentedViewController:viewController.presentedViewController];
    }
}


@end
