/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import foo from '../methods/foo';
import * as fs from 'fs';
import startsWithAny from '../methods/startsWithAny';

export default function mkdirRecursive(path: string, callback?: (err: NodeJS.ErrnoException, processedPath?: string) => void): Promise<any> {
    /*|{
        "info": "Recursively create folders.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Path to create."},
            {"callback": "(Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors)."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#mkdirRecursive",
        "returnType": "(void)"
    }|*/
    try {
        callback = callback || foo;
        let _processedPath = arguments[2] || process.cwd();
        return new Promise((res) => {
            const _cb = (err, path?) => {
                callback(err, path);
                res(err || path);
            }
            let absolute = false;
            if (startsWithAny(path, '/')) {
                absolute = true;
                path = path.substring(1);
            }
            let dirparts = path.split("/"),
                dir = dirparts[0],
                dirPath = `${_processedPath}/${dir}`;

            if (!dir && dirparts.length <= 1) {
                _processedPath = _processedPath.replace(process.cwd(), '');
                return _cb(null, _processedPath);
            }

            fs.exists(dirPath, function (exists) {
                if (!exists) {
                    fs.mkdir(dirPath, function (err) {
                        if (err) { return _cb(err); }
                        //@ts-ignore
                        return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), _cb, `${_processedPath}/${dir}`);
                    });
                } else {
                    //@ts-ignore
                    return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), _cb, `${_processedPath}/${dir}`);
                }
            });
        })
    } catch (e) /* istanbul ignore next */ {
        error && error('fs.mkdirRecursive', e);
    }
}