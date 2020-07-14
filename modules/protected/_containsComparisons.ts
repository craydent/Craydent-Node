export function _containsMatches(vals: string[], val: RegExp): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (val.test(vals[i])) { return true; }
    }
    return false;
}
export function _containsLessThan(vals: Array<number>, val: number): boolean;
export function _containsLessThan(vals: Array<string>, val: string): boolean;
export function _containsLessThan(vals, val): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] < val) { return true; }
    }
    return false;
}
export function _containsGreaterThan(vals: Array<number>, val: number): boolean;
export function _containsGreaterThan(vals: Array<string>, val: string): boolean;
export function _containsGreaterThan(vals, val): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] > val) { return true; }
    }
    return false;
}
export function _containsLessThanEqual(vals: Array<number>, val: number): boolean;
export function _containsLessThanEqual(vals: Array<string>, val: string): boolean;
export function _containsLessThanEqual(vals, val): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] <= val) { return true; }
    }
    return false;
}
export function _containsGreaterThanEqual(vals: Array<number>, val: number): boolean;
export function _containsGreaterThanEqual(vals: Array<string>, val: string): boolean;
export function _containsGreaterThanEqual(vals, val): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] >= val) { return true; }
    }
    return false;
}
export function _containsMod(vals: number[], val: [number, number]): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i] % val[0] == val[1]) { return true; }
    }
    return false;
}
export function _containsType(vals: any[], val: any): boolean {
    for (var i = 0, len = vals.length; i < len; i++) {
        if (vals[i].constructor == val) { return true; }
    }
    return false;
}