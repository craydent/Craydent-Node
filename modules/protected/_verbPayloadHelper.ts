import { VerbOptions } from '../models/VerbOptions';
import { AnyObject } from '../models/Generics';
import merge from '../methods/merge';

export type Verbs = 'get' | 'delete' | 'post' | 'put' | 'payload';
export default function _verbPayloadHelper(context: Craydent): boolean | AnyObject;
export default function _verbPayloadHelper(context: Craydent, variable: string, method: Verbs, options?: VerbOptions): boolean | AnyObject;
export default function _verbPayloadHelper(context: Craydent, variable?: string, method?: Verbs, options?: VerbOptions): boolean | AnyObject {
    let { rawData } = context as any;
    let defaultData: any = { get: null, post: null, delete: null, put: null };
    let data: any = (rawData || defaultData)[method as any] || {};
    let theRawData = rawData || {} as any;
    if (method == 'payload') {
        for (let prop in defaultData) {
            const d = theRawData[prop];
            if (!d) { continue; }
            data = merge(data, d);
        }
    }
    if (!variable) { return data; }
    if (!options) {
        return !data || data[variable] === undefined ? false : data[variable];
    }

    if (options == 'i' || (options as any).ignoreCase || options == "ignoreCase") {
        for (let prop in data) {
            /* istanbul ignore next */
            if (!data.hasOwnProperty(prop)) { continue; }
            if (prop.toLowerCase() == variable.toLowerCase()) { return data[prop]; }
        }
        return false;
    }

    return data[variable] || false;
}