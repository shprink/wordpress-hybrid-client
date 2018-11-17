#!/bin/bash
PATH=$PATH:$(npm bin)
set -x
BUILDFOLDER=www/
SRCFOLDER=src/
CONFIGFOLDER=config/
rm -fr $BUILDFOLDER
tsc --sourceMap true --project tsconfig_config.json
ionic-app-scripts build --wwwDir $BUILDFOLDER
ngu-sw-manifest --in $CONFIGFOLDER"ngsw-manifest.json" --out $BUILDFOLDER"ngsw-manifest.json" --dist $BUILDFOLDER
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js $BUILDFOLDER
find $CONFIGFOLDER -name "*.js" -type f -delete
find $CONFIGFOLDER -name "*.js.map" -type f -delete
find $SRCFOLDER -name "*.js" -type f -delete
find $SRCFOLDER -name "*.js.map" -type f -delete