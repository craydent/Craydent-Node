import _typeCheck from '../protected/_typeCheck';
import isAsync from '../methods/isAsync';

export default function isFunction(obj: any): boolean {
    return _typeCheck(obj, Function) && !isAsync(obj);
}