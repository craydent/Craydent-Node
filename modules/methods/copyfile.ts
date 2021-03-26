import _fsHelper from '../protected/_fsHelper';

export default function copyFile(this: any, src: string | Buffer | URL, destination: string | Buffer | URL, mode?: number): Promise<NodeJS.ErrnoException | void>;
export default function copyFile(this: any, src: any, data: any, options?: any): Promise<any> {
    /*|{
        "info": "A promisified version of copyFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#copyFile",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['copyFile', ...arguments as any]);
}