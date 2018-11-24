#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/
SRCFOLDER=src/
CONFIGFOLDER=config/

# clean up previous build
rm -fr $BUILDFOLDER

# Compile config folder manually https://github.com/ionic-team/ionic-app-scripts/issues/1284
tsc --sourceMap true --project tsconfig_config.json

# Prod build
ionic-app-scripts build --prod \
                        --wwwDir $BUILDFOLDER

# ngu-app-shell --module src/app/app.module.ts

# Generate our SW manifest
ngu-sw-manifest --in $CONFIGFOLDER"ngsw-manifest.json" \
                --out $BUILDFOLDER"ngsw-manifest.json" \
                --dist $BUILDFOLDER
                # --module src/app/app.module.ts \

# Copy basic SW file
cp node_modules/@angular/service-worker/bundles/worker-basic.min.js $BUILDFOLDER

# Cleanup config folder because of https://github.com/ionic-team/ionic-app-scripts/issues/1284
find $CONFIGFOLDER -name "*.js" -type f -delete
find $CONFIGFOLDER -name "*.js.map" -type f -delete
find $SRCFOLDER -name "*.js" -type f -delete
find $SRCFOLDER -name "*.js.map" -type f -delete