import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export type ReadDirOptions = {
    encoding: BufferEncoding;
    withFileTypes?: false;
} | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex";
export type ReadDirOptionsBuffer = { encoding: "buffer"; withFileTypes?: false; } | "buffer";
export type ReadDirOptionsString = string | { encoding?: string; withFileTypes?: false; }
export type ReadDirOptionsWithFileTypes = { withFileTypes: true; }

export default function readdir(this: any, path: string, options?: ReadDirOptions): Promise<NodeJS.ErrnoException | string[]>;
export default function readdir(this: any, path: string, options?: ReadDirOptionsBuffer): Promise<NodeJS.ErrnoException | Buffer[]>;
export default function readdir(this: any, path: string, options?: ReadDirOptionsString): Promise<NodeJS.ErrnoException | string[] | Buffer[]>;
export default function readdir(this: any, path: string): Promise<string[]>;
export default function readdir(this: any, path: string, options?: ReadDirOptionsWithFileTypes): Promise<NodeJS.ErrnoException | fs.Dirent[]>;
export default function readdir(this: any, path: string, options?: any): Promise<any> {
    /*|{
        "info": "A promisified version of readdir.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#readdir",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['readdir', ...arguments as any]);
}