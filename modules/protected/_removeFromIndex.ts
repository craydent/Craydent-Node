
export default function _removeFromIndex(buckets, obj) {
    for (let prop in buckets) {
        let sarr = buckets[prop][obj[prop]],
            index = sarr.indexOf(obj);
        if (~index) {
            sarr.splice(index, 1);
        }
        if (!sarr.length) {
            delete buckets[prop][obj[prop]];
            let keys = buckets[prop].__bucket__keys;
            keys.splice(keys.indexOf(obj[prop]), 1);
        }
    }
}