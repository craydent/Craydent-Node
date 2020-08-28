import _fsHelper from '../protected/_fsHelper';

export default function rename(oldPath: string, newPath: string): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of rename.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#rename",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['rename', ...arguments as any]);
}