package com.example;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.ArrayList;
import java.util.List;

public class DismissViewNativeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private List<Activity> activityList = new ArrayList<>();
    public DismissViewNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        Application application = (Application) reactContext.getApplicationContext();
        application.registerActivityLifecycleCallbacks(new Application.ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {
                activityList.add(activity);
            }

            @Override
            public void onActivityStarted(Activity activity) {}

            @Override
            public void onActivityResumed(Activity activity) {}

            @Override
            public void onActivityPaused(Activity activity) {}

            @Override
            public void onActivityStopped(Activity activity) {}

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle outState) {}

            @Override
            public void onActivityDestroyed(Activity activity) {
                activityList.remove(activity);
            }
        });
    }

    @Override
    public String getName() {
        return "DismissViewNativeModule";
    }

    @ReactMethod
    public void dismissViewController() {
        for (Activity activity : activityList) {
            String activityName = activity.getClass().getSimpleName();
            if ("ConnectWebActivity".equals(activityName)) {
                // Found ConnectWebActivity, perform action here
                activity.finish();
            }
        }
    }
}