#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd $BASEDIR/..;

rm -rf ./compiled;
rm -rf ./transformedMinor;
rm -rf ./transformedMajor;
rm -rf ./node_modules;