import * as fs from 'fs';
import error from '../methods/error';
import tryEval from '../methods/tryEval';
import mkdirRecursive from '../methods/mkdirRecursive';
import { AnyObject } from '../models/Arrays';

export default function _sessionFileCreateAndRetrieve(directory: string, path: string, sync?: boolean, callback?: (data: AnyObject) => void) {
    try {
        if (sync) {
            if (!fs.existsSync(path)) {
                if (!fs.existsSync(directory)) {
                    let dirPath = "";
                    // create all missing parent directories sync
                    let dirs = directory.split('/'), i = 0, dir;
                    while (dir = dirs[i++]) {
                        dirPath += `${dir}/`;
                        if (!fs.existsSync(dirPath)) {
                            fs.mkdirSync(dirPath);
                        }
                    }
                }
                // creates the file
                fs.openSync(path, 'w+');
            }
            return tryEval(fs.readFileSync(path).toString()) || {};
        }
        fs.exists(path, function (exists) {
            if (!exists) {
                // create all missing parent directories async then create the file
                return mkdirRecursive(directory, function () { fs.open(path, 'w+', function () { callback({}); }); });
            }
            fs.readFile(path, function (err, data) { callback(tryEval(data)); });
        });

    } catch (e) {
        error && error('_sessionFileCreateAndRetrieve', e);
    }
}