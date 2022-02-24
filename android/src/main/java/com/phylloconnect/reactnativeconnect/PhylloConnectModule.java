package com.phylloconnect;

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
import com.facebook.react.bridge.UiThreadUtil;
import android.view.WindowManager;
import android.view.Window;
import android.view.View;
import android.content.Intent;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class PhylloConnectModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    PhylloConnectModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
  
  @Override
    public String getName() {
      return "PhylloConnectModule";
    }

}