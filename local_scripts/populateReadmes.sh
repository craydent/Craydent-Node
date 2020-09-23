#!/usr/bin/env bash
# populate all the readmes
BASEDIR=$(dirname "$0")

cd $BASEDIR;

echo ">>>>>>>>>>>>>>> CREATING README <<<<<<<<<<<<<<<";
./createReadme.js /compiled/transformedMajor/array;
./createReadme.js /compiled/transformedMajor/class;
./createReadme.js /compiled/transformedMajor/cli;
./createReadme.js /compiled/transformedMajor/control-flow;
./createReadme.js /compiled/transformedMajor/date;
./createReadme.js /compiled/transformedMajor/fs;
./createReadme.js /compiled/transformedMajor/function;
./createReadme.js /compiled/transformedMajor/http;
./createReadme.js /compiled/transformedMajor/json-parser;
./createReadme.js /compiled/transformedMajor/number;
./createReadme.js /compiled/transformedMajor/object;
./createReadme.js /compiled/transformedMajor/regexp;
./createReadme.js /compiled/transformedMajor/string;
./createReadme.js /compiled/transformedMajor/template;
./createReadme.js /compiled/transformedMajor/typeof;
./createReadme.js /compiled/transformedMajor/utility;
./createReadme.js /compiled/transformedMajor/xml-to-json;
./createReadme.js
echo ">>>>>>>>>>>>>>> README COMPLETED <<<<<<<<<<<<<<<";