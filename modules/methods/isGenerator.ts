import _typeCheck from '../protected/_typeCheck';
import isNull from './isNull';
import isAsync from './isAsync';
import isPromise from './isPromise';

export default function isGenerator(obj: any): boolean {
    // return _typeCheck(obj, "GeneratorFunction", true);
    if (isNull(obj) || isAsync(obj) || isPromise(obj)) { return false; }
    const __generator = 'return __generator(this, function';
    if (~obj.toString().indexOf(__generator)) {
        return true;
    }
    return _typeCheck(obj, "GeneratorFunction", true);
}