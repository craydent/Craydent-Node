/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import foo from '../methods/foo';
import startsWithAny from '../methods/startswithany';
import include from '../methods/include';
import * as mpath from 'path';

export default function mkdirRecursive(path: string, callback: (err: NodeJS.ErrnoException, processedPath?: string) => void = foo): Promise<any> {
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
    const fs = include('fs');
    try {
        let _processedPath = arguments[2] || process.cwd();
        return new Promise((res) => {
            const _cb = (err: any, path?: any) => {
                callback(err, path);
                res(err || path);
            }
            if (path.search(/[a-zA-Z]:\\/) === 0) {
                path = path.replace(_processedPath, '');
            }
            if (startsWithAny(path, mpath.sep)) {
                path = path.substring(1);
            }
            let dirparts = path.split(mpath.sep),
                dir = dirparts[0],
                dirPath = `${_processedPath}${mpath.sep}${dir}`;

            if (!dir && dirparts.length <= 1) {
                _processedPath = _processedPath.replace(process.cwd(), '');
                return _cb(null, _processedPath);
            }

            fs.access(dirPath, function (err: any) {
                if (err) {
                    fs.mkdir(dirPath, function (err: any) {
                        if (err) { return _cb(err); }
                        //@ts-ignore
                        return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join(mpath.sep), _cb, `${_processedPath}${mpath.sep}${dir}`);
                    });
                } else {
                    //@ts-ignore
                    return mkdirRecursive(dirparts.splice(1, dirparts.length - 1).join(mpath.sep), _cb, `${_processedPath}${mpath.sep}${dir}`);
                }
            });
        })
    } catch (e) /* istanbul ignore next */ {
        error && error('fs.mkdirRecursive', e);
        return Promise.resolve();
    }
}