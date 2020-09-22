#!/usr/bin/env bash
# publish to public npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./build.js && ./populateReadmes.sh && ./npmpublish.sh;