#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const fs = require('fs');
const $f = require('@craydent/craydent-fs/noConflict');
const $cf = require('@craydent/craydent-control-flow/noConflict');

const copyFile = $cf.yieldable(fs.copyFile, fs);
$f.CONSOLE_COLORS = $f.CONSOLE_COLORS || {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
async function start() {
    let promises = [copyMajor(), copyMinor()];
    await Promise.all(promises);
    console.log($f.CONSOLE_COLORS.GREEN, 'done')
}
start();
async function copyMajor() {
    let folders = await $f.readdir(`${root}/transformedMajor/`);
    let promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        promises.push(copyFile(`${root}/transformedMajor/${folder}/package.json`, `${root}/compiled/transformedMajor/${folder}/package.json`));
    }
    await Promise.all(promises);
    console.log($f.CONSOLE_COLORS.GREEN, 'copied major package.json')
}
async function copyMinor() {
    let folders = await $f.readdir(`${root}/transformedMinor/`);
    let promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        promises.push(copyFile(`${root}/transformedMinor/${folder}/package.json`, `${root}/compiled/transformedMinor/${folder}/package.json`));
    }
    await Promise.all(promises);
    console.log($f.CONSOLE_COLORS.GREEN, 'copied minor package.json')
}
