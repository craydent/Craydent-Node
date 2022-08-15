import _fsHelper from '../protected/_fsHelper';
import { FSByteData } from '../models/FSByteData';

export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, buffer: TBuffer, offset: number, length: number, position: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, buffer: TBuffer, offset: number, length: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, buffer: TBuffer, offset: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, buffer: TBuffer): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, string: any, position: number, encoding: string): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, string: any, position: number): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write<TBuffer extends NodeJS.ArrayBufferView>(this: any, fd: number, string: any): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write(this: any, fd: any, buffer: any, offset?: any, length?: any, position?: any): Promise<any> {
    /*|{
        "info": "A promisified version of write.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#write",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['write', ...arguments as any]);
}