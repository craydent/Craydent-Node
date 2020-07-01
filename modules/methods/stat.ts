import error from './error';
import * as fs from 'fs';

export default function stat(path: string): Promise<NodeJS.ErrnoException | fs.Stats> {
    /*|{
        "info": "A promisified version of stat.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#stat",
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
            fs.stat.apply(this, args);
        } catch (e) {
            error && error('fs.stat', e);
            res(e);
        }
    });
}