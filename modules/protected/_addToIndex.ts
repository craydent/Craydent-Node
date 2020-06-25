function __binarySearch(arr: any[], value: any, min?: number, max?: number): number {
    min = min || 0;
    max = max || arr.length;

    if (min + 1 == max) { return max; }

    // @ts-ignore
    let mid = parseInt((max - min) / 2) + min;

    if (arr[mid] == value) {
        mid--;
        while (min > mid) {
            if (arr[mid] != value) { break; }
            mid--;
        }
        return mid + 1;
    }

    if (arr[mid] > value) { max = mid; }
    if (arr[mid] < value) { min = mid; }

    return __binarySearch(arr, value, min, max);
}
export default function _addToIndex(buckets: any, obj: any): void {
    for (let prop in buckets) {
        let sarr = buckets[prop][obj[prop]];
        if (!sarr || !sarr.length) {
            sarr = sarr || (buckets[prop][obj[prop]] = []);
            var keys = buckets[prop].__bucket__keys;
            var index = __binarySearch(keys, obj[prop]);
            keys.splice(index, 0, obj[prop]);
        }
        sarr.push(obj);
    }
}
