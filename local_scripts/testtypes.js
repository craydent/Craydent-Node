#!/usr/bin/env node
var root = require.resolve('../package.json').replace('/package.json','');
const $c = require(`${root}/submodules/cli/noConflict`);
const dep = require(`${root}/submodules/dependencies.js`);

async function test () {
    let promises = [];
    for (let prop in dep.primary) {
        if (prop == "class") {
            continue;
        }
        promises.push($c.CLI.exec(`tsc -p ${root}/\\@types/DefinitelyTyped/types/craydent-${prop}/tsconfig.json && echo "${prop} done."`));
    }
    // promises.push($c.CLI.exec(`tsc -p ${root}/craydent/tsconfig.json;`));
    await Promise.all(promises);
}
test();