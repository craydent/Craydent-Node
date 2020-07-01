/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import * as fs from 'fs';
import startsWithAny from './startsWithAny';

export default function mkdirRecursive(path: string, callback: (err: NodeJS.ErrnoException, path?: string) => void) {
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
        let absolute = false;
        if (startsWithAny(path, '/')) {
            absolute = true;
            path = path.substring(1);
        }
        const _processedPath = arguments[2] || process.cwd();
        let dirparts = path.split("/"),
            dir = dirparts[0],
            dirPath = `${_processedPath}/${dir}`;

        if (!dir && dirparts.length <= 1) { return callback(null, _processedPath.replace(process.cwd(), '')); }

        fs.exists(dirPath, function (exists) {
            if (!exists) {
                fs.mkdir(dirPath, function (err) {
                    if (err) { return callback(err); }
                    //@ts-ignore
                    return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, `${_processedPath}/${dir}`);
                });
            } else {
                //@ts-ignore
                return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join('/'), callback, `${_processedPath}/${dir}`);
            }
        });
    } catch (e) {
        error && error('fs.mkdirRecursive', e);
    }
}