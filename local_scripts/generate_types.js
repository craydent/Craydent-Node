#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vX.X.X                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var fs = require('fs');
var root = require.resolve('../package.json').replace('/package.json','');
var $u = require('@craydent/craydent-utility/noConflict'),
$t = $u.include('@craydent/craydent-template/noConflict',true),
$i = $u.include('@craydent/craydent-cli/noConflict',true),
$a = $u.include('@craydent/craydent-array/noConflict',true),
$s = $u.include('@craydent/craydent-string/noConflict',true),
$f = $u.include('@craydent/craydent-fs/noConflict',true),
$cls = $u.include('@craydent/craydent-class/noConflict',true);
var dependencies = require(`${root}/submodules/dependencies`);
var globalizables = require(`${root}/submodules/common`)().globalizables;
var typePath = `${root}/@types/DefinitelyTyped/types/craydent`;
var templatePath = `${root}/local_scripts/templates`;
var commonPath = `${typePath}/common`;
var tsConfig = require(`${templatePath}/tsconfig.json`);
var RED = '\x1b[31m%s\x1b[0m';
var GREEN = '\x1b[32m%s\x1b[0m';
var YELLOW = '\x1b[33m%s\x1b[0m';
var mainPath = "base";
var tsConfigFiles = [
    "base/index.d.ts",
    "global/index.d.ts",
    "noConflict/index.d.ts"/*,
    "craydent-tests.ts"*/
];

var modules = dependencies.primary;

var mainTemplate =
'// Type definitions for Craydent 0.8.9\n\
// Project: https://bitbucket.org/craydent/node-library/\n\
// Definitions by: Clark Inada <https://github.com/cinada>\n\
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\n\
// TypeScript Version: 2.6\n\
\n\
${FOREACH ${path} in ${refs}}/// <reference path="${path}" />\n${END FOREACH}\n\
\n\
export = $c;\n\
export as namespace $c;\n\n\
declare const $c: $c.CraydentStatic;\n\
declare namespace $c {\n\
    // tslint:disable-next-line no-empty-interface (This will be augmented)\n\
    interface CraydentStatic {${FOREACH ${constant} in ${constants}}\n${TAB}${TAB}${constant}${END FOREACH}\n\
    }\n\
}\n\
declare global {\n\
    interface Worker { }\n\
    interface GeneratorFunction { }\n\
    interface Set<T> { }\n\
    ${IF (${global})}interface ChildProcess { }\n\
    interface Server { }\n\
    interface IncomingMessage { }\n\
    interface ServerResponse { }\n${END IF}\
}';

var template =
'${IF (${injectHeader})}${TAB}interface CraydentStatic {${END IF}\
${IF ("${category}" != "Class")}\
${TAB}${TAB}${RUN[generateJavadoc;${this};${this.parameters}]}\
${TAB}${TAB}${RUN[generateMethodDefinition;${this};${this.parameters}]}\
${FOREACH ${overload} in ${this.overloads}}\
${TAB}${TAB}${RUN[generateJavadoc;${this};${overload.parameters}]}\
${TAB}${TAB}${RUN[generateMethodDefinition;${this};${overload.parameters}]}\
${END FOREACH}\
${ELSE}${TAB}class ${name}${typeParameter} {\
${RUN[generateClass;${this}]}\
\n}${END IF}\
${IF (${injectHeader})}${TAB}}${END IF}',
gtemplate ='\
${TAB}${RUN[generateJavadoc;${this};${this.parameters}]}\
${IF ("${this.name}" == "Set")}${TAB}// @ts-ignore: Duplicate identifier error\n${END IF}\
${TAB}declare function ${RUN[generateMethodDefinition;${this};${this.parameters}]}\
${FOREACH ${overload} in ${this.overloads}}\
${TAB}${RUN[generateJavadoc;${this};${overload.parameters}]}\
${IF ("${this.name}" == "Set")}${TAB}// @ts-ignore: Duplicate identifier error\n${END IF}\
${TAB}declare function ${RUN[generateMethodDefinition;${this};${overload.parameters}]}\
${END FOREACH}',
TAB = '    ';
$t.TEMPLATE_VARS.push({name: 'TAB', value: TAB})
$f.DEBUG_MODE = true;
global.generateJavadoc = function (obj, parameters) {
    return `
${TAB}${TAB}/**
${TAB}${TAB} * ${obj.info}
${TAB}${TAB} *\n${TAB}${TAB}${javaDocParameters(parameters)}
${TAB}${TAB} * @return ${obj.returnType}
${TAB}${TAB} */\n`;
}
global.generateClass = function (obj){
    let constructors = [{parameters: obj.parameters}].concat(obj.overloads);
    let body = "";
    for (let i = 0, len = constructors.length; i < len; i++) {
        let params = constructors[i].parameters;
        body += generateJavadoc(obj, params);
        body += `${TAB}${TAB}constructor(${javaDocParameters(params, javaDocArg,', ')})\n`;
    }
    let props = obj.instanceProperties || [];
    for (let i = 0, len = props.length; i < len; i++) {
        let prop = props[i];
        body += `${TAB}${TAB}${prop.name}: ${prop.type}\n`;
    }

// "instanceProperties":[
//     {"name":"add", "type":"(value:T) => boolean"},
//     {"name":"hasNext", "type":"boolean"},
//     {"name":"next", "type":"() => {value:T, done:boolean}"},
//     {"name":"size", "type":"number"}
// ],
    return body;
}
function javaDocArg (param) {
    for (var prop in param) {
        if (param.hasOwnProperty(prop)) {
            return `${prop}:${param[prop].replace(/^\((.*?)\).*/,'$1')}`;
        }
    }
}
function javaDocParameters (parameters, formatParameter, delimiter) {
    delimiter = delimiter || `\n${TAB}${TAB}`;
    if (!parameters.length) { return ''; }
    formatParameter = formatParameter || formatJavadocParameter;
    return parameters.map(p => formatParameter(p)).join(delimiter);
}
function formatJavadocParameter (param) {
    for (var prop in param) {
        if (param.hasOwnProperty(prop)) {
            return ` * @param ${prop} ${param[prop]}`;
        }
    }
}
function parseParameter (param, defaults) {
    for (var prop in param) {
        if (param.hasOwnProperty(prop)) {
            // var paramType = param[prop]
            //     .replace(/\((.*?)\).*$/i,'$1')
            //     .replace('Object', 'any')
            //     .replace('Integer', 'number')
            //     .replace('Int', 'number')
            //     .replace('Boolean', 'boolean')
            //     .replace('Bool', 'boolean')
            //     .replace('Char', 'String');
            var paramType = $s.replace_all(param[prop].replace(/\((.*?)\).*$/i,'$1'),
                ['Integer[]', 'Int[]', 'Integer', 'Int', 'Boolean', 'Bool', 'Char'],
                ['number[]', 'number[]', 'number', 'number', 'boolean', 'boolean', 'String']);

            if (defaults && defaults[prop] !== undefined) {
                prop = $s.strip(prop,"?");
                paramType = defaults[prop];
            }
            prop = prop == "default" ? "def" : prop;
            return `${prop}: ${paramType}`;
        }
    }
}
global.generateMethodDefinition = (obj, parameters) => {
    var returnType = obj.returnType.replace(/\((.*?)\).*$/,'$1')
        .replace('Object', 'any')
        .replace('Integer', 'number')
        .replace('Int', 'number')
        .replace('craydent_ctx', 'this')
        .replace('Boolean', 'boolean')
        .replace('Bool', 'boolean'),
        params = parameters.map(p => parseParameter(p, obj.defaults)).join(`,\n${TAB}${TAB}${TAB}`);
        if (params) {
            params = `\n${TAB}${TAB}${TAB}${params}\n${TAB}${TAB}`;
        }
    return `${obj.name}${obj.typeParameter || ''}(${params}): ${returnType}\n`;
};
async function prep () {
    var promises = [];

    promises.push($f.readFile(`${templatePath}/common.template.ct`, 'utf8'));
    // promises.push($f.readFile(`${commonPath}/common.template.d.ts`, 'utf8'));
    promises.push($i.CLI.exec(`rm -rf ${typePath}/${mainPath};`));
    promises.push($i.CLI.exec(`rm -rf ${typePath}/global;`));
    promises.push($i.CLI.exec(`rm -rf ${typePath}/noConflict;`));
    promises.push($i.CLI.exec(`rm -f ${typePath}/index.d.ts;`));
    promises.push($i.CLI.exec(`rm -f ${commonPath}/common.p.d.ts`));
    // promises.push($i.CLI.exec(`rm -f ${commonPath}/common.p.d.ts`));
    promises.push($i.CLI.exec(`rm -rf ${commonPath}/noConflict`));
    promises.push($i.CLI.exec(`rm -rf ${commonPath}/base`));
    promises.push($i.CLI.exec(`rm -rf ${commonPath}/global`));
    promises.push($i.CLI.exec(`mkdir -p  ${commonPath}/noConflict`));
    promises.push($i.CLI.exec(`mkdir -p  ${commonPath}/base`));
    promises.push($i.CLI.exec(`mkdir -p  ${commonPath}/global`));
    promises.push($i.CLI.exec(`mkdir -p  ${typePath}/${mainPath}`));
    promises.push($i.CLI.exec(`mkdir -p  ${typePath}/global`));
    promises.push($i.CLI.exec(`mkdir -p  ${typePath}/noConflict`));

    for (var prop in modules) {
        let path = `${typePath}/${prop}`;
        let commads = [
            `rm -rf ${path}`,
            `rm -rf ${typePath}-${prop}`,
            `rm -f ${typePath}-${prop}/tslint.json`,
            `rm -f ${typePath}-${prop}/tsconfig.json`,
            `rm -f ${typePath}-${prop}/readme.md`,
            `mkdir -p ${path}/noConflict`,
            `mkdir -p ${path}/base`,
            `mkdir -p ${path}/global`,
            `mkdir -p ${typePath}-${prop}/common/noConflict`,
            `mkdir -p ${typePath}-${prop}/common/base`,
            `mkdir -p ${typePath}-${prop}/common/global`,
            `mkdir -p ${typePath}-${prop}/noConflict`,
            `mkdir -p ${typePath}-${prop}/base`,
            `mkdir -p ${typePath}-${prop}/global`
        ];
        promises.push($i.CLI.exec(commads.join(';')));
    }
    var results = await Promise.all(promises);
    return results[0];
}
function populateCommon (populationCommon, prop, promises, subpath) {
    let addRefs = prop in { "array": 1, "date": 1, "function": 1, "number": 1, "object": 1, "regexp": 1, "string": 1 };
    let submoduleText = [];
    let refs = [];
    let generateP = subpath != "noConflict";

    for (let i = 0, len = populationCommon.length; i < len; i++) {
        let method = populationCommon[i];
        let name = method in { "delete":1,"catch":1,"extends":1} ? `_${method}` : method;
        if (addRefs || true) {
            refs.push(`/// <reference path="../../${prop}/${subpath}/${method}.d.ts" />`);
            generateP && (refs.push(`/// <reference path="../../${prop}/${subpath}/${method}.p.d.ts" />`));
        }
        submoduleText.push(`import { default as ${name} } from "../../${prop}/${subpath}/${method}";`)
    }
    refs.sort();
    submoduleText.sort();
    let body = `${refs.join('\n')}\n\n${submoduleText.join('\n')}`;
    // promises.push($f.writeFile(`${typePath}/common/${subpath}/${prop}.d.ts`, body));
    promises.push($f.writeFile(`${typePath}-${prop}/common/${subpath}/${prop}.d.ts`, body.replace(new RegExp(`${prop}/`,'g'), '')));
}
let contexts = {
};
contexts[`${mainPath}/index`] = {path:"base", dir:"..", ext:".p"};
contexts[`noConflict`] = {path:"noConflict", dir:"..", ext:""};
contexts[`global`] = {path:"global", dir:"..", ext:".p"};
function renderSubmodule (mod, method, prop, dir, context) {
    let subpath = dir;
    let ext = contexts[context].ext;
    let mainFile = context;
    let fstr = mod[method].toString(),
    code = $s.replace_all(fstr,['\n','\\n','\t','\\t'], '').replace(/.*\/\*\|(.*)?\|\*\/.*/, '$1'),
    doc = $u.tryEval(code);
    if (!doc || !doc.category || !$a.contains(doc.category.toLowerCase(), prop.replace('-',' '))) { return; }
    require;
    doc.name = method;
    var param = null;
    var category = $s.replace_all(doc.category.split('|')[0], ' ','-');
    switch (category) {
        case "Array":
            param = {"Array": "(Array<T>) Array to perform the operation on."};
            break;
        case "Date":
        case "Function":
        case "Number":
        case "Object":
        case "RegExp":
        case "String":
            param = {};
            param[category] = `(${category}) ${category} class to perform the operation on.`;
            break;
    }
    switch (prop){
        case "cli":
        case "control-flow":
        case "fs":
        case "http":
        case "json-parser":
        case "template":
        case "typeof":
        case "utility":
        case "xml-to-json":
            category = "Utility";
            break;
    }
    if (!doc.overloads) {
        console.error(RED, `${method} has no overloads property`);
    }
    doc.overloads = doc.overloads || [];

    let submoduleText = `import $c = require("../../${mainFile}");\ndeclare module "../../${mainFile}" {\n`;
    var promises = [];
    if (doc) {
        doc.injectHeader = doc.category != "Class";
        if ((mainFile == `${mainPath}/index` || mainFile == `global`)) {
            var type = $s.replace_all((category == "Array" ? "Array<T>" : category), '-', '');
            doc.injectHeader = false;
            var body = `/// <reference path="../../common/common${ext}.d.ts" />\ninterface ${type} {\n${$t.fillTemplate(template, doc)}\n}`;
            if (mainFile == `global` && ~globalizables.indexOf(doc.name)) {
                body += `\n${$t.fillTemplate(gtemplate, doc)}`
            }
            // promises.push($f.writeFile(`${typePath}/${prop}/${subpath}/${method}${ext}.d.ts`, body)
            // .then((success)=>{
            //     if (success) {
            //         // console.log(GREEN, `${typePath}/${prop}/${subpath}/${method}${ext}.d.ts`);
            //     } else {
            //         console.error(success);
            //     }
            //     // console.log(success ? `${typePath}/${prop}/${subpath}/${method}${ext}.d.ts done:${success}` : success);
            // }));
            promises.push($f.writeFile(`${typePath}-${prop}/${subpath}/${method}${ext}.d.ts`, body.replace(/\.\.\/\.\.\//g,'../'))
            .then((success)=>{
                if (success) {
                    // console.log(GREEN, `${typePath}-${prop}/${subpath}/${method}${ext}.d.ts`);
                } else {
                    console.error(success);
                }
                // console.log(success ? `${typePath}-${prop}/${subpath}/${method}${ext}.d.ts done:${success}` : success);
            }));
            doc.injectHeader = true;
        }
        if (method != 'emit') {
            param && doc.parameters.unshift(param);
        }
        for (var i = 0, len = doc.overloads.length; param && i < len; i++) {
            doc.overloads[i].parameters.unshift(param);
        }
        submoduleText += $t.fillTemplate(template, doc);

    }
    submoduleText += '\n}';
    // promises.push($f.writeFile(`${typePath}/${prop}/${subpath}/${method}.d.ts`, submoduleText)
    //     .then((success)=>{
    //         if (success) {
    //             // console.log(GREEN, `${typePath}/${prop}/${subpath}/${method}.d.ts`);
    //         } else {
    //             console.error(success);
    //         }
    //         // console.log(success ? `${typePath}/${prop}/${subpath}/${method}.d.ts done:${success}` : success);
    //     }))
    promises.push($f.writeFile(`${typePath}-${prop}/${subpath}/${method}.d.ts`, submoduleText.replace(/\.\.\/\.\.\//g,'../'))
        .then((success)=>{
            if (success) {
                // console.log(GREEN, `${typePath}-${prop}/${subpath}/${method}.d.ts`);
            } else {
                console.error(success);
            }
            // console.log(success ? `${typePath}-${prop}/${subpath}/${method}.d.ts done:${success}` : success);
        }))
    return promises;
}
async function updateTSConfig (prop, types) {
    prop = prop || '';
    types = types || [];
    if (prop) {
        prop = `-${prop}`;
    }
    prop += '/';
    tsConfig.files = tsConfigFiles.concat([`craydent${prop.slice(0,-1)}-tests.ts`]);
    tsConfig.compilerOptions.types = types.concat(['node']);
    var success = await $f.writeFile(`${typePath}${prop}tsconfig.json`, JSON.stringify(tsConfig, null, '    '));
    if (success) {
        // console.log(GREEN, `${typePath}${prop}tsconfig.json`);
    } else {
        console.error(success);
    }
    // console.log(success ? `${typePath}${prop}tsconfig.json done` : success);
}
async function createMainFiles (refs, file, prop) {
    prop = prop || '';
    prop += '/';
    let mod;
    if (prop[0] == "-") {
        mod = $u.include(`@craydent/craydent${prop}/noConflict`,true);
    } else {
        mod = $u.include(root + '/noConflict',true);
    }
    var constants = [];
	for (var p in mod) {
		if (!mod.hasOwnProperty(p) || p[0] == "_") { continue; }
        if (/^[A-Z_0-9]*$/.test(p) && !(p in {"CLI":1,"JSONPA":1,"JSONSA":1})) {
            if ($a.contains(constants,p)) { continue; }
            var type = $u.getProperty(mod, `${p}.constructor.name`) || 'string';
            if (type == "Array") {
                switch(p) {
                    case "MODULES_LOADED":
                        type += "<string>";
                    break;
                    case "ERROR_TYPES":
                        type += "<Error>";
                    break;
                    case "TEMPLATE_VARS":
                        type += "<TemplateVar>";
                    break;
                    case "HTTP_STATUS_TEMPLATE":
                        type += "<HTTPStatusTemplate>";
                    break;
                }
            }
            constants.push(`${p}: ${type}`);
        }
    }
    var content = $t.fillTemplate(mainTemplate, {refs: refs, global: file == "global", constants});
    var success = await $f.writeFile(`${typePath}${prop}${file.replace('/index','')}/index.d.ts`, content);
    if (success) {
        // console.log(GREEN, `${typePath}${prop}${file}.d.ts`);
    } else {
        console.error(RED, success);
    }
    // console.log(success ? `${typePath}${prop}${file}.d.ts done` : success);
}
function createCommonFile (content, dir, context, prop){
    prop = prop || '';
    prop += '/';

    // content = $s.replace_all(content, 'declare enum', 'enum');
    // content = $s.replace_all(content, 'declare class', 'class');
    // content = $s.replace_all(content, ['declare class', 'declare enum'], ['class', 'enum']);

    var path = `${typePath}${prop}common`;
    var file = context;
    var imports = 'import { ChildProcess } from "child_process";\nimport { Server } from "net";\nimport { IncomingMessage, ServerResponse } from "http";\n\n'
    var full = `import $c = require("../../${file.replace('index','index.d')}");\n${imports}declare module "../../${file}" {\n${content}\n}`;
    if (prop == '/') {
        // file = file.replace(/\.\.\/\.\.\//g,'../');
        // full = full.replace(/\.\.\/\.\.\//g,'../');
    }
    var promises = [];
    promises.push($f.writeFile(`${path}/${dir}/common.d.ts`, full));
    if (dir == "base" || dir == "global") {
        promises.push($f.writeFile(`${path}/common.p.d.ts`, `${imports}declare global {\n${content}\n}`));
    }
    return promises;
}
async function run(context, commonContent) {
    var dir = contexts[context].path;
    var currentDir = contexts[context].dir;
    var commonRef = `${currentDir}/common/${dir}/common.d.ts`;
    var types = [];
    var filecount = 0;
    var promises = createCommonFile(commonContent, dir, context);
    for (let prop in modules) {
        fs.createReadStream(`${templatePath}/tslint.json`).pipe(fs.createWriteStream(`${typePath}-${prop}/tslint.json`));
        fs.createReadStream(`${templatePath}/readme.md`).pipe(fs.createWriteStream(`${typePath}-${prop}/readme.md`));
        //fs.createReadStream(`${templatePath}/craydent-${prop}-tests.ts`).pipe(fs.createWriteStream(`${typePath}-${prop}/craydent-${prop}-tests.ts`));
        promises.push($f.readFile(`${templatePath}/craydent-${prop}-tests.ts`, 'utf8').then((content)=>{
            return $f.writeFile(`${typePath}-${prop}/craydent-${prop}-tests.ts`, $t.fillTemplate(content.replace('@craydent/',''), {prop:`-${prop}`}));
        }));
        filecount += 2;

        promises = promises.concat(createCommonFile(commonContent, dir, context, `-${prop}`));
        var subRefs = [commonRef,`${currentDir}/common/${dir}/${prop}.d.ts`];
        createMainFiles(subRefs, context, `-${prop}`);
        filecount++;

        types.push(`craydent-${prop}`);
        let mod = require(`@craydent/craydent-${prop}/noConflict`);
        let populationCommon = [];
        for (let method in mod) {
            if (method[0] == '_') { continue; }
            var p = renderSubmodule(mod, method, prop, dir, context);
            if (p) {
                promises = promises.concat(p);
                populationCommon.push(method);
            }
        }
        populateCommon(populationCommon, prop, promises, dir);
        promises.push(updateTSConfig(prop));
    }
    let results = await Promise.all(promises);
    console.log(GREEN, `added ${promises.length + filecount} files for ${context}`);
    if ($a.condense(results, true).length > 1) { return; }

    await Promise.all([
        createMainFiles([], context),
        updateTSConfig(null, types)
    ]);


}
async function begin () {
    console.log(GREEN, '>>>>>>>>>>>>>>> GENERATING TYPES <<<<<<<<<<<<<<<');
    var commonContent = await prep();
    await Promise.all([
        run(`${mainPath}/index`, commonContent),
        run("noConflict", commonContent),
        run("global", commonContent)
    ]);
    console.log(GREEN, '>>>>>>>>>>>>>>> TYPES GENERATED <<<<<<<<<<<<<<<');
}
begin();