import error from './error';

export default function getDayOfYear(date: Date): number {
    try {
        return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    } catch (e) {
        error && error("Date.getDayOfYear", e);
        return NaN;
    }
}