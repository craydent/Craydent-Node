import error from '../methods/error';
import __convertRegexSafe from '../private/__convertRegexSafe'
import isArray from '../methods/isArray';

export default function _replaceAll(str: string, replace: string, subject: string, flag?: string): string;
export default function _replaceAll(str: string, replace: string[], subject: string[], flag?: string): string;
export default function _replaceAll(str, replace, subject, flag?): string {
    try {
        if (!isArray(replace)) {
            replace = [replace];
        }
        if (!isArray(subject)) {
            subject = [subject];
        }
        let last = 0;
        for (let i = 0, len = replace.length; i < len; i++) {
            let rep = replace[i];
            let reg = new RegExp(__convertRegexSafe(rep), flag);
            /* istanbul ignore if */
            if (!~str.search(reg)) { continue; }
            str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
            if (subject[last + 1]) { last++; }
        }
        return str.toString();
    } catch (e) {
        /* istanbul ignore next */
        error && error("_replaceAll", e);
        /* istanbul ignore next */
        return '';
    }
}