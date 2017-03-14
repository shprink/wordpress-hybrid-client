## BEWARE

You CANNOT test push notification on emulators. Please use real devices.

Ensure cordova plugin is uptodate:
```
ionic plugin update onesignal-cordova-plugin
```
## Install the WordPress plugin

### Configure the WordPress plugin

## Update the local config

Change `baseUrl` in `config/config.cson`

```
"cordova":
    "oneSignal":
        "enabled": true
        "debug": false
        "appId": "AAAAAAAA"
```
