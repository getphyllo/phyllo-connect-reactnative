import com.getphyllo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class PhylloConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "PhylloConnectModule"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    public fun initialize(name: String, userId: String, token: String, platformId: String? = "") {

        getphyllo.PhylloConnect.initialize(context = this@MainActivity,
            name = name,
            userId = userId,
            token = token,
            platformId = platformId,
            environment = environment
            )

        PhylloConnect.open()
    }
}