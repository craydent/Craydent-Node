import error from './error';

export default function getGMTOffset(dt: Date): number {
    try {
        let diff = dt.getHours() - dt.getUTCHours();
        return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24 : 0) : 0) : 24);
    } catch (e) {
        error && error('getGMTOffset', e);
        return NaN;
    }
}