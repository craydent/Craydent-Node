#!/usr/bin/env bash
# publish to private npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./buildDev.js && tsc && ./populateReadmes.sh && ./npmpublish.sh;