#!/usr/bin/env bash
# test all
# jasmine-node test/submodules/ --color --match -main- --config $1 $2;
# jasmine-node test/submodules/ --color --match -noconflict- --config $1 $2;
# jasmine-node test/unit_test-main-spec.js --color --config $1 $2;
# jasmine-node test/unit_test-noconflict-spec.js --color --config $1 $2;

noasync="false";

if [ "$1" = "true" ]; then
    noasync="true";
fi
jasmine-node test/submodules/main/array-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/class-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/cli-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/control-flow-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/date-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/fs-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/function-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/http-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/json-parser-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/number-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/object-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/regexp-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/string-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/template-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/typeof-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/utility-main-spec.js --color --config noasync $noasync --config name single
jasmine-node test/submodules/main/xml-to-json-main-spec.js --color --config noasync $noasync --config name single


jasmine-node test/submodules/main/array-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/class-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/cli-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/control-flow-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/date-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/fs-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/function-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/http-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/json-parser-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/number-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/object-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/regexp-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/string-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/template-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/typeof-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/utility-main-spec.js --color --config noasync $noasync
jasmine-node test/submodules/main/xml-to-json-main-spec.js --color --config noasync $noasync