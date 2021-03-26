import error from '../methods/error';
import { FSByteData } from '../models/FSByteData';
import include from '../methods/include';

export default function _fsHelper<TBuffer>(this: any, name: string, ...args: any[]): Promise<NodeJS.ErrnoException | FSByteData<TBuffer | string> | void> {
    const fs = include('fs');
    const self = this;
    return new Promise(function (res) {
        try {
            args.push(function (this: any, err: any, data: any, buffer: any) {
                if (err) {
                    res(err);
                }
                if (buffer) {
                    res({ bytes: data, buffer });
                }
                res(data || null);
            });
            fs[name].apply(self, args);
        } catch (e) /* istanbul ignore next */ {
            error && error(`fs.${name}`, e);
            res(e);
        }
    });
}