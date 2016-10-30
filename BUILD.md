# Build

Do not try to run the app on device if you have not [run the app on the browser](DEVELOPMENT.md) first.

Install platforms, plugins and crosswalk:

```
npm run restore
```


All the necessary plugins will be installed as well:

![image](https://cloud.githubusercontent.com/assets/1388706/12190311/be4cb570-b58c-11e5-859e-23d0420f06d3.png)

## Config.xml

`config.xml` is setup to work by default but you will need to add the app id, app name, app description, author email and name. Make sure you do so before releasing in the stores.

## Android

### Prerequisites

* Android SDK
* Ant

Make sure you have the latest version of:

* Android Support Repository
* Android Support Library
* Goole Play Services
* Google Repository

![image](https://cloud.githubusercontent.com/assets/1388706/12277502/3b0d91d0-b941-11e5-8286-4e07975e48cb.png)


#### SDK

Download the SDK from <https://developer.android.com/sdk/installing/index.html?pkg=tools>. Android Studio is not required.

Move the SDK to a place on yur file system and refer to it on the .bashrc or .bash_profile file.

```
export ANDROID_HOME=~/Library/Android/sdk  
```

 Once it is done, you may need to run ```source ~/.bashrc``` or ```source ~/.bash_profile``` to update the configuration

#### Ant

```
# iOS
brew install ant

# Linux
sudo apt-get install ant
```

### Build and run dev version (Non minified and debug ON)

Plug your device in if you have one (make sure your device is listed by running: ```$ adb devices```) or let Android emulator handle it.

```
# Dump dev files within the www folder and run android in debug mode
npm run android
```

### Debug

Open Chrome and dump this in the address bar: ```chrome://inspect/#devices```

If your device is connected and in USB mode you will see your application that you can inspect using Chrome dev tools.

---

## iOS

### Preriquisites

* OSX
* XCode
* iOS Simulator
* Provisioning profile

### iOS10

Also you will need to Assign Your App to a Team: `Project > General > Signing > Select your team ID in the dropdown`

You will also need to disabled bitcode (see iOS9)

### iOS9

Also you will need to disabled bitcode: `Project > Build Settings > Build Options > Enable Bitcode = No`

#### iOS simulator

```
sudo npm install -g ios-sim ios-deploy
```

### Open project in Xcode

You should have a Xcode project file located in ```/platforms/ios/*.xcodeproj```. Open it by double clicking it.

### Build and run emulated dev version (Non minified and debug ON)

Plug your device in if you have one or let iOS simulator handle it.

```
# Dump dev files within the www folder and run iOS in debug mode
npm run iosEmulator
```

### Build and run on device dev version (Non minified and debug ON)

For details about various requirements to deploy to a device, refer to the Cordova article: [Getting Started with iOS](http://cordova.apache.org/docs/en/2.5.0/guide_getting-started_ios_index.md.html). Briefly, you need to do the following before deploying:

1. Join the Apple iOS Developer Program.
1. Generate a certificate http://wiki.genexus.com/commwiki/servlet/hwiki?Create+a+Certificate+Signing+Request+in+a+MAC,
1. Create a Provisioning Profile within the [iOS Provisioning Portal](https://developer.apple.com/ios/manage/overview/index.action). You can use its Development Provisioning Assistant to create and install the profile and certificate Xcode requires.
1. Verify that the Code Signing section's Code Signing Identity within the project settings is set to your provisioning profile name.

```
# Dump dev files within the www folder and run iOS in debug mode
npm run ios
```

### URL whitelist

Add you webservice URL to the `config.xml` file

```
<allow-navigation href="http://example.com/*" />
```

More details: https://github.com/apache/cordova-plugin-whitelist

### Debug

To have logs dump in the terminal you can use ```--consolelogs``` options

```
npm run ios -- --consolelogs
```
