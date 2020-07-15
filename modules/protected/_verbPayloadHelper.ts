import { VerbOptions } from "../models/VerbOptions";
import { AnyObject } from "../models/Arrays";


export default function _verbPayloadHelper(context: Craydent, variable?: string, options?: VerbOptions): boolean | AnyObject {
    context.raw = context.raw || "";
    if (!variable) { return context.rawData || context.raw; }
    context.rawData = context.rawData || {};
    if (!options) {
        return context.rawData[variable] === undefined ? false : context.rawData[variable];
    }

    if (options == 'i' || (options as any).ignoreCase || options == "ignoreCase") {
        for (let prop in context.rawData) {
            /* istanbul ignore next */
            if (!context.rawData.hasOwnProperty(prop)) { continue; }
            if (prop.toLowerCase() == variable.toLowerCase()) { return context.rawData[prop]; }
        }
        return false;
    }

    return context.rawData[variable] || false;
}