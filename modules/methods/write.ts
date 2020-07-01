import error from './error';
import * as fs from 'fs';
import { FSByteData } from '../models/FSByteData';

export default function write<TBuffer extends fs.BinaryData>(fd: number, buffer: TBuffer, offset: number, length: number, position: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, buffer: TBuffer, offset: number, length: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, buffer: TBuffer, offset: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, buffer: TBuffer): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, string: any, position: number, encoding: string): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, string: any, position: number): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write<TBuffer extends fs.BinaryData>(fd: number, string: any): Promise<NodeJS.ErrnoException | FSByteData<string>>;
export default function write(fd, buffer, offset?, length?, position?): Promise<any> {
    /*|{
        "info": "A promisified version of write.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#write",
        "returnType": "(any)"
    }|*/
    let args = [];
    for (let i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    return new Promise(function (res) {
        try {
            args.push(function (err, data, buffer) {
                if (err) {
                    res(err);
                }
                res({ bytes: data, buffer: buffer });

            });
            fs.write.apply(this, args);
        } catch (e) {
            error && error('fs.write', e);
            res(e);
        }
    });
}