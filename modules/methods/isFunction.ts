import _typeCheck from '../protected/_typeCheck';
import isAsync from '../methods/isAsync';
import isGenerator from '../methods/isGenerator';

export default function isFunction(obj: any): boolean {
    return _typeCheck(obj, Function) && !isAsync(obj) && !isGenerator(obj);
}