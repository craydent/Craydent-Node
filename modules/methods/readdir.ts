import error from './error';
import * as fs from 'fs';

export type ReadDirOptions = {
    encoding: BufferEncoding;
    withFileTypes?: false;
} | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex";
export type ReadDirOptionsBuffer = { encoding: "buffer"; withFileTypes?: false; } | "buffer";
export type ReadDirOptionsString = string | { encoding?: string; withFileTypes?: false; }
export type ReadDirOptionsWithFileTypes = { withFileTypes: true; }

export default function readdir(path: string, options?: ReadDirOptions): Promise<NodeJS.ErrnoException | string[]>;
export default function readdir(path: string, options?: ReadDirOptionsBuffer): Promise<NodeJS.ErrnoException | Buffer[]>;
export default function readdir(path: string, options?: ReadDirOptionsString): Promise<NodeJS.ErrnoException | string[] | Buffer[]>;
export default function readdir(path: string): Promise<string[]>;
export default function readdir(path: string, options?: ReadDirOptionsWithFileTypes): Promise<NodeJS.ErrnoException | fs.Dirent[]>;
export default function readdir(path, options?): Promise<any> {
    /*|{
        "info": "A promisified version of readdir.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#readdir",
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
            fs.readdir.apply(this, args);
        } catch (e) {
            error && error('fs.readdir', e);
            res(e);
        }
    });
}