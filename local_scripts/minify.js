#!/usr/bin/env node
const root = require.resolve('../package.json').replace('/package.json', '');
const $c = require(`${root}/compiled/transformedMajor/cli/noConflict`).default;
const condense = require(`${root}/compiled/transformedMinor/craydent.condense`).default;
const fs = require('fs').promises;

async function getJSFilesRecursively(dir) {
    let files = [];
    let folders = await fs.readdir(dir, { withFileTypes: true });
    // var promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        let name = folder.name;
        if (folder.isFile() && /.*\.js$/.test(name)) {
            files.push(`${dir}/${name}`);
        }
        if (folder.isDirectory()) {
            files = files.concat(await getJSFilesRecursively(`${dir}/${name}`));
        }
    }
    return files;
}
(async () => {
    let results = await getJSFilesRecursively(`${root}/compiled`);
    let files = condense(results, true);
    let promises = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        console.log($c.CONSOLE_COLORS.GREEN, `minifying ${file}`);
        promises.push($c.CLI.exec(
            `closure-compiler --js ${file} --js_output_file ${file}.min --compilation_level WHITESPACE_ONLY && mv ${file}.min ${file}; echo 'minified ${file}'`,
            { outputOnly: true, silent: true })
            .then((output) => { console.log($c.CONSOLE_COLORS.GREEN, output.replace(/\n/g, '')); }));
        if (promises.length > 20) {
            await Promise.all(promises);
            promises = [];
        }
    }
    await Promise.all(promises);
})()