

import isObject from '../methods/isobject';
import isArray from '../methods/isarray';
import error from '../methods/error';

export default function _isJSON(obj: any, topLevel = true): boolean {
    try {
        if (!topLevel && obj === null) {
            return true;
        }
        const validTypes = [Array, Boolean, Object, Number, String];
        if (!~validTypes.indexOf(obj.constructor)) {
            return false;
        }
        if (isObject(obj)) {
            const keys = Object.getOwnPropertyNames(obj);
            let i = 0, prop;
            while (prop = keys[i++]) {
                if (!_isJSON(obj[prop], false)) {
                    return false;
                }
            }
        } else if (isArray(obj)) {
            let i = 0, value;
            while (value = obj[i++]) {
                if (!_isJSON(value, false)) {
                    return false;
                }
            }
        } else if (topLevel) {
            return false;
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error('_isJSON', e);
        return null as any;
    }
}