#!/usr/bin/env bash
# removes all node_modules and performs each submodule publishes to npm
BASEDIR=$(dirname "$0")

cd $BASEDIR/../submodules;

cd typeof;
rm -r node_modules;
npm publish;
cd ..;

cd array;
rm -r node_modules;
npm publish;
cd ..;

cd class;
rm -r node_modules;
npm publish;
cd ..;

cd cli;
rm -r node_modules;
npm publish;
cd ..;

cd control-flow;
rm -r node_modules;
npm publish
cd ..;

cd date;
rm -r node_modules;
npm publish;
cd ..;

cd fs;
rm -r node_modules;
npm publish;
cd ..;

cd function;
rm -r node_modules;
npm publish;
cd ..;

cd http;
rm -r node_modules;
npm publish;
cd ..;

cd json-parser;
rm -r node_modules;
npm publish;
cd ..;

cd number;
rm -r node_modules;
npm publish;
cd ..;

cd object;
rm -r node_modules;
npm publish;
cd ..;

cd regexp;
rm -r node_modules;
npm publish;
cd ..;

cd string;
rm -r node_modules;
npm publish;
cd ..;

cd template;
rm -r node_modules;
npm publish;
cd ..;

cd utility;
rm -r node_modules;
npm publish;
cd ..;

cd xml-to-json;
rm -r node_modules;
npm publish;
cd ..;


cd ..;
rm -r node_modules;
npm publish;
