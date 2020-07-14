import _typeCheck from '../protected/_typeCheck';
import isNull from './isNull';
import isArray from './isArray';

export default function isInt(obj: any): boolean {

    if (isNull(obj) || isArray(obj)) { return false; }
    return (parseInt(obj) == obj || obj === 0);
}