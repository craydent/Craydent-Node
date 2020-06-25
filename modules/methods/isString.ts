import _typeCheck from '../protected/_typeCheck';

export default function isString(obj: any): boolean {
    return _typeCheck(obj, String);
}