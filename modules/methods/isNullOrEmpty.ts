import _typeCheck from '../protected/_typeCheck';
import isNull from './isNull';
import isEmpty from './isEmpty';

export default function isNullOrEmpty(obj: any): boolean {
    return isNull(obj) || isEmpty(obj);
}