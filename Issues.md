# Facing any issues?

1. **Execution failed for task ':app:processDebugMainManifest'.**\

> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @66b22ec6

If you are facing this error on Android run, modify android/app/src/main/AndroidManifest.xml set `allowBackup` to `True`

```sh
<application
      ...
  android:allowBackup="true"
>
```

<br>
<br>

2. **Execution failed for task ':app:processDebugMainManifest'.**

> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @66b22ec6

If you are facing this error on Android, modify android/gradle.properties and add the following line at the end

```sh
org.gradle.jvmargs=--add-opens java.base/java.io=ALL-UNNAMED
```

3. **Specs satisfying the PhylloConnect (~> 0.1.21) dependency were found, but they required a higher minimum deployment target**
   > [!] CocoaPods could not find compatible versions for pod "PhylloConnect":react-native-phyllo-connect (from ../node_modules/react-native-phyllo-connect) was resolved to X.Y.Z, which depends on PhylloConnect (~> X.Y.Z)

If your issue not listed here, raise an issue in the [issues section](https://github.com/getphyllo/phyllo-connect-reactnative/issues) or report your issue on [#bug-reports](https://discord.com/channels/897097781355888640/949535402845405184) channel of our [Discord server](https://discord.com/channels/897097781355888640/).
