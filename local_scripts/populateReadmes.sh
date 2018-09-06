#!/usr/bin/env bash
# populate all the readmes
BASEDIR=$(dirname "$0")

cd $BASEDIR;
./createReadme.js /submodules/array;
./createReadme.js /submodules/class;
./createReadme.js /submodules/cli;
./createReadme.js /submodules/control-flow;
./createReadme.js /submodules/date;
./createReadme.js /submodules/fs;
./createReadme.js /submodules/function;
./createReadme.js /submodules/http;
./createReadme.js /submodules/json-parser;
./createReadme.js /submodules/number;
./createReadme.js /submodules/object;
./createReadme.js /submodules/regexp;
./createReadme.js /submodules/string;
./createReadme.js /submodules/template;
./createReadme.js /submodules/typeof;
./createReadme.js /submodules/utility;
./createReadme.js /submodules/xml-to-json;
./createReadme.js