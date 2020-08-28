import _fsHelper from '../protected/_fsHelper';

export default function open(path: string, flags: string | number, mode?: string | number): Promise<NodeJS.ErrnoException | number> {
    /*|{
        "info": "A promisified version of open.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#open",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['open', ...arguments as any]);
}