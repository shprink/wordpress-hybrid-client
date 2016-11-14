## Install the WordPress plugin

WPHC supports both free and pro version of Delite Studio's plugin for WP.

More details about the product: <http://www.delitestudio.com/wordpress/push-notifications-for-wordpress/>

Open your Wordpress admin page and install "Push Notifications for WordPress (Lite)" then activate it.

## Android

If you have not already done so, you'll need to set up a Google API project, to generate your senderID. [Follow these steps](http://developer.android.com/guide/google/gcm/gs.html) to do so.

In this example, be sure and substitute your own senderID. Get your senderID by signing into to your [Google dashboard](https://code.google.com/apis/console/).

The senderID is found at *Overview->Dashboard->Project Number* or <https://developers.google.com/mobile/add> and follow the steps to get Cloud messaging senderID and apiKey.

** Tip: ** The senderID is a 12 digit number

### Configure the WordPress plugin

Go to ```Push Notifications > Settings``` and check the following checkboxes:

* Basic Options > Send push notifications when a new post is published
* Basic Options > Android devices
* Send Push Notifications for > Posts
* Misc > In the Android notification payload add the message field

Then go to "Android Push Notifications (via GMC)" section and enter you Goolge Api key.

Do not forget to save.

## iOS

### Configure the WordPress plugin

Go to ```Push Notifications > Settings``` and check the following checkboxes:

* Basic Options > Send push notifications when a new post is published
* Basic Options > iOS devices
* Send Push Notifications for > Posts

### Create .pem

[Get .pem files](http://stackoverflow.com/questions/21250510/generate-pem-file-used-to-setup-apple-push-notification)

Once you have got your .pem files upload them in the ```iOS Push Notifications``` section

## Update the local config

Change `baseUrl` in `config/config.cson`

```
"cordova":
    "pushNotifications":
        "enabled": false
        "baseUrl": "http://yourDomain.com/pnfw"
```

To make sure your web service works open `http://yourDomain.com/pnfw/register/` in your browser. You should see that:

```
{
"error": "401",
"reason": "Unauthorized",
"detail": "Invalid HTTP method"
}
```

### Debug registration

```
npm run android
# or
npm run ios
```

Open the console via Chrome dev tools ```chrome://inspect/#devices``` and inspect your device.

If push notifications are enabled and you have properly generated a key from Google cloud you should have a log that look like this:

`[pushNotifications] registered!`

It means the device has been registered.

If an error happened you will have the following log:

`[pushNotifications] register failed!`

## Known issues

### Parameter oauth_consumer_key is missing

The register http request fails with this message: `{error: "401", reason: "Unauthorized", detail: "Parameter oauth_consumer_key is missing"}`

[Solution](https://wordpress.org/support/topic/not-connect-the-android-app-to-wordpress-site-using-register-api)
