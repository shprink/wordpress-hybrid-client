#!/bin/bash
PATH=$PATH:$(npm bin)
set -x

BUILDFOLDER=www/


cd $BUILDFOLDER
http-server -p 3000