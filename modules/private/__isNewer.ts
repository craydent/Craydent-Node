
export default function __isNewer(loadedVersion: string[], thisVersion: string[]): boolean {
    if (loadedVersion[0] == thisVersion[0]) {
        loadedVersion.splice(0, 1);
        thisVersion.splice(0, 1);
        if (!thisVersion.length || !loadedVersion.length) {
            return false;
        }
        return __isNewer(loadedVersion, thisVersion);
    }
    return parseInt(loadedVersion[0]) < parseInt(thisVersion[0]);
}