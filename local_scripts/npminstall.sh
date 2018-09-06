#!/usr/bin/env bash
# npm install a submodule
BASEDIR=$(dirname "$0")

cd $BASEDIR/../submodules;
echo $1;
cd $1;
rm -rf node_modules;
npm install;

