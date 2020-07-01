import { VerbOptions } from "../models/VerbOptions";


export default function _verbPayloadHelper(context: Craydent | Window, variable?: string, options?: VerbOptions) {
    context.raw = context.raw || "";
    if (!variable) { return context.rawData || context.raw; }
    context.rawData = context.rawData || {};
    if (!options) {
        return context.rawData[variable] === undefined ? false : context.rawData[variable];
    }

    if (options == 'i' || (options as any).ignoreCase || options == "ignoreCase") {
        for (let prop in context.rawData) {
            if (!context.rawData.hasOwnProperty(prop)) { continue; }
            if (prop.toLowerCase() == variable.toLowerCase()) { return context.rawData[prop]; }
        }
        return false;
    }

    return context.raw[variable] || false;
}