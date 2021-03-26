#!/usr/bin/env node

const CONSOLE_COLORS = {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
async function start(prefix) {
    console.log(CONSOLE_COLORS.GREEN, 'removing extra ts files');
    var root = require.resolve('../package.json').replace('/package.json', '');
    var files = (await _cli_exec(`find ${root}/compiled -name '*.ts'`, { silent: true, outputOnly: true })).split('\n').filter((file) => file.slice(-5) != '.d.ts');
    await _cli_exec(`rm ${files.join(' ')}`);
    console.log(CONSOLE_COLORS.GREEN, 'finished removing extra ts files')

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