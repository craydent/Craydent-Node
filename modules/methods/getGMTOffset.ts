import error from '../methods/error';

export default function getGMTOffset(dt: Date): number {
    try {
        let diff = dt.getHours() - dt.getUTCHours();
        /* istanbul ignore next */
        return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24 : 0) : 0) : 24);
    } catch (e) /* istanbul ignore next */ {
        error && error('getGMTOffset', e);
        return NaN;
    }
}