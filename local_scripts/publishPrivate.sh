#!/usr/bin/env bash
# publish to private npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./buildDev.js && ./populateReadmes.sh && ./npmpublish.sh;