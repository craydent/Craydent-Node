#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const fs = require('fs');
const path = require('path');
const $a = require('@craydent/craydent-array/noConflict');
const $f = require('@craydent/craydent-fs/noConflict');
const $i = require('@craydent/craydent-cli/noConflict');
const $cf = require('@craydent/craydent-control-flow/noConflict');
$f.CONSOLE_COLORS = $f.CONSOLE_COLORS || {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
const copyFile = $cf.yieldable(fs.copyFile, fs);

var package = require(`${root}/modules/package.json`, "utf8");
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
const details = {
    "array": {
        "description": "Node module to extend array functionality and simplify code for maintainability and readability",
        "keywords": [
            "mongo",
            "mongodb"
        ]
    },
    "class": {
        "description": "Node module implementing addition classes for functionality and to simplify code for maintainability and readability",
        "keywords": [
            "array",
            "cursor",
            "benchmark",
            "ordered list",
            "queue",
            "set"
        ]
    },
    "cli": {
        "description": "Node module to manage command line execution and arguments",
        "keywords": [
            "commander"
        ]
    },
    "control-flow": {
        "description": "Node module for control flow and async functionality to simplify code for maintainability and readability",
        "keywords": []
    },
    "date": {
        "description": "Node module to extend fs/file system functionality and simplify code for maintainability and readability",
        "keywords": [
            "moment",
            "parser"
        ]
    },
    "fs": {
        "description": "Node module to extend fs functionality and simplify code for maintainability and readability",
        "keywords": [
            "require",
            "require directory",
            "file"
        ]
    },
    "function": {
        "description": "Node module to extend function functionality and simplify code for maintainability and readability",
        "keywords": [
            "control flow"
        ]
    },
    "http": {
        "description": "Node module http servers and routing",
        "keywords": [
            "ajax",
            "express",
            "http",
            "json",
            "koa",
            "parser",
            "REST",
            "route",
            "swagger"
        ]
    },
    "json-parser": {
        "description": "Node module to parse complex json including circular references",
        "keywords": [
            "json",
            "object",
            "parser",
            "string"
        ]
    },
    "number": {
        "description": "Node module to extend number functionality and simplify code for maintainability and readability",
        "keywords": []
    },
    "object": {
        "description": "Node module to extend all native class functionality and simplify code for maintainability and readability",
        "keywords": [
            "array",
            "class",
            "co",
            "control flow",
            "date",
            "function",
            "json",
            "moment",
            "mongo",
            "mongodb",
            "number",
            "object",
            "regexp",
            "string",
            "template",
            "typeof"
        ]
    },
    "regexp": {
        "description": "Node module to extend regular expressions functionality and simplify code for maintainability and readability",
        "keywords": []
    },
    "string": {
        "description": "Node module to extend string functionality and simplify code for maintainability and readability",
        "keywords": [
            "template",
        ]
    },
    "template": {
        "description": "Node module for templating to simplify code for maintainability and readability",
        "keywords": []
    },
    "typeof": {
        "description": "Node module for type checking",
        "keywords": []
    },
    "utility": {
        "description": "Node module to for commonly needed utility functions",
        "keywords": [
            "ajax",
            "cluster",
            "guid",
            "uuid",
            "md5",
            "fs",
            "mkdir",
            "zip"
        ]
    },
    "xml-to-json": {
        "description": "Node module to parse xml into json",
        "keywords": [
            "xml",
            "xml to json"
        ]
    }
}
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
    let folders = await $f.readdir(`${root}/modules/`);
    let promises = [];
    const exclude = { globalTypes: 1, methods: 1, models: 1, private: 1, protected: 1, "package.json": 1 };
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        if (folder in exclude) { continue; }
        promises.push(processModule(folder, pkgPrefix));
    }
    await Promise.all(promises);
    await createMethodPackages(pkgPrefix);
    console.log($f.CONSOLE_COLORS.GREEN, 'all done')
}
async function processModule(name, pkgPrefix) {
    const destination = `${root}/transformedMajor/${name}`;
    let contents = await $f.readFile(`${root}/modules/${name}/index.template`, 'utf8');
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
    let proto = await $f.readFile(`${root}/modules/${name}/__prototypes.ts`, 'utf8');
    const prototypesContent = proto.replace(/from '..\//g, 'from \'./')
        .replace(/\.\.\/private/g, './private')
        .replace(/\.\.\/protected/g, './protected')
        .replace(/\.\.\/methods/g, './methods')
        .replace(/\.\.\/models/g, './models');;

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


    let files = [], alterFiles = [];
    await getDependencies(`${root}/modules/${name}/index.template`, files, alterFiles)
    await getDependencies(`${root}/modules/${name}/__prototypes.ts`, files, alterFiles);
    files = $a.condense(files, true);
    alterFiles = $a.condense(alterFiles, true);


    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        promises.push(copyFile(file, file.replace('/modules/', `/transformedMajor/${name}/`)));
        // fs.createReadStream(file).pipe(fs.createWriteStream(file.replace('/modules/', `/transformedMajor/${name}/`)));
    }
    await Promise.all(promises);

    let alterPromises = [];
    for (let i = 0, len = alterFiles.length; i < len; i++) {
        let file = alterFiles[i] = alterFiles[i].replace(`/modules/${name}/`, `/transformedMajor/${name}/`).replace(`/modules/`, `/transformedMajor/${name}/`);

        alterPromises.push($f.readFile(file, 'utf8'));
    }
    let fileContents = await Promise.all(alterPromises);
    let writePromises = [];
    for (let i = 0, len = fileContents.length; i < len; i++) {
        let fileData = fileContents[i].replace('<reference path="../globalTypes/', '<reference path="../');

        writePromises.push($f.writeFile(alterFiles[i], fileData));
    }
    await Promise.all(writePromises);
    await createPackageJSONMajor(name, pkgPrefix);

    console.log($f.CONSOLE_COLORS.GREEN, `completed transform for ${name}`)
}

async function getDependencies(filePath, results = [], alterFiles = []) {
    try {
        if (~results.indexOf(filePath)) {
            return results;
        }
        console.log($f.CONSOLE_COLORS.GREEN, `processing ${filePath}`);
        const fileContent = (await $f.readFile(`${filePath}`, 'utf8')) || "";
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

    promises.push($i.CLI.exec(`rm -rf ${root}/transformedMajor;`));
    promises.push($i.CLI.exec(`rm -rf ${root}/transformedMinor;`));
    promises.push($i.CLI.exec(`mkdir -p  ${root}/transformedMajor`));
    promises.push($i.CLI.exec(`mkdir -p  ${root}/transformedMinor`));

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

    await $f.writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        console.log($f.CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
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

    await $f.writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        console.log($f.CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
    });
}
async function createMethodPackages(pkgPrefix) {

    let files = await $f.readdir(`${root}/modules/methods`);
    let promises = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let prepPromises = [];
        let contents = await $f.readFile(`${root}/modules/methods/${file}`, 'utf8');
        contents = contents.replace(/\.\.\/private/g, './private')
            .replace(/\.\.\/protected/g, './protected')
            .replace(/\.\.\/methods/g, './methods')
            .replace(/\.\.\/models/g, './models')
            .replace('<reference path="../globalTypes/', '<reference path="./globalTypes/');;

        const folder = file.replace(/\.ts$/i, '');
        const destination = `${root}/transformedMinor/craydent.${folder}`;
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}'`));
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}/methods'`));
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}/models'`));
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}/private'`));
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}/protected'`));
        prepPromises.push($i.CLI.exec(`mkdir -p  '${destination}/globalTypes'`));
        let dependencies = await getDependencies(`${root}/modules/methods/${file}`);
        dependencies = $a.condense(dependencies, true);

        await Promise.all(prepPromises);

        promises.push(copyFile(`${root}/modules/globalTypes/global.base.ts`, `${destination}/globalTypes/global.base.ts`));
        promises.push(copyFile(`${root}/modules/globalTypes/global.vars.ts`, `${destination}/globalTypes/global.vars.ts`));
        for (let i = 0, len = dependencies.length; i < len; i++) {
            let file = dependencies[i];
            promises.push(await copyFile(file, file.replace('/modules/', `/transformedMinor/craydent.${folder}/`)));
        }

        promises.push($f.writeFile(`${destination}/index.ts`, contents));
        promises.push(createPackageJSONMinor(folder, pkgPrefix));
        promises.push(createReadme());
    }
    await Promise.all(promises);
}
async function createReadme() {

}
module.exports.start = start;