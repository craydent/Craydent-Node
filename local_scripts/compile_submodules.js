#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vX.X.X                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

// YES! this is super spagetti code

var root = require.resolve('../package.json').replace('/package.json','');
var cpkg = require(root + '/package.json');
var pkgPrefix = ~cpkg.name.indexOf('@craydent') ? "@craydent/" : "";
var $fs = require(cpkg.name + '-fs');
var exec = require('child_process').exec;
var publishing = process.argv[2] == "publish";
var staging = process.argv[2] == "stage";
var version = cpkg.version;
var spaces = 37 - version.length;
var gitUrlTemplate = "git+https://github.com/craydent/Node-Library.git";
var homepageUrlTemplate = "https://bitbucket.org/craydent/node-library/src//submodules/${submodule}/";
var defaultKeywords = [
    "craydent",
    "library",
    "jquery",
    "es6",
    "sugar",
    "utilities"
];
var pre_text = "/*/---------------------------------------------------------/*/\n";
var versionLine = `/*/ Craydent LLC node-v${version}`;
var versionLineRegExp = /\/\*\/ Craydent LLC node-v.*/;
for (var i = 0; i < spaces; i++) {
    versionLine += " ";
}
versionLine += "/*/";
pre_text += `${versionLine}
/*/ Copyright 2011 (http://craydent.com/about)              /*/\n\
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/\n\
/*/ (http://craydent.com/license)                           /*/\n\
/*/---------------------------------------------------------/*/\n\
/*/---------------------------------------------------------/*/\n\
module.exports = function (ctx) {\n`,
    post_text = "};";

var RED = '\x1b[31m%s\x1b[0m';
var GREEN = '\x1b[32m%s\x1b[0m';
var YELLOW = '\x1b[33m%s\x1b[0m';
var config = require(`${root}/submodules/dependencies`);
var details = config.details;
var dependencies = config.primary,
    sub_dependencies = config.secondary,
    scripts = `${root}/local_scripts/`;

var package = require(`${root}/submodules/package.json`, "utf8");

var base = `${root}/submodules/`,
    source_base = `${base}_shared/`,
    depdir = "dependencies/";

async function start() {
    console.log(GREEN, '>>>>>>>>>>>>>>> BUILDING MODULES <<<<<<<<<<<<<<<');
    !staging && await $fs.unlink(`${root}/package-lock.json`);
    let asyncModules = []
    for (let folder in dependencies) {
        asyncModules.push(compileSubmodule(folder));
        // if (!dependencies.hasOwnProperty(folder)) { continue; }
        // folders.push(folder);

        // var files = await $fs.readdir(base + folder + "/" + depdir);
        // var asyncTasks = [];
        // for (var i = 0, len = files.length; i < len; i++) {
        //     asyncTasks.push($fs.unlink(base + folder + "/" + depdir + files[i]));
        // }

        // asyncTasks.push($fs.unlink(base + folder + "/base.js"));
        // asyncTasks.push($fs.unlink(base + folder + "/global.js"));
        // asyncTasks.push($fs.unlink(base + folder + "/noConflict.js"));
        // asyncTasks.push($fs.unlink(base + folder + "/package.json"));
        // !staging && asyncTasks.push($fs.unlink(base + folder + "/package-lock.json"));
        // !publishing && asyncTasks.push($fs.unlink(base + folder + "/readme.md"));

        // await Promise.all(asyncTasks);
        // var asyncRW = [];
        // asyncRW.push($fs.readFile(base + folder + '/index.js', 'utf8').then((raw)=>{
        //     let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //     $fs.writeFile(base + folder + '/base.js', content);
        //     $fs.writeFile(base + folder + '/index.js', content);
        // }));
        // asyncRW.push($fs.readFile(base + 'common.js', 'utf8').then((raw)=>{
        //     let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //     $fs.writeFile(base + folder + '/' + depdir + 'common.js', content);
        // }));
        // asyncRW.push($fs.readFile(base + 'global.js', 'utf8').then((raw)=>{
        //     let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //     $fs.writeFile(base + folder + '/global.js', content);
        // }));
        // asyncRW.push($fs.readFile(base + 'noConflict.js', 'utf8').then((raw)=>{
        //     let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //     $fs.writeFile(base + folder + '/noConflict.js', content);
        // }));

        // // dependent files
        // let depfiles = [
        //     'addObjectPrototype.js',
        //     'condense.js',
        //     'convert_regex_safe.js',
        //     'cout.js',
        //     'defineFunction.js',
        //     'error.js',
        //     'general_trim.js',
        //     'getFuncArgs.js',
        //     'isNull.js',
        //     'strip.js'
        // ];
        // for (let i = 0, len = depfiles.length; i < len; i++) {
        //     let depfile = depfiles[i];
        //     asyncRW.push($fs.readFile(base + depfile, 'utf8').then((raw)=>{
        //         let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //         $fs.writeFile(base + folder + '/' + depdir + depfile, content);
        //     }));
        // }

        // var module_dependencies = {};
        // if (folder != "typeof") {
        //     if (process.argv[2] == 'publish') {
        //         module_dependencies[pkgPrefix + "craydent-typeof"] = "^" + version;
        //         // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"^" + version + "\" ";
        //     } else {
        //         module_dependencies[pkgPrefix + "craydent-typeof"] = "file:../typeof";
        //         // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"file:../typeof\" ";
        //     }
        // }

        // package.name = pkgPrefix + "craydent-" + folder;
        // package.version = version;
        // package.description = details[folder].description;
        // package.keywords = details[folder].keywords.concat(defaultKeywords,[folder]).sort();
        // package.dependencies = module_dependencies;
        // package.repository.url = gitUrlTemplate.replace("${submodule}", folder);
        // package.homepage = homepageUrlTemplate.replace("${submodule}", folder);

        // await $fs.writeFile(base + folder + '/package.json', JSON.stringify(package, null, 4)).then(()=>{
        //     console.log("saved: " + base.replace(root,'') + folder + '/package.json')
        // });

        // let already_added = [];

        // for (let i = 0, len = dependencies[folder].length; i < len; i++) {
        //     if (~already_added.indexOf(dependencies[folder][i])) { continue; }
        //     asyncRW.push($fs.readFile(source_base + dependencies[folder][i] + '.js', 'utf8').then((raw)=>{
        //         let content = raw.replace(/\/\*\/ Craydent LLC node-v.*/,`/*/ Craydent LLC node-v${cpkg.version}                                /*/`);
        //         $fs.writeFile(base + folder + '/' + depdir + dependencies[folder][i] + '.js', content);
        //     }));
        //     already_added.push(dependencies[folder][i]);
        //     asyncRW = asyncRW.concat(recurse_sub(already_added, folder, dependencies[folder][i]));
        // }
        // await Promise.all(asyncRW);
        // asyncNPM.push(npminstall(folder));
    }
    await Promise.all(asyncModules);
    console.log(GREEN, '>>>>>>>>>>>>>>> BUILD COMPLETE <<<<<<<<<<<<<<<');
}
async function compileSubmodule (folder) {
    var path = base + folder;
    var files = await $fs.readdir(`${path}/${depdir}`);
    var asyncTasks = [];
    for (let i = 0, len = files.length; i < len; i++) {
        asyncTasks.push($fs.unlink(`${path}/${depdir}${files[i]}`));
    }

    asyncTasks.push($fs.unlink(`${path}/base.js`));
    asyncTasks.push($fs.unlink(`${path}/global.js`));
    asyncTasks.push($fs.unlink(`${path}/noConflict.js`));
    asyncTasks.push($fs.unlink(`${path}/package.json`));
    !staging && asyncTasks.push($fs.unlink(`${path}/package-lock.json`));
    !publishing && asyncTasks.push($fs.unlink(`${path}/readme.md`));

    await Promise.all(asyncTasks);
    var asyncRW = [];
    asyncRW.push($fs.readFile(`${path}/index.js`, 'utf8').then((raw)=>{
        let content = raw.replace(versionLineRegExp, versionLine);
        return Promise.all([
            $fs.writeFile(`${path}/base.js`, content),
            $fs.writeFile(`${path}/index.js`, content)
        ]);
    }));
    asyncRW.push($fs.readFile(`${base}common.js`, 'utf8').then((raw)=>{
        let content = raw.replace(versionLineRegExp, versionLine);
        return $fs.writeFile(`${path}/${depdir}common.js`, content);
    }));
    asyncRW.push($fs.readFile(`${base}global.js`, 'utf8').then((raw)=>{
        let content = raw.replace(versionLineRegExp, versionLine);
        return $fs.writeFile(`${path}/global.js`, content);
    }));
    asyncRW.push($fs.readFile(`${base}noConflict.js`, 'utf8').then((raw)=>{
        let content = raw.replace(versionLineRegExp, versionLine);
        return $fs.writeFile(`${path}/noConflict.js`, content);
    }));

    // dependent files
    let depfiles = [
        'addObjectPrototype.js',
        'condense.js',
        'convert_regex_safe.js',
        'cout.js',
        'defineFunction.js',
        'error.js',
        'general_trim.js',
        'getFuncArgs.js',
        'isNull.js',
        'strip.js'
    ];
    for (let i = 0, len = depfiles.length; i < len; i++) {
        let depfile = depfiles[i];
        asyncRW.push($fs.readFile(base + depfile, 'utf8').then((raw)=>{
            let content = raw.replace(versionLineRegExp, versionLine);
            return $fs.writeFile(`${path}/${depdir}${depfile}`, content);
        }));
    }

    var module_dependencies = {};
    if (folder != "typeof") {
        if (process.argv[2] == 'publish') {
            module_dependencies[`${pkgPrefix}craydent-typeof`] = `^${version}`;
            // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"^" + version + "\" ";
        } else {
            module_dependencies[`${pkgPrefix}craydent-typeof`] = "file:../typeof";
            // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"file:../typeof\" ";
        }
    }

    package.name =  `${pkgPrefix}craydent-${folder}`;
    package.version = version;
    package.description = details[folder].description;
    package.keywords = details[folder].keywords.concat(defaultKeywords,[folder]).sort();
    package.dependencies = module_dependencies;
    package.repository.url = gitUrlTemplate.replace("${submodule}", folder);
    package.homepage = homepageUrlTemplate.replace("${submodule}", folder);

    await $fs.writeFile(`${path}/package.json`, JSON.stringify(package, null, 4)).then(()=>{
        console.log(GREEN, `saved: ${base.replace(root,'')}${folder}/package.json`)
    });

    let already_added = [];

    for (let i = 0, len = dependencies[folder].length; i < len; i++) {
        if (~already_added.indexOf(dependencies[folder][i])) { continue; }
        asyncRW.push($fs.readFile(`${source_base}${dependencies[folder][i]}.js`, 'utf8').then((raw)=>{
            let content = raw.replace(versionLineRegExp, versionLine);
            return $fs.writeFile(`${path}/${depdir}${dependencies[folder][i]}.js`, content);
        }));
        already_added.push(dependencies[folder][i]);
        asyncRW = asyncRW.concat(recurse_sub(already_added, folder, dependencies[folder][i]));
    }
    await Promise.all(asyncRW);
    await npminstall(folder);
}
function npminstall (folder) {
    if (!publishing && !staging) {
        console.log(GREEN, 'starting npm install for ' + folder);
        var cmd = scripts + 'npminstall.sh ' + folder;

        return new Promise((res)=>{
            exec(cmd, function(error, stdout, stderr) {
                error && console.log(RED, error);
                console.log(GREEN, stdout);
                stderr && console.log(RED,
                    stderr.replace(/npm WARN deprecated minimatch@.*?: Please update to minimatch 3\.0\.2 or higher to avoid a RegExp DoS issue\n/g, '')
                    .replace(/npm notice created a lockfile as package-lock.json. You should commit this file.\n/g,''));
                res();
            })
        });
    }
}

function recurse_sub (already_added, folder, module) {
    if (!sub_dependencies[module]) { return []; }
    let subs = [];

    for (let i = 0, len = sub_dependencies[module].length; i < len; i++) {
        if (~already_added.indexOf(sub_dependencies[module][i])) { continue; }
        subs.push($fs.readFile(source_base + sub_dependencies[module][i] + '.js', 'utf8').then((raw)=>{
            let content = raw.replace(versionLineRegExp, versionLine);
            $fs.writeFile(base + folder + '/' + depdir + sub_dependencies[module][i] + '.js', content);
        }));
        already_added.push(sub_dependencies[i]);
        subs = subs.concat(recurse_sub(already_added, folder, sub_dependencies[module][i]));
    }
    return subs;
}

start();