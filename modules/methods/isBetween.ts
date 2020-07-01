import isNull from './isNull';

export default function isBetween(obj: any, lowerBound: any, upperBound: any, inclusive?: boolean): boolean {
    if (isNull(obj)) { return false; }
    if (inclusive) {
        return (obj >= lowerBound && obj <= upperBound);
    } else {
        return (obj > lowerBound && obj < upperBound);
    }
}