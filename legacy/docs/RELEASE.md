# Release

Male sure you have ios and/or android platforms installed. If you are not sure go back to [BUILD.md](BUILD.md).

## Android

### Get and save licence key

<https://support.google.com/googleplay/android-developer/answer/186113?hl=en>

```
keytool -genkey -v -keystore <my-release-key.keystore> -alias <alias_name> -keyalg RSA -keysize 2048 -validity 10000
```

Change `<my-release-key.keystore>` and `<alias_name>` accordingly also in the `release.sh` file:

```
ANDROID_ZIPALIGN="/path/to/Android/sdk/build-tools/21.1.2/zipalign"
ANDROID_KEY_PATH="/path/to/keystore/my-release-key.keystore"
ANDROID_KEY_ALIAS="alias_name"
```

### Keyboard adjustment

Some Android versions can have a problem when the keyboard pops up (little hiccup of the app). If it the case on your app it can be prevented:

Open ```platforms/android/AndroidManifest.xml``` and change ```android:windowSoftInputMode="adjustResize"``` into ```android:windowSoftInputMode="adjustNothing"```.

### Build PROD APKs

```
npm run build
```

Then answer to the prompt. When you are done, you should have your `.apk` files dumped into the `build` folder at the project root: https://github.com/shprink/wordpress-hybrid-client/tree/develop/build

## iOS

### Documentation

<https://developer.apple.com/programs/ios/gettingstarted/>

<https://developer.apple.com/library/mac/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html#//apple_ref/doc/uid/TP40011225-CH13>

<http://codewithchris.com/submit-your-app-to-the-app-store/>

### Install via Xcode

<http://codewithchris.com/submit-your-app-to-the-app-store/>

### Install Via terminal (experimental)

Sigh allow to sign .app with a provisioning file via the terminal

```
# https://github.com/KrauseFx/sigh
sudo gem install sigh
```

#### Build PROD IPA

```
npm run build
```

Then answer to the prompt.

#### Use XCode or Application Loader

Once the IPA is signed, all you need to do is sending the package to Apple for review.

### Frequent errors

#### iOS: Submitting iOS app to app store application identifier invalid

<http://stackoverflow.com/questions/20120128/submitting-ios-app-to-app-store-application-identifier-invalid>

#### iOS: Signing for "XXXX" requires a development team. Select a development team in the project editor.

<http://stackoverflow.com/questions/39524148/requires-a-development-team-select-a-development-team-in-the-project-editor-cod>

#### iOS: duplicate symbols for architecture armv7

<http://stackoverflow.com/questions/39512823/duplicate-symbols-for-architecture-arm64-after-xcode-8-0-update>

![image](https://cloud.githubusercontent.com/assets/1388706/20237394/2d95e7de-a8d1-11e6-9e84-139808b559d2.png)