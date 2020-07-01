import error from './error';
import * as fs from 'fs';
import { FSByteData } from '../models/FSByteData';

export default function read<TBuffer extends fs.BinaryData>(fd: number, buffer: TBuffer, offset: number, length: number, position: number): Promise<NodeJS.ErrnoException | FSByteData<TBuffer>> {
    /*|{
        "info": "A promisified version of read.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#read",
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
            fs.read.apply(this, args);
        } catch (e) {
            error && error('fs.read', e);
            res(e);
        }
    });
}