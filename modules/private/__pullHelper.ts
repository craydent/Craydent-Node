import isArray from '../methods/isArray';
import equals from '../methods/equals';
import removeAt from '../methods/removeAt';

export default function __pullHelper(target: any[], lookup: any[]): void {
    if (!isArray(lookup)) { lookup = [lookup]; }
    for (let i = 0, len = lookup.length; i < len; i++) {
        let value = lookup[i];
        for (let j = 0, jlen = target.length; j < jlen; j++) {
            if (equals(value, target[j])) {
                removeAt(target, j);
                j--, jlen--;
            }
        }

    }
}