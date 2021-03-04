import { Documents } from '../models/Arrays';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import error from '../methods/error';
import { __parseCond } from '../private/__whereParsers';
import parseRaw from '../methods/parseraw';

export default function _redact<T>(docs: Documents<T>, expr: any): Documents<T> {
    try {
        docs = isArray(docs) ? docs : [docs as any];
        let result = [], i = 0, doc;
        while (doc = docs[i++]) {
            let action = __parseCond(doc, expr);
            /* istanbul ignore else */
            if (action == "$$KEEP") {
                result.push(doc);
            } else if (action == "$$DESCEND") { // return all fields at current document without embedded documents
                result.push(doc);
                for (let prop in doc) {
                    if (!doc.hasOwnProperty(prop) || isArray(doc[prop]) && !isObject(doc[prop][0]) || !isArray(doc[prop]) && !isObject(doc[prop])) {
                        continue;
                    }
                    doc[prop] = _redact(doc[prop], expr);
                    if (doc[prop] === undefined) {
                        delete doc[prop];
                    }
                }
            } else if (action == "$$PRUNE") {

            } else {
                throw `exception: $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned ${parseRaw(action)}`;
            }
        }
        return result.length ? result : undefined;
    } catch (e) /* istanbul ignore next */ {
        error && error('aggregate._redact', e);
        return null;
    }
}