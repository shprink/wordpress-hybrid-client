# Installation

This installation works on both OSX and Linux. Windows is not supported yet, if you want to help with that let us know: [https://github.com/shprink/wordpress-hybrid-client/issues/39](https://github.com/shprink/wordpress-hybrid-client/issues/39)

## Preriquisites

- NodeJS (recommended: 4.x), please do not use npm 5.x for now
- NPM (recommended: 3.3.x `sudo npm install -g npm`)

If you are running linux you might need to install all of the following dependencies: [https://github.com/shprink/wphc-dockerbox/blob/master/Dockerfile#L13-L14](https://github.com/shprink/wphc-dockerbox/blob/master/Dockerfile#L13-L14)

## Clone repository

```
$ git clone https://github.com/shprink/wordpress-hybrid-client.git

# Open the project folder
$ cd wordpress-hybrid-client

# List all versions
$ git tag
v2.0.0
etc.

# checkout the latest version available
$ git checkout <the-latest-version>
```

## Install dependencies

The installation will not install anything globally to avoid potential version conflicts.

```
# install dependencies
yarn
```

This could takes several minutes.

During the installation you might have the following error on OSX:
- `ld: library not found for -lgcc_s.10.5`: Installing XCode 7 will solve the problem

## Config files

Your personal config files live now in the `config` folder. You can modify all of them except `config.default.cson` which contains the default config that can be overwritten using `config/config.cson`

## Installing the Web service

Install this plugin [https://wordpress.org/plugins/rest-api/](https://wordpress.org/plugins/rest-api/) (v2.x) to your WordPress website then add the address to the `config/config.cson`:

```
"api":
    "baseUrl": "http://YourDomain/wp-json"
```

Now your WebService is ready to be queried.

> If you do not have your WP setup yet, no problem `http://dev.julienrenaux.fr/wp-json` is set by default for you to try features. Change it when you are ready.

## Installing better image plugin (optional)

If you want to reduce the number of HTTP requests made by WPHC to fetch feature images (one per image) you can install this plugin: <https://wordpress.org/plugins/better-rest-api-featured-images/>

---

Now you can either [configure](CONFIGURATION.md) your app or [start running the app](DEVELOPMENT.md) on the browser with default parameters.
