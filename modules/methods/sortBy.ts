import error from './error';
import isNull from './isNull';
import isArray from './isArray';
import isFunction from './isFunction';
import isNumber from './isNumber';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isString from './isString';

export interface SortOptions {
    ignoreCase?;
    i?;
}
export type SortPrimer<T> = (value: T, property: string) => string;

export default function sortBy<T>(arr: T[], props: string | string[], rev?: boolean, primer?: SortPrimer<T>, lookup?: any, options?: SortOptions): T[] {
    try {
        options = (isString(options) && (options as string) in { "i": 1, "ignoreCase": 1 }) ? { i: 1 } : {};
        options.i = isNull(options.ignoreCase) ? options.i : options.ignoreCase;
        primer = primer || function (x: any, prop: string) { return x; };
        if (isString(props)) { props = (props as string).split(','); }

        let tmpVal;
        let prop_sort = function (a, b, p?) {
            p = p || 0;
            let prop = props[p],
                reverseProp = false;

            if (!prop) { return 0; }
            if (prop[0] == "!") {
                prop = prop.replace('!', '');
                reverseProp = true;
            }
            let aVal = primer.call(a, (lookup && lookup[a][prop]) || a[prop], prop),
                bVal = primer.call(b, (lookup && lookup[b][prop]) || b[prop], prop);

            if (options.i && aVal && bVal) {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            tmpVal = aVal;
            aVal = ((aVal = parseInt(aVal)) && aVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;
            tmpVal = bVal;
            bVal = ((bVal = parseInt(bVal)) && bVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;

            if (aVal == bVal) { return prop_sort(a, b, p + 1); }
            if (isNull(aVal)) { return 1; }
            if (isNull(bVal)) { return -1; }
            if (!reverseProp) {
                if (aVal > bVal) { return 1; }
                return -1;
            }
            if (aVal < bVal) { return 1; }
            return -1;
        };
        arr.sort(prop_sort);
        if (rev) {
            arr.reverse();
        }

        return arr;

    } catch (e) {
        error && error('Array.sortBy', e);
        return arr;
    }
}