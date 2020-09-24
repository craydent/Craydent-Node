#!/usr/bin/env bash
# populate all the readmes
BASEDIR=$(dirname "$0")

cd $BASEDIR;

echo ">>>>>>>>>>>>>>> CREATING README <<<<<<<<<<<<<<<";
./createReadmeMajor.js /compiled/transformedMajor/array;
./createReadmeMajor.js /compiled/transformedMajor/class;
./createReadmeMajor.js /compiled/transformedMajor/cli;
./createReadmeMajor.js /compiled/transformedMajor/control-flow;
./createReadmeMajor.js /compiled/transformedMajor/date;
./createReadmeMajor.js /compiled/transformedMajor/fs;
./createReadmeMajor.js /compiled/transformedMajor/function;
./createReadmeMajor.js /compiled/transformedMajor/http;
./createReadmeMajor.js /compiled/transformedMajor/json-parser;
./createReadmeMajor.js /compiled/transformedMajor/number;
./createReadmeMajor.js /compiled/transformedMajor/object;
./createReadmeMajor.js /compiled/transformedMajor/regexp;
./createReadmeMajor.js /compiled/transformedMajor/string;
./createReadmeMajor.js /compiled/transformedMajor/template;
./createReadmeMajor.js /compiled/transformedMajor/typeof;
./createReadmeMajor.js /compiled/transformedMajor/utility;
./createReadmeMajor.js /compiled/transformedMajor/xml-to-json;
./createReadmeMajor.js
./createReadmeMinor.js
echo ">>>>>>>>>>>>>>> README COMPLETED <<<<<<<<<<<<<<<";