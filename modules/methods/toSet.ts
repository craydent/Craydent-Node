import error from '../methods/error';
import _equals from '../methods/equals';
import _removeAt from '../methods/removeAt';

export default function toSet<T>(arr: any[]): Set<T> {
    try {
        for (let i = 0, len = arr.length; i < len; i++) {
            let item = arr[i];
            for (let j = i + 1; j < len; j++) {
                let citem = arr[j];
                if (_equals(item, citem)) {
                    _removeAt(arr, j--);
                    len--;
                }
            }
        }
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.toSet", e);
        return null;
    }
}