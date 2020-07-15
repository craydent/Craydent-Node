import _typeCheck from '../protected/_typeCheck'
import isNull from './isNull';
import error from './error';

export default function isAsync(obj: any): boolean {
    try {
        if (isNull(obj)) { return false; }
        return obj.prototype.constructor.name == 'async';
    } catch (e) {
        error && error('isAsync', e);
        return null;
    }
}