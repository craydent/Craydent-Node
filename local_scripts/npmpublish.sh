#!/usr/bin/env bash
# removes all node_modules and performs each submodule publishes to npm
BASEDIR=$(dirname "$0")

# major packages
cd $BASEDIR/../compiled/transformedMajor;

for dir in */; do
    cd $dir
    rm -r node_modules;
    npm publish;
    cd ..
done

# minor packages
cd $BASEDIR/../compiled/transformedMinor;

for dir in */; do
    cd $dir
    rm -r node_modules;
    npm publish;
    cd ..
done

cd ..;
rm -r node_modules;
npm publish;
