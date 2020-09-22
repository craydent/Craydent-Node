#!/usr/bin/env bash
# publish to private npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
npm run buildDev && ./populateReadmes.sh && ./npmpublish.sh;