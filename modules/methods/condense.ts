/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import isNull from './isNull';

export default function condense<T>(arr: T[], check_values?: any[] | boolean): T[] {
    try {
        let skip = [], items = [], without = false;
        if (check_values && check_values.constructor == Array) {
            without = true;
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i];
            if (check_values) {
                let index = i;
                if (without && ~(check_values as any[]).indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = arr.indexOf(obj, index + 1))) {
                    skip.push(index);
                }

            }
            obj as any !== "" && !isNull(obj) && !~skip.indexOf(i) && items.push(obj);
        }
        return items;
    } catch (e) /* istanbul ignore next */ {
        error && error("condence", e);
        return [];
    }
}