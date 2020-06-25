import _typeCheck from '../protected/_typeCheck';

export default function isGeolocation(obj: any): boolean {
    return _typeCheck(obj, "Geolocation", true);
}