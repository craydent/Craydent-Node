/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import isString from './isString';
import relativePathFinder from './relativePathFinder';
import startsWithAny from './startsWithAny';
import parallelEach from './parallelEach';
import { AnyObject } from '../models/Arrays';

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
    try {
        let __basepath = arguments[2] || path,
            __objs = arguments[3] || {},
            __fs = arguments[4] || require('fs')
        let delimiter = "/";

        path = relativePathFinder(path);

        options = options || { syncronous: false, recursive: false };

        if (!path.endsWith(delimiter)) {
            path += delimiter;
        }

        if (isString(options) && ~(options as string).indexOf('s') || (options as RequireDirectoryOptions).syncronous) {
            let files = __fs.readdirSync(path);
            for (let i = 0, len = files.length; i < len; i++) {
                let rpath = path + files[i];
                if (__fs.statSync(rpath).isDirectory()) {
                    if (options != "r" && !(options as RequireDirectoryOptions).recursive) {
                        continue;
                    }
                    if (!rpath.endsWith(delimiter)) {
                        rpath += delimiter;
                    }
                    //@ts-ignore
                    requireDirectory(rpath, options, __basepath, __objs, __fs);
                }
                if (!rpath.endsWith('/')) {
                    let filename = rpath.substring(path.lastIndexOf('/') + 1);
                    if (!startsWithAny(filename, ['_', '.'])) {
                        __objs[rpath.replace(__basepath, '')] = require(rpath);
                    }

                }
            }
            return __objs;
        }
        return new Promise(function (res) {
            __fs.readdir(path, function (err, files) {
                if (err) {
                    return res(err);
                }
                let recFunc = function (rpath) {
                    return new Promise(function (res2) {
                        __fs.statSync(rpath, function (err, stat) {
                            if (err) {
                                res2(err);
                            }
                            if (stat.isDirectory()) {
                                if (options != "r" && !(options as RequireDirectoryOptions).recursive) {
                                    return res2();
                                }
                                if (!rpath.endsWith(delimiter)) {
                                    rpath += delimiter;
                                }
                                //@ts-ignore
                                requireDirectory(rpath, options, __basepath, __objs, __fs)
                                    .then(function () {
                                        if (!rpath.endsWith('/')) {
                                            let filename = rpath.substring(path.lastIndexOf('/') + 1);
                                            if (!startsWithAny(filename, ['_', '.'])) {
                                                __objs[rpath.replace(__basepath, '')] = require(rpath);
                                            }

                                        }
                                    });
                            }
                        })
                    });
                };
                let arr = [];
                for (let i = 0, len = files.length; i < len; i++) {
                    arr.push(recFunc(path + files[i]));
                }
                parallelEach(arr).then(function () {
                    res(__objs);
                });
            });
        });
    } catch (e) {
        error && error('fs.requireDirectory', e);
    }
}