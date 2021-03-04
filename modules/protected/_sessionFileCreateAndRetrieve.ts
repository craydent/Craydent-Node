import * as path from 'path';
import error from '../methods/error';
import tryEval from '../methods/tryeval';
import mkdirRecursive from '../methods/mkdirrecursive';
import { AnyObject } from '../models/Generics';
import include from '../methods/include';

export default function _sessionFileCreateAndRetrieve(filepath: string, sync?: boolean, callback?: (data: AnyObject) => void): AnyObject | Promise<AnyObject> {
    const fs = include('fs');
    try {
        const directory = path.dirname(filepath);
        if (sync) {
            try {
                fs.accessSync(filepath);
            } catch (e) {
                try {
                    fs.accessSync(directory);
                } catch (e) {
                    let dirPath = "";
                    // create all missing parent directories sync
                    let dirs = directory.split('/'), i = 0, dir;
                    while (dir = dirs[i++]) {
                        dirPath += `${dir}/`;
                        try { fs.accessSync(dirPath); } catch (e) { fs.mkdirSync(dirPath) }
                    }
                }
                // creates the file
                fs.openSync(filepath, 'w+');
            }
            return tryEval(fs.readFileSync(filepath).toString()) || {};
        }
        return new Promise((res) => {
            callback = callback || res;
            fs.access(filepath, function (err) {
                if (err) {
                    // create all missing parent directories async then create the file
                    return mkdirRecursive(directory, function () { fs.open(filepath, 'w+', function () { callback({}); }); });
                }
                fs.readFile(filepath, function (err, data) { callback(tryEval(data)); });
            });
        });

    } catch (e) /* istanbul ignore next */ {
        error && error('_sessionFileCreateAndRetrieve', e);
    }
}