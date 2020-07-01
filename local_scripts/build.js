#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const fs = require('fs');
const path = require('path');
const $a = require('@craydent/craydent-array/noConflict');
const $f = require('@craydent/craydent-fs/noConflict');
const $i = require('@craydent/craydent-cli/noConflict');
const $cf = require('@craydent/craydent-control-flow/noConflict');

const copyFile = $cf.yieldable(fs.copyFile, fs);

async function start() {
    await prep();
    let folders = await $f.readdir(`${root}/modules/`);
    let promises = [];
    const exclude = { globalTypes: 1, methods: 1, models: 1, private: 1, protected: 1 };
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        if (folder in exclude) { continue; }
        promises.push(processModule(folder));
    }
    await Promise.all(promises);
    console.log($f.CONSOLE_COLORS.GREEN, 'all done')
}
async function processModule(name) {
    const destination = `${root}/transformed/${name}`;
    let contents = await $f.readFile(`${root}/modules/${name}/index.template`, 'utf8');
    const globalContents = contents.replace('<reference path="../globalTypes/global.vars.ts" />', '<reference path="./global.vars.ts" />')
        .replace(/from '..\//g, 'from \'./');
    const baseContents = globalContents.replace(/\/\/#region global[\s\S]*?\/\/#endregion global/g, '')
        .replace('global.vars.ts', 'global.base.ts');
    const noConflictContents = baseContents.replace(/\/\/#region proto[\s\S]*?\/\/#endregion proto/g, '')
        .replace(/\/\/\/<reference path=.*?\/>[\n]/, '');
    let proto = await $f.readFile(`${root}/modules/${name}/__prototypes.ts`, 'utf8');
    const prototypesContent = proto.replace(/from '..\//g, 'from \'./');

    let promises = [];
    promises.push($i.CLI.exec(`mkdir -p  ${destination}`));
    promises.push($i.CLI.exec(`mkdir -p  ${destination}/methods`));
    promises.push($i.CLI.exec(`mkdir -p  ${destination}/models`));
    promises.push($i.CLI.exec(`mkdir -p  ${destination}/private`));
    promises.push($i.CLI.exec(`mkdir -p  ${destination}/protected`));

    await Promise.all(promises);
    promises = [];
    promises.push(copyFile(`${root}/modules/globalTypes/global.base.ts`, `${destination}/global.base.ts`));
    promises.push(copyFile(`${root}/modules/globalTypes/global.vars.ts`, `${destination}/global.vars.ts`));
    // fs.createReadStream(`${root}/modules/globalTypes/global.base.ts`).pipe(fs.createWriteStream(`${destination}/global.base.ts`));
    // fs.createReadStream(`${root}/modules/globalTypes/global.vars.ts`).pipe(fs.createWriteStream(`${destination}/global.vars.ts`));
    promises.push($f.writeFile(`${destination}/global.ts`, globalContents));
    promises.push($f.writeFile(`${destination}/index.ts`, baseContents));
    promises.push($f.writeFile(`${destination}/noConflict.ts`, noConflictContents));
    promises.push($f.writeFile(`${destination}/__prototypes.ts`, prototypesContent));


    let files = (await getDependencies(`${root}/modules/${name}/index.template`))
        .concat(await getDependencies(`${root}/modules/${name}/__prototypes.ts`));
    files = $a.condense(files, true);
    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        promises.push(copyFile(file, file.replace('/modules/', `/transformed/${name}/`)));
        // fs.createReadStream(file).pipe(fs.createWriteStream(file.replace('/modules/', `/transformed/${name}/`)));
    }
    await Promise.all(promises);
}

async function getDependencies(filePath, results = []) {
    try {
        if (~results.indexOf(filePath)) {
            return results;
        }
        console.log($f.CONSOLE_COLORS.GREEN, `processing ${filePath}`);
        const fileContent = (await $f.readFile(`${filePath}`, 'utf8')) || "";
        if (!fileContent.match) { console.log(fileContent, filePath); }
        let matches = fileContent.match(/from ['"](.*?)['"]/g);

        if (!matches || !matches.length) { return []; }
        const dir = path.dirname(filePath);

        for (let i = 0, len = matches.length; i < len; i++) {
            let dependencyPath = matches[i].replace(/from ['"](.*?)['"]/, '$1.ts');
            if (dependencyPath[0] != '.') { continue; }
            let absolutePath = path.resolve(`${dir}/${dependencyPath}`);
            if (/__prototypes\.ts$/.test(absolutePath)) { continue; }
            await getDependencies(absolutePath, results);
            results.push(absolutePath);
        }

        return results || [];
    } catch (e) {
        console.log(e);
    }
}
async function prep() {
    let promises = [];

    promises.push($i.CLI.exec(`rm -rf ${root}/transformed;`));
    promises.push($i.CLI.exec(`mkdir -p  ${root}/transformed`));

    let results = await Promise.all(promises);
    return results[0];
}
start();