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
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

class PhylloConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PhylloConnectModule"

    val logTag: String = "PhylloConnectModule"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    @ReactMethod
    public fun initialize(name: String, token: String, userId: String, environment: String, platformId: String) {       
        Handler(Looper.getMainLooper()).post {
            PhylloConnect.initialize(context = reactApplicationContext,
            name = name,
            userId = userId,
            token = token,
            platformId = platformId,
            environment = PhylloConnect.ENVIRONMENT.DEVELOPMENT,
            callback = object : ConnectCallback {
                override fun onAccountConnected(accountId: String?,platformId: String?, userId: String?) {
                    Log.d(logTag, "onAccountConnected $accountId $platformId  $userId")
                }

                override fun onAccountDisconnected(accountId: String?,platformId: String?, userId: String?) {
                    Log.d(logTag, "onAccountDisconnected $accountId $platformId  $userId")
                }

                override fun onError(errorMsg: String?) {
                    Log.d(logTag, "on Error  errorMsg")
                }

                override fun onTokenExpired(userId: String?) {
                    Log.d(logTag, "onTokenExpired  $userId")
                }

                override fun onEvent(event: PhylloConnect.EVENT) {
                    Log.d(logTag, "onEvent  $event")
                }

                override fun onExit(reason:String?,userId: String?) {
                    Log.d(logTag, "onExit $userId $reason")
                }
            })
            PhylloConnect.open()
        }
    }

}