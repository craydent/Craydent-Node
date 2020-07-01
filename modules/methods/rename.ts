import error from './error';
import * as fs from 'fs';

export default function rename(oldPath: string, newPath: string): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of rename.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#rename",
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
            fs.rename.apply(this, args);
        } catch (e) {
            error && error('fs.rename', e);
            res(e);
        }
    });
}