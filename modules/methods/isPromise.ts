import _typeCheck from '../protected/_typeCheck';

export default function isPromise(obj: any): boolean {
    return _typeCheck(obj, "Promise", true);
}