#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const path = require('path');
const condense = require('../modules/methods/condense').default;
const readdir = require('../modules/methods/readdir').default;
const readFile = require('../modules/methods/readFile').default;
const writeFile = require('../modules/methods/writeFile').default;
const CLI = require('../modules/cli/__prototypes').CLI;
const copyFile = require('../modules/methods/copyFile').default;
CONSOLE_COLORS = CONSOLE_COLORS || {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};

var package = require(`./package.json`, "utf8");
var version = require(`${root}/package.json`, "utf8").version;
var spaces = 37 - version.length;
var gitUrlTemplate = "git+https://github.com/craydent/Node-Library.git";
var homepageUrlTemplate = "https://bitbucket.org/craydent/node-library/src//submodules/${submodule}/";

let meta = "/*/---------------------------------------------------------/*/\n\
    /*/ Craydent LLC node-v" + version + "";
for (var i = 0; i < spaces; i++) { meta += " "; }
meta += "/*/\n\
/*/ Copyright 2011 (http://craydent.com/about)              /*/\n\
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/\n\
/*/ (http://craydent.com/license)                           /*/\n\
/*/---------------------------------------------------------/*/\n\
/*/---------------------------------------------------------/*/\n";
const details = require('./details.json');
var defaultKeywords = [
    "craydent",
    "library",
    "jquery",
    "es6",
    "sugar",
    "utilities"
];

async function start(pkgPrefix) {
    await prep();
    let folders = await readdir(`${root}/modules/`);
    let promises = [];
    const exclude = { globalTypes: 1, methods: 1, models: 1, private: 1, protected: 1, "package.json": 1 };
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        if (folder in exclude) { continue; }
        promises.push(processModule(folder, pkgPrefix));
    }
    await Promise.all(promises);
    await createMethodPackages(pkgPrefix);
    console.log(CONSOLE_COLORS.GREEN, 'all done')
}
async function processModule(name, pkgPrefix) {
    const destination = `${root}/transformedMajor/${name}`;
    let contents = await readFile(`${root}/modules/${name}/index.template`, 'utf8');
    contents = contents.replace(/\.\.\/private/g, './private')
        .replace(/\.\.\/protected/g, './protected')
        .replace(/\.\.\/methods/g, './methods')
        .replace(/\.\.\/models/g, './models');
    const globalContents = contents.replace('<reference path="../globalTypes/global.vars.ts" />', '<reference path="./global.vars.ts" />')
        .replace(/from '..\//g, 'from \'./');
    const baseContents = globalContents.replace(/\/\/#region global[\s\S]*?\/\/#endregion global/g, '')
        .replace('global.vars.ts', 'global.base.ts');
    const noConflictContents = baseContents.replace(/\/\/#region proto[\s\S]*?\/\/#endregion proto/g, '')
        .replace(/\/\/\/<reference path=.*?\/>[\n]/, '');
    let proto = await readFile(`${root}/modules/${name}/__prototypes.ts`, 'utf8');
    const prototypesContent = proto.replace(/from '..\//g, 'from \'./')
        .replace(/\.\.\/private/g, './private')
        .replace(/\.\.\/protected/g, './protected')
        .replace(/\.\.\/methods/g, './methods')
        .replace(/\.\.\/models/g, './models');;

    let promises = [];
    promises.push(CLI.exec(`mkdir -p  ${destination}`));
    promises.push(CLI.exec(`mkdir -p  ${destination}/methods`));
    promises.push(CLI.exec(`mkdir -p  ${destination}/models`));
    promises.push(CLI.exec(`mkdir -p  ${destination}/private`));
    promises.push(CLI.exec(`mkdir -p  ${destination}/protected`));

    await Promise.all(promises);
    promises = [];
    promises.push(copyFile(`${root}/modules/globalTypes/global.base.ts`, `${destination}/global.base.ts`));
    promises.push(copyFile(`${root}/modules/globalTypes/global.vars.ts`, `${destination}/global.vars.ts`));
    // fs.createReadStream(`${root}/modules/globalTypes/global.base.ts`).pipe(fs.createWriteStream(`${destination}/global.base.ts`));
    // fs.createReadStream(`${root}/modules/globalTypes/global.vars.ts`).pipe(fs.createWriteStream(`${destination}/global.vars.ts`));
    promises.push(writeFile(`${destination}/global.ts`, globalContents));
    promises.push(writeFile(`${destination}/index.ts`, baseContents));
    promises.push(writeFile(`${destination}/noConflict.ts`, noConflictContents));
    promises.push(writeFile(`${destination}/__prototypes.ts`, prototypesContent));


    let files = [], alterFiles = [];
    await getDependencies(`${root}/modules/${name}/index.template`, files, alterFiles)
    await getDependencies(`${root}/modules/${name}/__prototypes.ts`, files, alterFiles);
    files = condense(files, true);
    alterFiles = condense(alterFiles, true);


    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        promises.push(copyFile(file, file.replace('/modules/', `/transformedMajor/${name}/`)));
        // fs.createReadStream(file).pipe(fs.createWriteStream(file.replace('/modules/', `/transformedMajor/${name}/`)));
    }
    await Promise.all(promises);

    let alterPromises = [];
    for (let i = 0, len = alterFiles.length; i < len; i++) {
        let file = alterFiles[i] = alterFiles[i].replace(`/modules/${name}/`, `/transformedMajor/${name}/`).replace(`/modules/`, `/transformedMajor/${name}/`);

        alterPromises.push(readFile(file, 'utf8'));
    }
    let fileContents = await Promise.all(alterPromises);
    let writePromises = [];
    for (let i = 0, len = fileContents.length; i < len; i++) {
        let fileData = fileContents[i].replace('<reference path="../globalTypes/', '<reference path="../');

        writePromises.push(writeFile(alterFiles[i], fileData));
    }
    await Promise.all(writePromises);
    await createPackageJSONMajor(name, pkgPrefix);

    console.log(CONSOLE_COLORS.GREEN, `completed transform for ${name}`)
}

async function getDependencies(filePath, results = [], alterFiles = []) {
    try {
        if (~results.indexOf(filePath)) {
            return results;
        }
        console.log(CONSOLE_COLORS.GREEN, `processing ${filePath}`);
        const fileContent = (await readFile(`${filePath}`, 'utf8')) || "";
        if (~fileContent.indexOf('<reference path="../globalTypes/') && !/index.template$/.test(filePath)) { alterFiles.push(filePath); }
        if (!fileContent.match) { console.log(fileContent, filePath); }
        let matches = fileContent.match(/from ['"](.*?)['"]/g);

        if (!matches || !matches.length) { return []; }
        const dir = path.dirname(filePath);

        for (let i = 0, len = matches.length; i < len; i++) {
            let dependencyPath = matches[i].replace(/from ['"](.*?)['"]/, '$1.ts');
            if (dependencyPath[0] != '.') { continue; }
            let absolutePath = path.resolve(`${dir}/${dependencyPath}`);
            if (/__prototypes\.ts$/.test(absolutePath)) { continue; }
            await getDependencies(absolutePath, results, alterFiles);
            results.push(absolutePath);
        }

        return results || [];
    } catch (e) {
        console.log(e);
    }
}
async function prep() {
    let promises = [];

    promises.push(CLI.exec(`rm -rf ${root}/transformedMajor;`));
    promises.push(CLI.exec(`rm -rf ${root}/transformedMinor;`));
    promises.push(CLI.exec(`mkdir -p  ${root}/transformedMajor`));
    promises.push(CLI.exec(`mkdir -p  ${root}/transformedMinor`));

    let results = await Promise.all(promises);
    return results[0];
}

async function createPackageJSONMajor(folder, pkgPrefix) {
    const path = `${root}/transformedMajor/${folder}`;

    package.name = `${pkgPrefix}craydent-${folder}`;
    package.version = version;
    package.description = details[folder].description;
    package.keywords = details[folder].keywords.concat(defaultKeywords, [folder]).sort();
    package.repository.url = package.repository.url.replace("${submodule}", folder);
    package.homepage = package.homepage.replace("${submodule}", folder);

    await writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        console.log(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
    });
}
async function createPackageJSONMinor(file, pkgPrefix) {
    const path = `${root}/transformedMinor/craydent.${file}`;

    package.name = `${pkgPrefix}craydent.${file}`;
    package.version = version;
    package.description = '';//details[file].description;
    package.keywords = [];//details[file].keywords.concat(defaultKeywords, [file]).sort();
    package.repository.url = package.repository.url.replace("${submodule}", file);
    package.homepage = package.homepage.replace("${submodule}", file);

    await writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        console.log(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
    });
}
async function createMethodPackages(pkgPrefix) {

    let files = await readdir(`${root}/modules/methods`);
    let promises = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let prepPromises = [];
        let contents = await readFile(`${root}/modules/methods/${file}`, 'utf8');
        contents = contents.replace(/\.\.\/private/g, './private')
            .replace(/\.\.\/protected/g, './protected')
            .replace(/\.\.\/methods/g, './methods')
            .replace(/\.\.\/models/g, './models')
            .replace('<reference path="../globalTypes/', '<reference path="./globalTypes/');;

        const folder = file.replace(/\.ts$/i, '');
        const destination = `${root}/transformedMinor/craydent.${folder}`;
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}'`));
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}/methods'`));
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}/models'`));
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}/private'`));
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}/protected'`));
        prepPromises.push(CLI.exec(`mkdir -p  '${destination}/globalTypes'`));
        let dependencies = await getDependencies(`${root}/modules/methods/${file}`);
        dependencies = condense(dependencies, true);

        await Promise.all(prepPromises);

        promises.push(copyFile(`${root}/modules/globalTypes/global.base.ts`, `${destination}/globalTypes/global.base.ts`));
        promises.push(copyFile(`${root}/modules/globalTypes/global.vars.ts`, `${destination}/globalTypes/global.vars.ts`));
        for (let i = 0, len = dependencies.length; i < len; i++) {
            let file = dependencies[i];
            promises.push(await copyFile(file, file.replace('/modules/', `/transformedMinor/craydent.${folder}/`)));
        }

        promises.push(writeFile(`${destination}/index.ts`, contents));
        promises.push(createPackageJSONMinor(folder, pkgPrefix));
        promises.push(createReadme());
    }
    await Promise.all(promises);
}
async function createReadme() {

}
module.exports.start = start;


function condense(arr, check_values) {
    try {
        let skip = [], items = [], without = false;
        if (check_values && check_values.constructor == Array) {
            without = true;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i];
            if (check_values) {
                let index = i;
                if (without && ~check_values.indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = arr.indexOf(obj, index + 1))) {
                    skip.push(index);
                }

            }
            obj !== "" && !isNull(obj) && !~skip.indexOf(i) && items.push(obj);
        }
        return items;
    } catch (e) /* istanbul ignore next */ {
        error && error("condence", e);
        return [];
    }
}
function isNull(value, defaultValue) {
    try {
        let isnull = value == null || value == undefined;
        if (arguments.length === 1) {
            return isnull;
        }
        return isnull ? defaultValue : value;
    } catch (e) /* istanbul ignore next */ {

    }
}