import error from './error';
import * as fs from 'fs';

export default function mkdtemp(prefix: string, options?: { encoding?: BufferEncoding; } | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"): Promise<string>;
export default function mkdtemp(prefix: string, options?: "buffer" | { encoding: "buffer"; }): Promise<Buffer>;
export default function mkdtemp(prefix: string, options?: string | { encoding?: string; }): Promise<string | Buffer>;
export default function mkdtemp(prefix: string): Promise<string>;
export default function mkdtemp(prefix, options?): Promise<any> {
    /*|{
        "info": "A promisified version of mkdtemp.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#mkdtemp",
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
            fs.mkdtemp.apply(this, args);
        } catch (e) {
            error && error('fs.mkdtemp', e);
            res(e);
        }
    });
}