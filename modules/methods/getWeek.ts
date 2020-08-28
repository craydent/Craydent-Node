import error from './error';

export default function getWeek(dateTime: string | Date): number {
    try {
        let d = new Date(dateTime);
        d.setHours(0, 0, 0);
        let fdate = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d.getTime() - fdate.getTime()) / 8.64e7) + 1 + fdate.getDay()) / 7);
    } catch (e) /* istanbul ignore next */ {
        error && error("Date.getWeek", e);
        return NaN;
    }
}