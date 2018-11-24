#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/

./scripts/buildPWADebug.sh

cd $BUILDFOLDER
http-server -p 3000