import _typeCheck from '../protected/_typeCheck'
import isNull from './isNull';
import isNumber from './isNumber';
import isArray from './isArray';

export default function isFloat(obj: any): boolean {
    if (isNull(obj) || isArray(obj)) { return false; }
    return (isNumber(obj) && parseFloat(obj) == obj);
}