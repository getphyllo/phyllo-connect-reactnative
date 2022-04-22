package com.phylloconnect

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.Map
import java.util.HashMap
import android.util.Log
import com.getphyllo.*
import android.os.Looper
import android.os.Handler
import java.lang.Runnable
import com.facebook.react.bridge.UiThreadUtil
import android.view.WindowManager
import android.view.Window
import android.view.View
import android.content.Intent
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class PhylloConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PhylloConnectModule"

    val logTag: String = "PhylloConnectModule"

    @ReactMethod
    public fun initialize(name: String, token: String, userId: String, environment: String, platformId: String) {       
        Handler(Looper.getMainLooper()).post {
            PhylloConnect.initialize(context = reactApplicationContext,
            clientDisplayName = name,
            userId = userId,
            token = token,
            workPlatformId = platformId,
            environment = getPhylloEnvironment(environment),
            callback = object : ConnectCallback {
                override fun onAccountConnected(accountId: String?,platformId: String?, userId: String?) {
                    val values = Arguments.createArray();
                    values.pushString(accountId);
                    values.pushString(platformId);
                    values.pushString(userId);
                    sendEvent("onAccountConnected", values);
                }

                override fun onAccountDisconnected(accountId: String?,platformId: String?, userId: String?) {
                    val values = Arguments.createArray();
                    values.pushString(accountId);
                    values.pushString(platformId);
                    values.pushString(userId);
                    sendEvent("onAccountDisconnected", values);
                }

                override fun onTokenExpired(userId: String?) {
                    val values = Arguments.createArray();
                    values.pushString(userId);
                    sendEvent("onTokenExpired", values);
                }

                override fun onExit(reason:String?,userId: String?) {
                    val values = Arguments.createArray();
                    values.pushString(reason);
                    values.pushString(userId);
                    sendEvent("onExit", values);
                }
            })
        }
    }

    private fun getPhylloEnvironment(env: String): PhylloConnect.ENVIRONMENT {
        return when (env) {
            "development" -> {
                return PhylloConnect.ENVIRONMENT.DEVELOPMENT
            }
            "sandbox" -> {
                return PhylloConnect.ENVIRONMENT.SANDBOX
            }
            "production" -> {
                return PhylloConnect.ENVIRONMENT.PRODUCTION
            }
            else -> PhylloConnect.ENVIRONMENT.DEVELOPMENT
        }
    }


    
    @ReactMethod
    public fun open() {
        Handler(Looper.getMainLooper()).post {
            PhylloConnect.open()
        }
    } 
  
    private fun sendEvent(
                    eventName:String,
                    values:WritableArray?) {
        
        reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(eventName, values)
    }

      // Required for rn built in EventEmitter Calls. Otherwise it'll show warnings
      @ReactMethod
      public fun addListener(eventName:String) {
        //   Log.d("eventName",eventName);
       }
  
      @ReactMethod
      public fun removeListeners(count:Integer) {
      //Log.d("removeListeners",count);
      }

}