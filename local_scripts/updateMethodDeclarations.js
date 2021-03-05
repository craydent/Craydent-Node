#!/usr/bin/env node
const fs = require('fs').promises;
const CONSOLE_COLORS = {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
async function start() {
    console.log(CONSOLE_COLORS.GREEN, 'updating global references in methods');
    var root = require.resolve('../package.json').replace('/package.json', '');
    var output = await _cli_exec(`grep -rw '${root}/compiled/methods' -e '/// <reference path'`, { outputOnly: true, silent: true });
    var promises = [];
    var paths = [];
    output.split('\n').forEach(out => {
        var path = out.replace(/(.*?):\/\/\/.*$/, '$1');
        if (!path) {
            return;
        }
        paths.push(path);
        promises.push(fs.readFile(path, 'utf-8'));
        return path;
    });
    var files = await Promise.all(promises);
    promises = [];
    files.forEach((file, i) => {
        console.log(CONSOLE_COLORS.GREEN, `updating ${paths[i]}`);
        var content = file.replace('../../modules/', '../');
        promises.push(fs.writeFile(paths[i], content));
    });
    await Promise.all(promises);
    console.log(CONSOLE_COLORS.GREEN, 'finished updating globals')

}

function _cli_exec(command, options, callback) {
    let child = require('child_process');

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
start();


//grep -rnw '/path/to/somewhere/' -e 'pattern'