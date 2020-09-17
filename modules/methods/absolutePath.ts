/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import condense from '../methods/condense';
import * as pathModule from 'path';

export default function absolutePath(path: string, depth?: number): string {
    let callingPath = "",
        delimiter = pathModule.sep;
    depth = depth || 0;

    // first clause is for linux based files systems, second clause is for windows based file system
    if (!(path.startsWith('/') || /^[a-zA-Z]:\/|^\/\/.*/.test(path))) {
        let stack = new Error().stack.split('\n');
        /* istanbul ignore if */
        if (~stack[1].indexOf('(eval at absolutePath')) {
            stack = stack.splice(1, 1);
        }
        callingPath = stack[2 + depth].replace(/.*?\((.*)\).*/, '$1');
        /* istanbul ignore next */
        // if (~callingPath.indexOf('\\')) {
        //     callingPath = callingPath.replace(/\\/g, '/');
        // }
        path = callingPath.substring(0, callingPath.lastIndexOf(delimiter) + 1) + path;
    }
    return path;
}