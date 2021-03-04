#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const fs = require('fs');

function copyFile() {
    return _fsHelper.apply(this, ['copyFile', ...arguments]);
}
function _fsHelper(name) {
    var args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    return new Promise(function (res) {
        try {
            args.push(function (err, data, buffer) {
                if (err) {
                    res(err);
                }
                if (buffer) {
                    res({ bytes: data, buffer });
                }
                res(data || null);
            });
            fs[name].apply(this, args);
        } catch (e) {
            res(e);
        }
    });
}
function readdir() {
    return _fsHelper.apply(this, ['readdir', ...arguments]);
}

const CONSOLE_COLORS = {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
async function start() {
    console.log(CONSOLE_COLORS.GREEN, 'copying package.json')
    await copyFile(`${root}/package.json`, `${root}/compiled/package.json`)
    console.log(CONSOLE_COLORS.GREEN, 'finished copying package.json')
}
start();
