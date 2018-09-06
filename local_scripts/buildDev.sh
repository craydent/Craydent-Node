#!/usr/bin/env bash
# build all submodules without readme
BASEDIR=$(dirname "$0")
$BASEDIR/updateMainPackageDependencies.js && $BASEDIR/compile_submodules.js 2>&1;