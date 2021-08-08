#!/usr/bin/env bash
# removes all node_modules and performs each submodule publishes to npm
BASEDIR=$(dirname "$0")

# minor packages
cd $BASEDIR/../compiled/transformedMinor;

for dir2 in */; do
    if [ "$dir" != "." ] && [ "$dir" != ".." ]
    then
        cd $dir2
        rm -rf node_modules;
        npm publish &;
        cd ..
    fi
done
wait