import _typeCheck from '../protected/_typeCheck';

export default function isNumber(obj: any): boolean {
    return _typeCheck(obj, Number);
}