import error from './error';

export default function keyOf<T>(obj: T, value: any): string {
    try {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (obj[prop] === value) { return prop; }
            }
        }
        return '';
    } catch (e) {
        error && error('Object.keyOf', e);
        return '';
    }
}