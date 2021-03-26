#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const fs = require('fs');
const path = require('path');
const util = require('util');
const CONSOLE_COLORS = {
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
    const exclude = {
        globalTypes: 1,
        methods: 1,
        models: 1,
        private: 1,
        protected: 1,
        "package.json": 1,
        "index.ts": 1,
        "global.ts": 1,
        "noConflict.ts": 1
    };
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        if (folder in exclude) { continue; }
        promises.push(processModule(folder, pkgPrefix));
    }
    promises.push(updateMainModule(pkgPrefix));
    await Promise.all(promises);
    await createMethodPackages(pkgPrefix);
    console.log('\n');
    console.log(CONSOLE_COLORS.GREEN, 'all done');
}
async function updateMainModule(pkgPrefix) {
    let contents = await readFile(`${root}/modules/index.ts`, 'utf8');
    contents = contents.replace(/\$\{prefix\}/g, pkgPrefix);
}
async function processModule(name, pkgPrefix) {
    const destination = `${root}/compiled/transformedMajor/${name}`;
    let contents = await readFile(`${root}/modules/${name}/index.template`, 'utf8');
    contents = contents.replace(/\.\.\/private/g, './private')
        .replace(/\.\.\/protected/g, './protected')
        .replace(/['"]\.\.?\/methods\/(.*)?['"]/g, (str, captured) => `'${pkgPrefix}craydent.${captured.toLowerCase().replace('$', '')}'`)
        .replace(/craydent\.(\$[a-zA-Z]*)/g, (s) => s.toLowerCase().replace('$', ''))
        .replace(/\.\.\/models/g, './models');
    const typesDefinitions = contents.replace(/[\s\S]*?\/\/#region typeDefs([\s\S]*?)\/\/#endregion typeDefs[\s\S]*/g, '$1');
    let globalContents = contents.replace('<reference path="../globalTypes/global.vars.d.ts" />', '<reference path="./global.vars.d.ts" />')
        .replace(/from '..\//g, 'from \'./');
    let baseContents = globalContents.replace(/\/\/#region global[\s\S]*?\/\/#endregion global/g, '')
        .replace('global.vars.d.ts', 'global.base.d.ts');
    let noConflictContents = baseContents.replace(/\/\/#region proto[\s\S]*?\/\/#endregion proto/g, '')
        .replace(/\/\/\/<reference path=.*?\/>[\n]/, '');
    let proto = await readFile(`${root}/modules/${name}/__prototypes.ts`, 'utf8');
    let prototypesContent = proto.replace(/\.\.\/private/g, './private')
        .replace(/\.\.\/protected/g, './protected')
        .replace(/['"]\.\.?\/methods\/(.*)?['"]/g, (str, captured) => `'${pkgPrefix}craydent.${captured.toLowerCase().replace('$', '')}'`)
        .replace(/craydent\.(\$?[a-zA-Z]*)/g, (s) => s.toLowerCase().replace('$', ''))
        .replace(/\.\.\/models/g, './models')

    let promises = [];
    promises.push(_cli_exec(`mkdir -p  ${destination}`));
    if (name in { 'object': 1, 'typeof': 1 }) {
        prototypesContent = prototypesContent.replace('./private/__common', `${pkgPrefix}craydent.addobjectprototype/private/__common`);
    }
    if (~prototypesContent.indexOf('craydent.cli') || ~prototypesContent.indexOf('craydent.xmltojson')
        || ~contents.indexOf('craydent.cli') || ~contents.indexOf('craydent.xmltojson')) {
        prototypesContent = prototypesContent.replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), './methods/xmlToJson').replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), './methods/cli')
        contents = contents.replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), './methods/xmlToJson').replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), './methods/cli')
        noConflictContents = noConflictContents.replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), './methods/xmlToJson').replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), './methods/cli')
        baseContents = baseContents.replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), './methods/xmlToJson').replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), './methods/cli')
        globalContents = globalContents.replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), './methods/xmlToJson').replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), './methods/cli')
        promises.push(_cli_exec(`mkdir -p  ${destination}/methods`));
    }
    promises.push(_cli_exec(`mkdir -p  ${destination}/models`));
    promises.push(_cli_exec(`mkdir -p  ${destination}/private`));
    promises.push(_cli_exec(`mkdir -p  ${destination}/protected`));

    await Promise.all(promises);
    promises = [];
    promises.push(copyFile(`${root}/modules/globalTypes/global.base.d.ts`, `${destination}/global.base.d.ts`));
    promises.push(copyFile(`${root}/modules/globalTypes/global.vars.d.ts`, `${destination}/global.vars.d.ts`));

    promises.push(writeFile(`${destination}/global.ts`, globalContents));
    promises.push(writeFile(`${destination}/index.ts`, baseContents));
    promises.push(writeFile(`${destination}/noConflict.ts`, noConflictContents));
    promises.push(writeFile(`${destination}/__prototypes.ts`, prototypesContent));

    let files = [], alterFiles = [], modules = [];

    await getDependencies(pkgPrefix, `${root}/modules/${name}/index.template`, files, alterFiles, modules)
    await getDependencies(pkgPrefix, `${root}/modules/${name}/__prototypes.ts`, files, alterFiles, modules);
    files = condense(files, true).sort();
    alterFiles = condense(alterFiles, true).sort();
    modules = condense(modules, true).sort();

    let dependencies = {};
    for (let i = 0, len = modules.length; i < len; i++) {
        dependencies[modules[i]] = version;
    }
    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        promises.push(copyDependency(pkgPrefix, file, file.replace('/modules/', `/compiled/transformedMajor/${name}/`)));
    }
    await Promise.all(promises);

    let alterPromises = [];
    for (let i = 0, len = alterFiles.length; i < len; i++) {
        let file = alterFiles[i] = alterFiles[i].replace(`/modules/${name}/`, `/compiled/transformedMajor/${name}/`).replace(`/modules/`, `/compiled/transformedMajor/${name}/`);

        alterPromises.push(readFile(file, 'utf8'));
    }
    let fileContents = await Promise.all(alterPromises);
    let writePromises = [];
    for (let i = 0, len = fileContents.length; i < len; i++) {
        let fileData = fileContents[i].replace('<reference path="../globalTypes/', '<reference path="../');

        writePromises.push(writeFile(alterFiles[i], fileData));
    }
    await Promise.all(writePromises);
    await createPackageJSONMajor(name, pkgPrefix, dependencies);

    // console.log(CONSOLE_COLORS.GREEN, `completed transform for ${name}`)
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(util.format(CONSOLE_COLORS.GREEN, `completed transform for ${name}\r`));
}

async function getDependencies(pkgPrefix, filePath, results = [], alterFiles = [], modules = []) {
    try {
        if (~results.indexOf(filePath)) {
            return results;
        }
        // console.log(CONSOLE_COLORS.GREEN, `processing ${filePath}`);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(util.format(CONSOLE_COLORS.GREEN, `processing ${filePath}\r`));
        const fileContent = (await readFile(`${filePath}`, 'utf8')) || "";
        // if (!fileContent.indexOf) { console.log(fileContent); console.log('-------------------------------------------------------'); }
        if (~fileContent.indexOf('<reference path="../globalTypes/') && !/index.template$/.test(filePath)) { alterFiles.push(filePath); }
        if (!fileContent.match) { console.log(fileContent, filePath); }
        let matches = fileContent
            .replace(/['"]\.\.?\/methods\/(.*)?['"]/g, (str, captured) => `'${pkgPrefix}craydent.${captured.toLowerCase().replace('$', '')}'`)
            .replace(new RegExp(`${pkgPrefix}craydent\\.xmltojson`, 'ig'), '../methods/xmlToJson')
            .replace(new RegExp(`${pkgPrefix}craydent\\.cli`, 'ig'), '../methods/cli')
            .match(/from ['"](.*?)['"]/g);

        if (!matches || !matches.length) { return []; }
        const dir = path.dirname(filePath);

        for (let i = 0, len = matches.length; i < len; i++) {
            let dependencyPath = matches[i].replace(/from ['"](.*?)['"]/, '$1');
            if (dependencyPath[0] != '.') {
                dependencyPath = dependencyPath.toLowerCase().replace('$', '').replace(/@craydent\//g, '');
                const isNodeMods = !!~['http', 'https', 'fs', 'path', 'child_process', 'cluster', 'os', 'util', 'crypto'].indexOf(dependencyPath);
                !isNodeMods && modules.push(pkgPrefix + dependencyPath);// && npmModules.push(pkgPrefix + dependencyPath);
                continue;
            }
            let absolutePath = !!~dependencyPath.indexOf('/models/') ? path.resolve(`${dir}/${dependencyPath}.d.ts`) : path.resolve(`${dir}/${dependencyPath}.ts`);
            if (/__prototypes\.ts$/.test(absolutePath)) { continue; }
            await getDependencies(pkgPrefix, absolutePath, results, alterFiles, modules);
            results.push(absolutePath);
        }

        return results || [];
    } catch (e) {
        console.log(e);
    }
}
async function prep() {
    let promises = [];

    promises.push(_cli_exec(`rm -rf ${root}/compiled;`));
    promises.push(_cli_exec(`mkdir -p  ${root}/compiled/transformedMajor`));
    promises.push(_cli_exec(`mkdir -p  ${root}/compiled/transformedMinor`));

    let results = await Promise.all(promises);
    return results[0];
}

async function createPackageJSONMajor(folder, pkgPrefix, dependencies) {
    const path = `${root}/compiled/transformedMajor/${folder}`;

    package.name = `${pkgPrefix}craydent-${folder}`;
    package.version = version;
    package.description = details[folder].description;
    package.keywords = details[folder].keywords.concat(defaultKeywords, [folder]).sort();
    package.repository.url = package.repository.url.replace("${submodule}", folder);
    package.homepage = package.homepage.replace("${submodule}", folder);
    package.dependencies = dependencies;

    await writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        // console.log(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(util.format(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json\r`));
    });
}
async function createPackageJSONMinor(file, pkgPrefix, dependencies) {
    const path = `${root}/compiled/transformedMinor/craydent.${file}`;

    package.name = `${pkgPrefix}craydent.${file.toLowerCase().replace('$', '')}`;
    package.version = version;
    package.description = '';//details[file].description;
    package.keywords = [];//details[file].keywords.concat(defaultKeywords, [file]).sort();
    package.repository.url = package.repository.url.replace("${submodule}", file);
    package.homepage = package.homepage.replace("${submodule}", file);
    package.dependencies = dependencies;

    await writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(() => {
        // console.log(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json`)
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(util.format(CONSOLE_COLORS.GREEN, `saved: ${path}/package.json\r`));
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
            .replace(/['"]\.\.?\/methods\/(.*)?['"]/g, (str, captured) => `'${pkgPrefix}craydent.${captured.toLowerCase().replace('$', '')}'`)
            .replace(/craydent\.(\$?[a-zA-Z]*)/g, (s) => s.toLowerCase().replace('$', ''))
            .replace(/\.\.\/models/g, './models')
            .replace('<reference path="../globalTypes/', '<reference path="./globalTypes/');;

        const folder = file.replace(/\.ts$/i, '').replace('$', '').toLowerCase();
        const destination = `${root}/compiled/transformedMinor/craydent.${folder}`;
        prepPromises.push(_cli_exec(`mkdir -p  '${destination}'`));
        prepPromises.push(_cli_exec(`mkdir -p  '${destination}/models'`));
        prepPromises.push(_cli_exec(`mkdir -p  '${destination}/private'`));
        prepPromises.push(_cli_exec(`mkdir -p  '${destination}/protected'`));
        prepPromises.push(_cli_exec(`mkdir -p  '${destination}/globalTypes'`));
        let modules = [];
        let dependencies = await getDependencies(pkgPrefix, `${root}/modules/methods/${file}`, [], [], modules);
        dependencies = condense(dependencies, true);
        modules = condense(modules, true);

        let pkgDeps = {};
        for (let i = 0, len = modules.length; i < len; i++) {
            pkgDeps[modules[i]] = version;
        }
        await Promise.all(prepPromises);

        promises.push(copyFile(`${root}/modules/globalTypes/global.base.d.ts`, `${destination}/globalTypes/global.base.d.ts`));
        promises.push(copyFile(`${root}/modules/globalTypes/global.vars.d.ts`, `${destination}/globalTypes/global.vars.d.ts`));
        for (let i = 0, len = dependencies.length; i < len; i++) {
            let file = dependencies[i];
            promises.push(copyDependency(pkgPrefix, file, file.replace('/modules/', `/compiled/transformedMinor/craydent.${folder}/`)));
        }

        promises.push(writeFile(`${destination}/index.ts`, contents));
        promises.push(createPackageJSONMinor(folder, pkgPrefix, pkgDeps));
        promises.push(createReadme());
    }
    await Promise.all(promises);
}
async function createReadme() {

}
module.exports.start = start;

async function copyDependency(pkgPrefix, path, destination) {
    let content = await readFile(path, 'utf8');

    content = content
        .replace(/['"]\.\.?\/methods\/(.*)?['"]/g, (str, captured) => `'${pkgPrefix}craydent.${captured.toLowerCase().replace('$', '')}'`)
        .replace(/craydent\.(\$[a-zA-Z]*)/g, (s) => s.toLowerCase().replace('$', ''));
    await writeFile(destination, content);
}
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

function writeFile() {
    return _fsHelper.apply(this, ['writeFile', ...arguments]);
}
function readdir() {
    return _fsHelper.apply(this, ['readdir', ...arguments]);
}
function readFile() {
    return _fsHelper.apply(this, ['readFile', ...arguments]);
}
function copyFile() {
    return _fsHelper.apply(this, ['copyFile', ...arguments]);
}
function _cli_exec(command, options, callback) {
    let child = require('child_process');
    if (isFunction(options)) {
        callback = options;
        options = undefined;
    }
    return new Promise(function (res, rej) {
        try {
            if (!command) { res(false); }
            options = options || {};
            options.silent = !!options.silent;

            let output = '';
            const cprocess = child.exec(command, { env: process.env, maxBuffer: 20 * 1024 * 1024 }, function (err) {
                const fin = !err || options.alwaysResolve ? res : rej
                if (options.outputOnly) {
                    if (callback) { callback.call(cprocess, output); }
                    return fin(output);
                }
                if (callback) {
                    const code = err ? err.code : 0;
                    callback.call(cprocess, code, output);
                    return !code ? fin() : fin({ code, output });
                }
                /* istanbul ignore next */
                let code = err ? err.code : 0;
                fin({ code, output });
            });

            cprocess.stdout.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });

            cprocess.stderr.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });
        } catch (e) {
        }
    });
}
function isFunction(obj) {
    return _typeCheck(obj, Function) && !isAsync(obj);
}
function isAsync(obj) {
    try {
        if (isNull(obj)) { return false; }
        const __awaiterSyntax = '__awaiter(this, void 0, void 0';
        const __awaiterSyntax2 = '__awaiter(_this, void 0, void 0';
        if (~obj.toString().indexOf(__awaiterSyntax)
            || ~obj.prototype.constructor.toString().indexOf(__awaiterSyntax)
            || ~obj.toString().indexOf(__awaiterSyntax2)
            || ~obj.prototype.constructor.toString().indexOf(__awaiterSyntax2)) {
            return true;
        }
        return obj.prototype.constructor.name == 'async';
    } catch (e) /* istanbul ignore next */ {
        return null;
    }
}
function _typeCheck(obj, cls, backward_compatible) {
    try {
        if (isNull(obj)) { return false; }
        if (backward_compatible) { return obj.constructor.name == cls; }
        return obj.constructor == cls;
    } catch (e) {
        return null;
    }
}