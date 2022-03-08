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
