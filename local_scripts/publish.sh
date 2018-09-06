#!/usr/bin/env bash
# publish to public npm with updated readme
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./updateMainPackageDependencies.js && ./compile_submodules.js && ./populateReadmes.sh && ./updateMainPackageDependencies.js publish public && ./compile_submodules.js publish && ./npmpublish.sh;