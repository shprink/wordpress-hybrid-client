# WordPress Hybrid Client



## Chat

[![Join the chat at https://gitter.im/shprink/wordpress-hybrid-client](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/shprink/wordpress-hybrid-client)


## Built with WPHC

* Android
  * https://play.google.com/store/apps/details?id=com.shprinkinc.wordpresshybridclient
  * http://hiwaldorf.com/app/
  * https://play.google.com/store/apps/details?id=fr.silentkernel.app
  * https://play.google.com/store/apps/details?id=com.notmyfault
* IOS
  * https://itunes.apple.com/cn/app/id1030393337

## Quick Start

### Preriquisites

- Git
- NodeJS (recommended: 4.x), please do not use npm 5.x for now
- NPM (recommended: 3.3.x)

```
# Clone and use the latest version
$ git clone https://github.com/shprink/wordpress-hybrid-client.git && cd wordpress-hybrid-client
# List all versions
$ git tag
$ git checkout <the-latest-version>

# Install
$ npm install && npm run installWPHC

# Run on the browser
$ npm run devserver
```

Open http://localhost:8080/webpack-dev-server/ in Chrome (the only browser supported). You should see the application running with `http://dev.julienrenaux.fr/wp-json` backend.

To go further please read the documentations.

## Documentations

### Installation

Read the manual: [INSTALLATION.md](INSTALLATION.md)

### Configuration

Read the manual: [CONFIGURATION.md](CONFIGURATION.md)

### Development

Read the manual: [DEVELOPMENT.md](DEVELOPMENT.md)

### Push Notifications

Read the manual: [PUSHNOTIFICATIONS.md](PUSHNOTIFICATIONS.md)

### Build Android & iOS

Read the manual: [BUILD.md](BUILD.md)

### Release Android & iOS

Read the manual: [RELEASE.md](RELEASE.md)

### Splashscreens and Icons

Read the manual: [SPLASHICONS.md](SPLASHICONS.md)

## Project public API

```
# Dev server
npm run devserver

# Dump files in www
npm run dumpdev
npm run dumpprod

# Run Cordova
npm run android
npm run ios
npm run iosEmulator

# Cordova build
npm run buildAndroid
npm run buildProdAndroid
npm run buildIOS
npm run buildProdIOS
```

## Contribute

WordPress hybrid Client is Open Source, If you are interested in helping, please read the following:

### Pull Request Guidelines

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, do not bundle more than one "feature" or bug fix per PR. Doing so makes it very hard to accept it if one of the fixes has issues.

It's always best to create two smaller PRs than one big one.

### Style

Always use four spaces, no tabs. This goes for any HTML, CSS, or Javascript.