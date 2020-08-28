import error from '../methods/error';
import * as fs from 'fs';
import { FSByteData } from '../models/FSByteData';

export default function _fsHelper<TBuffer>(name: string, ...args): Promise<NodeJS.ErrnoException | FSByteData<TBuffer | string> | void> {
    return new Promise(function (res) {
        try {
            args.push(function (err, data, buffer) {
                if (err) {
                    res(err);
                }
                if (buffer) {
                    res({ bytes: data, buffer });
                }
                res(data || null);
            });
            fs[name].apply(this, args);
        } catch (e) /* istanbul ignore next */ {
            error && error(`fs.${name}`, e);
            res(e);
        }
    });
}