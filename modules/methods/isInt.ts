import _typeCheck from '../protected/_typeCheck';
import isNull from '../methods/isNull';
import isArray from '../methods/isArray';
import isNumber from '../methods/isNumber';

export default function isInt(obj: any): boolean {
    if (isNull(obj) || isArray(obj)) { return false; }
    return isNumber(obj) && parseInt(obj as any) == obj;
}