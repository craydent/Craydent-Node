#!/usr/bin/env bash
# publish to public npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR/..;
npm run build
cd $BASEDIR;
./npmpublishMajor.sh;
./npmpublishMinor.sh;