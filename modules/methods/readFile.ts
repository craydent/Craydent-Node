import error from './error';
import * as fs from 'fs';

export default function readFile(path: string | number | Buffer | URL, options?: { encoding?: null; flag?: string; }): Promise<NodeJS.ErrnoException | Buffer>;
export default function readFile(path: string | number | Buffer | URL, options?: string | { encoding: string; flag?: string; }): Promise<NodeJS.ErrnoException | string>;
export default function readFile(path: string | number | Buffer | URL, options?: string | { encoding?: string; flag?: string; }): Promise<NodeJS.ErrnoException | string | Buffer>;
export default function readFile(path: string | number | Buffer | URL): Promise<NodeJS.ErrnoException | Buffer>;
export default function readFile(path, options?): Promise<any> {
    /*|{
        "info": "A promisified version of readFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#readFile",
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
            fs.readFile.apply(this, args);
        } catch (e) {
            error && error('fs.readFile', e);
            res(e);
        }
    });
}