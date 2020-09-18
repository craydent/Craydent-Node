import error from '../methods/error';

export default function substringEndAt(str: string, end: string): string {
    try {
        return str.substring(0, str.indexOf(end));
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.substringEndAt', e);
    }
}