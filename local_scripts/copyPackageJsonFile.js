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
    let promises = [copyMajor(), copyMinor()];
    await Promise.all(promises);
    console.log(CONSOLE_COLORS.GREEN, 'done')
}
async function copyMajor() {
    let folders = await readdir(`${root}/transformedMajor/`);
    let promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        promises.push(copyFile(`${root}/transformedMajor/${folder}/package.json`, `${root}/compiled/transformedMajor/${folder}/package.json`));
    }
    await Promise.all(promises);
    console.log(CONSOLE_COLORS.GREEN, 'copied major package.json')
}
async function copyMinor() {
    let folders = await readdir(`${root}/transformedMinor/`);
    let promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        promises.push(copyFile(`${root}/transformedMinor/${folder}/package.json`, `${root}/compiled/transformedMinor/${folder}/package.json`));
    }
    await Promise.all(promises);
    console.log(CONSOLE_COLORS.GREEN, 'copied minor package.json')
}
start();
