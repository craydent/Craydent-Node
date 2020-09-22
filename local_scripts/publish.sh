#!/usr/bin/env bash
# publish to public npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./build.js && tsc && ./populateReadmes.sh && ./npmpublish.sh;