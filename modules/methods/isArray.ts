import _typeCheck from '../protected/_typeCheck'

export default function isArray(obj: any): boolean {
    return Array.isArray ? Array.isArray(obj) : _typeCheck(obj, Array);
}