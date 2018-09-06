#!/usr/bin/env bash
# build all submodules and populate readmes
BASEDIR=$(dirname "$0")
$BASEDIR/updateMainPackageDependencies.js && $BASEDIR/compile_submodules.js 2>&1 && $BASEDIR/populateReadmes.sh 2>&1;