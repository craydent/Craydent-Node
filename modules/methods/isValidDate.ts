import error from '../methods/error';

export default function isValidDate(date: Date): boolean {
    try {
        return !isNaN(date.getTime());
    } catch (e) /* istanbul ignore next */ {
        error && error("Date.isValidDate", e);
        return null;
    }
}