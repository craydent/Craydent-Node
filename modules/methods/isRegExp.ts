import _typeCheck from '../protected/_typeCheck';

export default function isRegExp(obj: any): boolean {
    return _typeCheck(obj, RegExp);
}