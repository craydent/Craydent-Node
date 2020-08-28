import _typeCheck from '../protected/_typeCheck';
import { $c } from '../private/__common';

export default function isError(obj: any): boolean {
    let is = _typeCheck(obj, Error);
    return is || !!~$c.ERROR_TYPES.indexOf(obj)
        || !!~$c.ERROR_TYPES.indexOf(obj.constructor)
        || !!~$c.ERROR_TYPES.indexOf(obj.constructor.name);
}