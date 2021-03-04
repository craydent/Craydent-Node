#!/usr/bin/env node
var root = require.resolve('../package.json').replace('/package.json', '');
var fs = require('fs').promises;
var modules = [
    "craydent-array",
    "craydent-class",
    "craydent-cli",
    "craydent-control-flow",
    "craydent-date",
    "craydent-fs",
    "craydent-function",
    "craydent-http",
    "craydent-json-parser",
    "craydent-number",
    "craydent-object",
    "craydent-regexp",
    "craydent-string",
    "craydent-template",
    "craydent-typeof",
    "craydent-utility",
    "craydent-xml-to-json",
    "craydent.ajax"
];
const CONSOLE_COLORS = {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
(async () => {
    for (var i = 0, len = modules.length; i < len; i++) {
        let path = `${root}/node_modules/${modules[i]}/index.d.ts`;
        let exists = true;
        try { await fs.access(path); } catch (e) {
            path = `${root}/node_modules/@craydent/${modules[i]}/index.d.ts`;
            try { await fs.access(path); } catch (e) { exists = false; }
        }
        if (!exists) {
            console.log(CONSOLE_COLORS.GREEN, `skipping: ${path.replace(`${root}/node_modules/@craydent`, '')} doesn't exist`);
            continue;
        }
        try {
            await fs.unlink(path);
            console.log(CONSOLE_COLORS.GREEN, `removed ${modules[i]}/index.d.ts`);
        } catch (e) { console.log(CONSOLE_COLORS.RED, e); }
    }
})()