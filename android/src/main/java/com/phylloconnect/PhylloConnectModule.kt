package com.phylloconnect
import com.getphyllo.*

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class PhylloConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PhylloConnectModule"

    val logTag: String = "PhylloConnectModule"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    public fun initialize(name: String, userId: String, token: String, platformId: String? = "") {

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