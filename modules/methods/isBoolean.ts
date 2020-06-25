import _typeCheck from '../protected/_typeCheck'

export default function isBoolean(obj: any): boolean {
    return _typeCheck(obj, Boolean);
}