import _typeCheck from '../protected/_typeCheck'

export default function isDate(obj: any): boolean {
    return _typeCheck(obj, Date);
}