import error from './error';
import * as fs from 'fs';

export default function open(path: string, flags: string | number, mode?: string | number): Promise<NodeJS.ErrnoException | number> {
    /*|{
        "info": "A promisified version of open.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#open",
        "returnType": "(any)"
    }|*/
    let args = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    return new Promise(function (res) {
        try {
            args.push(function (err, data) {
                if (err) {
                    res(err);
                }
                res(data);
            });
            fs.open.apply(this, args);
        } catch (e) {
            error && error('fs.open', e);
            res(e);
        }
    });
}