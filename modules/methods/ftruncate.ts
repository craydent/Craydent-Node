import error from './error';
import * as fs from 'fs';

export default function ftruncate(fd: number, len?: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of ftruncate.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#ftruncate",
        "returnType": "(any)"
    }|*/
    let args = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    return new Promise(function (res) {
        try {
            args.push(function (err) {
                if (err) {
                    res(err);
                }
                res(null);
            });
            fs.ftruncate.apply(this, args);
        } catch (e) {
            error && error('fs.ftruncate', e);
            res(e);
        }
    });
}