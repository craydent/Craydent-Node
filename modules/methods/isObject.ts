import isNull from './isNull';

export default function isObject(obj: any, check_instance?: boolean): boolean {
    if (isNull(obj)) { return false; }
    return (obj.constructor == Object || (!!check_instance && obj instanceof Object));
}