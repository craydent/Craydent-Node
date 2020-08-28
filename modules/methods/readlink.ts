import _fsHelper from '../protected/_fsHelper';

export default function readlink(path: string, options: { encoding?: BufferEncoding; } | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"): Promise<NodeJS.ErrnoException | string>;
export default function readlink(path: string, options: { encoding: "buffer"; } | "buffer"): Promise<NodeJS.ErrnoException | Buffer>;
export default function readlink(path: string, options: string | { encoding?: string; }): Promise<NodeJS.ErrnoException | string | Buffer>;
export default function readlink(path: string): Promise<NodeJS.ErrnoException | string>;
export default function readlink(path, options?): Promise<any> {
    /*|{
        "info": "A promisified version of readlink.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#readlink",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['readlink', ...arguments as any]);
}