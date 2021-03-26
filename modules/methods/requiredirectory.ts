/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import include from '../methods/include';
import isString from '../methods/isstring';
import absolutePath from '../methods/absolutepath';
import startsWithAny from '../methods/startswithany';
import endItWith from '../methods/enditwith';
import parallelEach from '../methods/paralleleach';
import { AnyObject } from '../models/Generics';

export interface RequireDirectoryOptions {
    syncronous?: boolean;
    recursive?: boolean;
}

export default function requireDirectory(path: string, options?: 'r' | 's' | 'rs' | 'sr' | RequireDirectoryOptions): Promise<AnyObject> {
    /*|{
        "info": "Recursively require the entire directory and returns an object containing the required modules.",
        "category": "Utility",
        "parameters":[
            {"path": "(String) Path to directory."},
            {"options?": "(Char) 'r' Flag to use to indicate recursively require, (Char) 's' Flag to indicate use syncronous instead of Promise Pattern"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#requireDirectory",
        "returnType": "(Promise<any>|any)"
    }|*/
    const fs = include('fs');
    try {
        let __basepath = arguments[2] || '',
            __objs = arguments[3] || {},
            __fs = arguments[4] || fs;
        options = options || { syncronous: false, recursive: false };
        let delimiter = "/";

        path = endItWith((absolutePath as any)(path, 1), delimiter);
        __basepath = endItWith(__basepath, delimiter);

        let isSync = (options as RequireDirectoryOptions).syncronous;
        let isRecur = (options as RequireDirectoryOptions).recursive;
        if (isString(options)) {
            isSync = !!~(options as string).indexOf('s');
            isRecur = !!~(options as string).indexOf('r');
        }

        if (isSync) {
            let files = __fs.readdirSync(path);
            for (let i = 0, len = files.length; i < len; i++) {
                let name = files[i];
                let rpath = path + name;
                if (__fs.statSync(rpath).isDirectory()) {
                    if (!isRecur) { continue; }
                    rpath = endItWith(rpath, delimiter);
                    //@ts-ignore
                    requireDirectory(rpath, options, __basepath + name, __objs, __fs);
                }
                if (validModule(rpath, name)) {
                    __objs[rpath.replace(path, __basepath)] = include(rpath);
                }
            }
            return __objs;
        }
        return new Promise(function (res) {
            __fs.readdir(path, function (err: any, files: any) {
                /* istanbul ignore if */
                if (err) { return res(err); }
                let recFunc = function (rpath: any, name: any) {
                    return new Promise(function (res2) {
                        __fs.stat(rpath, function (err: any, stat: any) {
                            /* istanbul ignore if */
                            if (err) { res2(err); }
                            if (stat.isDirectory()) {
                                if (!isRecur) { return res2(undefined); }
                                rpath = endItWith(rpath, delimiter);
                                //@ts-ignore
                                requireDirectory(rpath, options, __basepath + name, __objs, __fs)
                                    .then(function () { res2(undefined); });
                            } else {
                                if (validModule(rpath, name)) {
                                    __objs[rpath.replace(path, __basepath)] = include(rpath);
                                }
                                res2(undefined);
                            }
                        })
                    });
                };
                var arr = [];
                for (let i = 0, len = files.length; i < len; i++) {
                    arr.push(recFunc(path + files[i], files[i]));
                }
                parallelEach(arr).then(function () { res(__objs); });
            });
        });
    } catch (e) /* istanbul ignore next */ {
        error && error('fs.requireDirectory', e);
        return Promise.resolve(undefined as any);
    }
}

function validModule(rpath: string, filename: string): boolean {
    if (!rpath.endsWith('/')) {
        if (!startsWithAny(filename, ['_', '.'])) {
            return true;
        }
    }
    return false;
}