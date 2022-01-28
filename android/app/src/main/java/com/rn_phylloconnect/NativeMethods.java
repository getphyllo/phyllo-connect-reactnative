package com.rn_phylloconnect; 

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import com.getphyllo.*;
import android.os.Looper;
import android.os.Handler;
import java.lang.Runnable;

public class NativeMethods extends ReactContextBaseJavaModule {
  NativeMethods(ReactApplicationContext context) {
      super(context);
  }

@Override
  public String getName() {
    return "NativeMethods";
  }

  @ReactMethod
  public void initialize(String clientDisplayName, String token, String userId, String environment, String workPlatformId) {
    Log.d("initialize", "clientDisplayName: " + clientDisplayName + " and userId: " + userId);
    //PhylloConnect.initialize(context,clientDisplayName,userId,token,workPlatformId,PhylloConnect.ENVIRONMENT.DEVELOPMENT);
    //PhylloConnect.initialize
    new Handler(Looper.getMainLooper()).post(new Runnable() {
      @Override
      public void run() {
        PhylloConnect.INSTANCE.initialize(getReactApplicationContext(),userId,token,workPlatformId, PhylloConnect.ENVIRONMENT.DEVELOPMENT,clientDisplayName, null);
        PhylloConnect.INSTANCE.open();
      }
});
    

  }

}