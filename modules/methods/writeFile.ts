import error from './error';
import * as fs from 'fs';

export default function writeFile(path: string | number | Buffer | URL, data: any, options: fs.WriteFileOptions): Promise<NodeJS.ErrnoException | void>;
export default function writeFile(path: string | number | Buffer | URL, data: any): Promise<NodeJS.ErrnoException | void>;
export default function writeFile(path, data, options?): Promise<any> {
    /*|{
        "info": "A promisified version of writeFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#writeFile",
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
            fs.writeFile.apply(this, args);
        } catch (e) {
            error && error('fs.writeFile', e);
            res(e);
        }
    });
}