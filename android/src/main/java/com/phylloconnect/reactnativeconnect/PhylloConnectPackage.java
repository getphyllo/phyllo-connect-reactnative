package com.phylloconnect;

// import com.facebook.react.ReactPackage
// import com.facebook.react.bridge.NativeModule
// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.uimanager.ViewManager

// class PhyConnectPackage : ReactPackage {

//     override fun createViewManagers(reactContext: ReactApplicationContext):
//             MutableList<ViewManager<*, *>> {
//         return mutableListOf()
//     }

//     override fun createNativeModules(reactContext: ReactApplicationContext):
//             MutableList<NativeModule> {
//         return mutableListOf(PhyConnectModule(reactContext))
//     }
// }

import java.util.HashMap;
import java.util.Map;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

@SuppressWarnings("unused")
public class PhylloConnectPackage extends TurboReactPackage {

  @Override
  public NativeModule getModule(
      String name, ReactApplicationContext reactContext) {
    return new PhylloConnectModule(reactContext);
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      Map<String, ReactModuleInfo> map = new HashMap<>();
      map.put(
          "PhylloConnectModule",
          new ReactModuleInfo(
              "PhylloConnectModule",
              "com.reactlibrary.PhylloConnectModule",
              false,
              false,
              true,
              false,
              false));
      return map;
    };
  }
}