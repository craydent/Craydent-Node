import _typeCheck from '../protected/_typeCheck'
import isNull from './isNull';
import isNumber from './isNumber';

export default function isFloat(obj: any): boolean {
    if (isNull(obj)) { return false; }
    return (isNumber(obj) && (parseFloat(obj) == obj || parseFloat(obj) === 0));
}