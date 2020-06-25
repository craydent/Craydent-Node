import _typeCheck from '../protected/_typeCheck';

export default function isFunction(obj: any): boolean {
    return _typeCheck(obj, Function);
}