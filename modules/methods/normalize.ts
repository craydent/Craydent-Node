import error from './error';
import isObject from './isObject';

export default function normalize<T, TResult>(arr: T[]): TResult[] {
    try {
        let allProps = {} as any, arrObj = [], len = arr.length;
        for (let i = 0; i < len; i++) {
            let json = arr[i];
            if (!isObject(json)) {
                error && error("normalize", { description: `index: ${i} (skipped) is not an object` } as any);
                continue;
            }
            for (let prop in json) {
                if (json.hasOwnProperty(prop)) {
                    allProps[prop] = 1;
                }
            }
        }
        for (let i = 0; i < len; i++) {
            for (let prop in allProps) {
                if (!allProps.hasOwnProperty(prop)) { continue; }
                arr[i][prop] = arr[i][prop] || null;
            }
            arrObj.push(arr[i]);
        }
        return arrObj;
    } catch (e) {
        error("Array.normalize", e);
        return [];
    }
}