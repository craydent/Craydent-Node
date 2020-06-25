import _typeCheck from '../protected/_typeCheck'
import isNull from './isNull';

export default function isDomElement(obj: any): boolean {
    if (isNull(obj)) { return false; }
    return (obj.nodeType == 1);
}