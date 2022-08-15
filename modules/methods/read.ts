import _fsHelper from '../protected/_fsHelper';
import { FSByteData } from '../models/FSByteData';

export default function read<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, buffer: TBuffer, offset: number, length: number, position: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>> {
    /*|{
        "info": "A promisified version of read.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#read",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['read', ...arguments as any]) as any;
}