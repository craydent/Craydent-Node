import _fsHelper from '../protected/_fsHelper';

export default function realpath(this: any, path: string, options: { encoding?: BufferEncoding; } | "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"): Promise<NodeJS.ErrnoException | string>;
export default function realpath(this: any, path: string, options: { encoding: "buffer"; } | "buffer"): Promise<NodeJS.ErrnoException | Buffer>;
export default function realpath(this: any, path: string, options: string | { encoding?: string; }): Promise<NodeJS.ErrnoException | string | Buffer>;
export default function realpath(this: any, path: string): Promise<NodeJS.ErrnoException | string>;
export default function realpath(this: any, path: any, options?: any): Promise<any> {
    /*|{
        "info": "A promisified version of realpath.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#realpath",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['realpath', ...arguments as any]);
}