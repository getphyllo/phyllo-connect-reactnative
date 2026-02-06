# Android Configuration Upgrade Plan
## React Native Phyllo Connect Library - v0.4.0 Migration

**Date:** 2026-02-06
**Current Version:** 0.3.6
**Target Version:** 0.4.0 (with LOCAL-TEST SDK)

---

## Executive Summary

This document outlines the plan to upgrade the Android configuration of the react-native-phyllo-connect library to support the new phyllo-connect SDK v0.4.0-LOCAL-TEST. This upgrade includes significant changes to the Android Gradle Plugin, Kotlin version, and Android SDK versions.

### ⚠️ BREAKING CHANGES
- **Minimum Android SDK increased from 21 to 24**
  - Drops support for Android 5.0 (API 21, Lollipop)
  - Drops support for Android 5.1 (API 22, Lollipop)
  - Drops support for Android 6.0 (API 23, Marshmallow)
  - New minimum: Android 7.0 (API 24, Nougat)

---

## Current Configuration

| Component | Current Version |
|-----------|----------------|
| Android Gradle Plugin | 7.4.2 |
| Kotlin | 1.8.0 |
| Compile SDK | 34 |
| Target SDK | 34 |
| Min SDK | 21 |
| Build Tools | 34.0.0 |
| phyllo-connect SDK | 0.3.5 |
| Java Compatibility | VERSION_1_8 (implied) |

---

## Target Configuration

| Component | Target Version |
|-----------|---------------|
| Android Gradle Plugin | 8.3.0 |
| Kotlin | 1.9.22 |
| Compile SDK | 35 |
| Target SDK | 35 |
| Min SDK | 24 ⚠️ |
| Build Tools | (auto-selected by AGP) |
| phyllo-connect SDK | 0.4.0-LOCAL-TEST |
| Java Compatibility | VERSION_17 |
| Kotlin JVM Target | 17 |

---

## Detailed Changes

### 1. File: `android/build.gradle`

#### 1.1 Buildscript Section
**Location:** Lines 1-16

**Current:**
```gradle
buildscript {
    ext.safeExtGet = { prop, fallback ->
        return rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
    }

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:7.4.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:${safeExtGet('kotlinVersion', '1.8.0')}"
    }
}
```

**Changes Required:**
- Add `mavenLocal()` as the first repository
- Update AGP from `7.4.2` to `8.3.0`
- Update Kotlin fallback from `1.8.0` to `1.9.22`

**New:**
```gradle
buildscript {
    ext.safeExtGet = { prop, fallback ->
        return rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
    }

    repositories {
        mavenLocal()
        google()
        mavenCentral()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:8.3.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:${safeExtGet('kotlinVersion', '1.9.22')}"
    }
}
```

#### 1.2 Android Module Configuration
**Location:** Lines 25-33

**Current:**
```gradle
android {
    compileSdkVersion safeExtGet('compileSdkVersion', 34)
    buildToolsVersion safeExtGet('buildToolsVersion', '34.0.0')

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 21)
        targetSdkVersion safeExtGet('targetSdkVersion', 34)
    }
}
```

**Changes Required:**
- Add `namespace` declaration (required for AGP 8.x)
- Update `compileSdkVersion` fallback: `34` → `35`
- Update `minSdkVersion` fallback: `21` → `24` ⚠️
- Update `targetSdkVersion` fallback: `34` → `35`
- Remove `buildToolsVersion` (auto-selected by AGP 8.x)
- Add `compileOptions` with Java 17
- Add `kotlinOptions` with JVM target 17

**New:**
```gradle
android {
    namespace 'com.phylloconnect'
    compileSdkVersion safeExtGet('compileSdkVersion', 35)

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 24)
        targetSdkVersion safeExtGet('targetSdkVersion', 35)
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = '17'
    }
}
```

#### 1.3 Repositories Section
**Location:** Lines 47-50

**Current:**
```gradle
repositories {
    google()
    mavenCentral()
}
```

**Changes Required:**
- Add `mavenLocal()` as the first repository

**New:**
```gradle
repositories {
    mavenLocal()
    google()
    mavenCentral()
}
```

#### 1.4 Dependencies Section
**Location:** Lines 52-56

**Current:**
```gradle
dependencies {
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'
    implementation 'com.getphyllo:phyllo-connect:0.3.5'
}
```

**Changes Required:**
- Update phyllo-connect SDK: `0.3.5` → `0.4.0-LOCAL-TEST`

**New:**
```gradle
dependencies {
    //noinspection GradleDynamicVersion
    implementation 'com.facebook.react:react-native:+'
    implementation 'com.getphyllo:phyllo-connect:0.4.0-LOCAL-TEST'
}
```

---

### 2. File: `android/src/main/AndroidManifest.xml`

**Location:** Lines 1-2

**Current:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.phylloconnect">
```

**Changes Required:**
- Remove `package` attribute (replaced by `namespace` in build.gradle)

**New:**
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
```

**Reason:** AGP 8.x requires the package to be defined via the `namespace` property in build.gradle instead of the manifest file.

---

### 3. File: `README.md`

**Changes Required:**
Add a new "Requirements" section after the header and before "Configuring the SDK"

**New Section to Add:**
```markdown
## Requirements

### Android
- Minimum Android SDK: **24** (Android 7.0 Nougat)
- Compile SDK: 35
- Target SDK: 35
- Android Gradle Plugin: 8.3.0+
- Kotlin: 1.9.22+
- Java: 17

### iOS
- iOS 12.0 or later

### React Native
- React Native 0.60.0 or later
```

---

### 4. File: `package.json`

**Changes Required:**
- Update version: `0.3.6` → `0.4.0`

**Change:**
```json
"version": "0.4.0"
```

---

## Migration Impact Analysis

### For Library Maintainers
1. ✅ No changes to TypeScript/JavaScript API
2. ✅ No changes to iOS configuration
3. ⚠️ Breaking change in minimum Android version
4. ✅ Improved compatibility with newer Android ecosystem
5. ✅ Better security with Java 17 and modern SDK

### For Library Users
1. ⚠️ **BREAKING:** Apps targeting Android API 21-23 will need to update or cannot use this version
2. ✅ Apps already targeting API 24+ will work without changes
3. ⚠️ Users may need to update their project's AGP/Kotlin if significantly outdated
4. ✅ Better performance and security on modern Android devices

### Android Version Market Share (as of 2026)
- Android 7.0+ (API 24+): ~99% of devices
- Android 5.0-6.0 (API 21-23): ~1% of devices

**Decision:** The breaking change is justified given the minimal user impact and the requirement from the native SDK.

---

## Testing Plan

### Phase 1: Build Verification
1. Clean build: `cd android && ./gradlew clean`
2. Assemble library: `./gradlew assembleRelease`
3. Verify no compilation errors
4. Check for deprecation warnings

### Phase 2: Integration Testing
1. Create a fresh React Native 0.73.3 project (matches current devDependency)
2. Install the updated library locally
3. Test basic SDK initialization
4. Test all callback events:
   - accountConnected
   - accountDisconnected
   - tokenExpired
   - exit
   - connectionFailure
5. Test with workPlatformId parameter
6. Test without workPlatformId parameter

### Phase 3: Compatibility Testing
1. Test on Android 7.0 (API 24) device/emulator
2. Test on Android 14 (API 34) device/emulator
3. Test on Android 15 (API 35) device/emulator
4. Verify SDK opens correctly
5. Verify all native bridge methods work

### Phase 4: Edge Cases
1. Test with different AGP versions in host app (8.x range)
2. Test with different Kotlin versions (1.9.x range)
3. Verify mavenLocal() resolution works correctly
4. Test SDK version() method returns correct version

---

## Rollback Plan

If issues are discovered:
1. Revert all changes in this branch
2. Keep `test_v4` branch for future attempts
3. Document blocking issues
4. SDK v0.3.5 remains available as fallback

---

## Documentation Updates

### Files to Update
1. ✅ README.md - Add requirements section
2. ⚠️ CHANGELOG.md - Create if doesn't exist
3. ⚠️ Issues.md - Add note about minimum SDK if it exists

### Changelog Entry
```markdown
## [0.4.0] - 2026-02-06

### Changed
- **BREAKING:** Increased minimum Android SDK from 21 to 24 (Android 7.0+)
- Updated Android Gradle Plugin from 7.4.2 to 8.3.0
- Updated Kotlin from 1.8.0 to 1.9.22
- Updated compile SDK to 35
- Updated target SDK to 35
- Updated phyllo-connect native SDK to 0.4.0
- Updated Java compatibility to version 17

### Removed
- Support for Android 5.0, 5.1, and 6.0 (API 21-23)
```

---

## Implementation Order

1. ✅ Create this plan document
2. 🔄 Get approval from team/stakeholders
3. 📝 Update `android/build.gradle` (buildscript)
4. 📝 Update `android/build.gradle` (android module)
5. 📝 Update `android/build.gradle` (repositories)
6. 📝 Update `android/build.gradle` (dependencies)
7. 📝 Update `android/src/main/AndroidManifest.xml`
8. 📝 Update `README.md`
9. 📝 Update `package.json`
10. 📝 Create/update `CHANGELOG.md`
11. 🧪 Run test suite (Phase 1-4)
12. ✅ Create commit
13. 🚀 Test in example app
14. 📋 Create PR for review

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Breaking change blocks users on old Android | Medium | Document clearly, provide migration guide |
| AGP 8.x compatibility issues with host apps | Low | Most RN apps already on AGP 8.x |
| mavenLocal() not found in CI/CD | Medium | Document local testing requirements |
| Java 17 requirement issues | Low | Most modern Android projects use Java 17+ |
| Namespace conflicts | Low | Using existing package name |

---

## Success Criteria

- ✅ All files updated correctly
- ✅ Clean build succeeds without errors
- ✅ No new warnings introduced
- ✅ Library assembles successfully
- ✅ Integration in test app works
- ✅ All SDK features functional
- ✅ Documentation updated
- ✅ Version bumped to 0.4.0

---

## Notes

- The SDK is currently using `0.4.0-LOCAL-TEST` from mavenLocal for testing
- This is expected to be at: `~/.m2/repository/com/getphyllo/phyllo-connect/0.4.0-LOCAL-TEST/`
- For production release, this will need to be changed to `0.4.0` from Maven Central
- The `safeExtGet()` pattern allows host apps to override versions if needed
- Keep the commented snapshot repository code for future reference

---

## Questions for Review

1. Should we create a CHANGELOG.md if one doesn't exist?
2. Should we test with React Native 0.83.1 (latest mentioned by user) or stick with 0.73.3 (current devDependency)?
3. Do we need to update the example app's gradle configuration as well?
4. Should we add a migration guide document for users upgrading from 0.3.x?

---

**Plan Status:** ✅ READY FOR REVIEW
**Estimated Implementation Time:** 1-2 hours
**Estimated Testing Time:** 2-3 hours
