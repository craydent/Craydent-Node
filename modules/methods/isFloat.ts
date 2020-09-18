import _typeCheck from '../protected/_typeCheck'
import isNull from '../methods/isNull';
import isNumber from '../methods/isNumber';
import isArray from '../methods/isArray';

export default function isFloat(obj: any): boolean {
    if (isNull(obj) || isArray(obj)) { return false; }
    return (isNumber(obj) && parseFloat(obj) == obj);
}