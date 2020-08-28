import isObject from '../methods/isObject';

export default function itemCount(obj: any): number {
    if (isObject(obj)) {
        let count = 0;
        for (let prop in obj) {
            /* istanbul ignore else */
            if (obj.hasOwnProperty(prop)) { count++; }
        }
        return count;
    }
    return null;
}