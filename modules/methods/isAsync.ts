import _typeCheck from '../protected/_typeCheck'

export default function isAsync(obj: any): boolean {
    return _typeCheck(obj, "AsyncFunction", true);
}