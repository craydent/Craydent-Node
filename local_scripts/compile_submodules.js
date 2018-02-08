#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var root = require.resolve('../package.json').replace('/package.json','');
var cpkg = require(root + '/package.json');
var pkgPrefix = ~cpkg.name.indexOf('@craydent') ? "@craydent/" : "";
var exec = require('child_process').exec;
var publishing = process.argv[2] == "publish";
var version = cpkg.version;
var spaces = 37 - version.length;
var gitUrlTemplate = "git+https://cinada@bitbucket.org/craydent/${submodule}.git";
var homepageUrlTemplate = "https://bitbucket.org/craydent/${submodule}#readme";
var defaultKeywords = [
    "craydent",
    "library",
    "jquery",
    "es6",
    "sugar",
    "utilities"
];
var pre_text = "/*/---------------------------------------------------------/*/\n\
/*/ Craydent LLC node-v" + version;
for (var i = 0; i < spaces; i++) {
    pre_text += " ";
}
pre_text += "/*/\n\
/*/ Copyright 2011 (http://craydent.com/about)              /*/\n\
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/\n\
/*/ (http://craydent.com/license)                           /*/\n\
/*/---------------------------------------------------------/*/\n\
/*/---------------------------------------------------------/*/\n\
module.exports = function (ctx) {\n",
    post_text = "};";

var config = require(root + '/submodules/dependencies');
var details = config.details;
var dependencies = config.primary,
    sub_dependencies = config.secondary,
    fs = require('fs');

// var package = fs.readFileSync(root + '/submodules/package.json', "utf8");
var package = require(root + '/submodules/package.json', "utf8");

var base = root + "/submodules/",
    source_base = base + "_shared/",
    depdir = "dependencies/",
    scripts = root + "/local_scripts/";

// var readmeCommand = [];
for (var folder in dependencies) {
    if (!dependencies.hasOwnProperty(folder)) { continue; }

    var files = fs.readdirSync(base + folder + "/" + depdir);

    for (var i = 0, len = files.length; i < len; i++) {
        try { fs.unlinkSync(base + folder + "/" + depdir + files[i]); } catch (e) { console.log(e); }
    }

    try { fs.unlinkSync(base + folder + "/global.js"); } catch (e) { /*console.log(e);*/ }
    try { fs.unlinkSync(base + folder + "/noConflict.js"); } catch (e) { /*console.log(e);*/ }
    try { fs.unlinkSync(base + folder + "/package.json"); } catch (e) { /*console.log(e);*/ }
    try { fs.unlinkSync(base + folder + "/package-lock.json"); } catch (e) { /*console.log(e);*/ }
    try { !publishing && fs.unlinkSync(base + folder + "/readme.md"); } catch (e) { /*console.log(e);*/ }

    fs.createReadStream(base + 'common.js').pipe(fs.createWriteStream(base + folder + '/' + depdir + 'common.js'));
    fs.createReadStream(base + 'global.js').pipe(fs.createWriteStream(base + folder + '/global.js'));
    fs.createReadStream(base + 'noConflict.js').pipe(fs.createWriteStream(base + folder + '/noConflict.js'));
    var module_dependencies = {};
    if (folder != "typeof") {
        if (process.argv[2] == 'publish') {
            module_dependencies[pkgPrefix + "craydent-typeof"] = "^" + version;
            // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"^" + version + "\" ";
        } else {
            module_dependencies[pkgPrefix + "craydent-typeof"] = "file:../typeof";
            // module_dependencies = " \"" + pkgPrefix + "craydent-typeof\": \"file:../typeof\" ";
        }
    }
    var keywords = "";
    // if (details[folder].keywords.length) {
    //     keywords = JSON.stringify(details[folder].keywords, null, 4).replace('[','').replace(']',',');
    // }

    package.name = pkgPrefix + "craydent-" + folder;
    package.version = version;
    package.description = details[folder].description;
    package.keywords = details[folder].keywords.concat(defaultKeywords,[folder]).sort();
    package.dependencies = module_dependencies;
    package.repository.url = gitUrlTemplate.replace("${submodule}", folder);
    package.homepage = homepageUrlTemplate.replace("${submodule}", folder);


    // writeFile(base + folder + '/package.json',
    //     package.replace(/\$\{submodule\}/g, folder)
    //         .replace(/\$\{version\}/g, version)
    //         .replace(/\$\{dependencies\}/g, module_dependencies)
    //         .replace(/"\$\{keywords\}",/g, keywords)
    //         .replace(/\$\{description\}/g, details[folder].description));
    writeFile(base + folder + '/package.json', JSON.stringify(package, null, 4));

    var already_added = [];
    for (var i = 0, len = dependencies[folder].length; i < len; i++) {
        if (~already_added.indexOf(dependencies[folder][i])) { continue; }
        fs.createReadStream(source_base + dependencies[folder][i] + '.js')
            .pipe(fs.createWriteStream(base + folder + '/' + depdir + dependencies[folder][i] + '.js'));
        already_added.push(dependencies[folder][i]);
        recurse_sub(already_added, folder, dependencies[folder][i]);
    }
    // readmeCommand.push(scripts + '_createReadme.js ' + base + folder + ';');
}
if (!publishing) {
    var cmd = scripts + 'npminstall.sh';

    exec(cmd, function(error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
    });
}

function recurse_sub (already_added, folder, module) {
    if (!sub_dependencies[module]) { return; }

    for (var i = 0, len = sub_dependencies[module].length; i < len; i++) {
        if (~already_added.indexOf(sub_dependencies[module][i])) { continue; }
        fs.createReadStream(source_base + sub_dependencies[module][i] + '.js')
            .pipe(fs.createWriteStream(base + folder + '/' + depdir + sub_dependencies[module][i] + '.js'));
        already_added.push(sub_dependencies[i]);
        recurse_sub(already_added, folder, sub_dependencies[module][i]);
    }
}
function writeFile (path, content) {
    fs.writeFile(path,content, function () { console.log("saved: " + path); });
}