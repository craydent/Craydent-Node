#!/usr/bin/env bash

cd ../submodules;

cd array;
rm -r node_modules;
npm install;
cd ..;

cd class;
rm -r node_modules;
npm install;
cd ..;

cd cli;
rm -r node_modules;
npm install;
cd ..;

cd control-flow;
rm -r node_modules;
npm install
cd ..;

cd date;
rm -r node_modules;
npm install;
cd ..;

cd fs;
rm -r node_modules;
npm install;
cd ..;

cd function;
rm -r node_modules;
npm install;
cd ..;

cd http;
rm -r node_modules;
npm install;
cd ..;

cd json-parser;
rm -r node_modules;
npm install;
cd ..;

cd number;
rm -r node_modules;
npm install;
cd ..;

cd object;
rm -r node_modules;
npm install;
cd ..;

cd regexp;
rm -r node_modules;
npm install;
cd ..;

cd string;
rm -r node_modules;
npm install;
cd ..;

cd template;
rm -r node_modules;
npm install;
cd ..;

cd utility;
rm -r node_modules;
npm install;
cd ..;

cd xml-to-json;
rm -r node_modules;
npm install;
cd ..;


cd ..;
rm -r node_modules;
npm install;
