import error from './error';
import * as fs from 'fs';

export default function realpath(path: string, options: { encoding?: BufferEncoding; } | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"): Promise<NodeJS.ErrnoException | string>;
export default function realpath(path: string, options: { encoding: "buffer"; } | "buffer"): Promise<NodeJS.ErrnoException | Buffer>;
export default function realpath(path: string, options: string | { encoding?: string; }): Promise<NodeJS.ErrnoException | string | Buffer>;
export default function realpath(path: string): Promise<NodeJS.ErrnoException | string>;
export default function realpath(path, options?): Promise<any> {
    /*|{
        "info": "A promisified version of realpath.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#realpath",
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
            fs.realpath.apply(this, args);
        } catch (e) {
            error && error('fs.realpath', e);
            res(e);
        }
    });
}