import error from '../methods/error';
import isNull from '../methods/isnull';
import isString from '../methods/isstring';
import isObject from '../methods/isobject';
import getProperty from '../methods/getproperty';

export type SortOptions = 'i' | 'ignoreCase' | {
    ignoreCase?: 0 | 1 | boolean;
    i?: 0 | 1 | boolean;
}
export type SortPrimer<T> = (value: T, property: string) => any;
export type SortProps = string | string[] | { [key: string]: -1 | 1 }

export default function sortBy<T>(arr: T[], props: SortProps, options?: SortOptions): T[];
export default function sortBy<T>(arr: T[], props: SortProps, rev?: boolean | null, primer?: SortPrimer<T> | null, lookup?: any, options?: SortOptions): T[];
export default function sortBy<T>(arr: T[], props: SortProps, rev?: any, primer?: SortPrimer<T> | null, lookup?: any, options?: any): T[] {
    /*|{
        "info": "Array class extension to sort the array",
        "category": "Array",
        "parameters":[
            {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"}],

        "overloads":[
            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(Array<String>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sortBy",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    try {
        if (isObject(rev) || isString(rev)) {
            options = rev;
            rev = undefined;
        }
        options = options || {};
        if (isString(options) && (options as string) in { "i": 1, "ignoreCase": 1 }) {
            options = { i: 1 };
        } else {
            options.i = options.i || options.ignoreCase;
        }
        primer = primer || function (x: any, prop: string) { return x; };
        if (isString(props)) { props = (props as string).split(','); }
        else if (isObject(props)) {
            let sortProps = [];
            for (let prop in props as any) {
                /* istanbul ignore if */
                if (!props.hasOwnProperty(prop)) { continue; }
                if ((props as any)[prop] == 1) { sortProps.push(prop); }
                if (!~(props as any)[prop]) { sortProps.push(`!${prop}`); }
            }
            props = sortProps;
        }

        let tmpVal;
        let prop_sort = function (a: any, b: any, p?: any): any {
            p = p || 0;
            let prop = (props as any)[p],
                reverseProp = false;

            if (!prop) { return 0; }
            if (prop[0] == "!") {
                prop = prop.replace('!', '');
                reverseProp = true;
            }
            const alookUp = getProperty(lookup, `${a[prop] || a}.${prop}`);
            const blookUp = getProperty(lookup, `${b[prop] || b}.${prop}`);

            let aVal = (primer as SortPrimer<T>).call(a, isNull(alookUp, a[prop]), prop),
                bVal = (primer as SortPrimer<T>).call(b, isNull(blookUp, b[prop]), prop);

            if (options.i && aVal && bVal) {
                aVal = aVal.toString().toLowerCase();
                bVal = bVal.toString().toLowerCase();
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

    } catch (e) /* istanbul ignore next */ {
        error && error('Array.sortBy', e);
        return arr;
    }
}