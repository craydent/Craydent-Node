#!/usr/bin/env bash
# removes all node_modules and performs each submodule publishes to npm
BASEDIR=$(dirname "$0")

# major packages
cd $BASEDIR/../compiled/transformedMajor;

for dir in */; do
    if [ "$dir" != "." ] && [ "$dir" != ".." ]
    then
        cd $dir
        rm -rf node_modules;
        npm publish &;
        cd ..
    fi
done

cd $BASEDIR/..;
rm -rf node_modules;
npm publish &;
wait