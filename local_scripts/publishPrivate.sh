#!/usr/bin/env bash
# publish to private npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR/..;
npm run buildPrivate
cd $BASEDIR
./npmpublishMajor.sh;
./npmpublishMinor.sh;