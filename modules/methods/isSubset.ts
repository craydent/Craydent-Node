import error from './error';
import _contains from './contains';
import isArray from './isArray';
import isObject from './isObject';
const _isArray = isArray,
    _isObject = isObject;

export default function isSubset<T, R>(arr: T[], compare: R[], sharesAny?: boolean): boolean;
export default function isSubset<T, R>(obj: T, compare: R, sharesAny?: boolean): boolean;
export default function isSubset(obj, compare, sharesAny?): boolean {
    try {
        let isArray = _isArray(obj) && _isArray(compare);
        if ((_isObject(obj) && _isObject(compare)) || isArray) {

            for (let prop in obj) {
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!isArray && !compare.hasOwnProperty(prop) || isArray && !_contains(compare, obj[prop])) { return false; }
                if (sharesAny) { return true; }
            }

            return true;
        }
        return !!~obj.toString().indexOf(compare.toString()) && obj.constructor == compare.constructor;

    } catch (e) {
        error && error('Object.isSubset', e);
        return null;
    }
}