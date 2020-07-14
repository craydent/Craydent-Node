import error from '../methods/error';
import __defineFunction from '../private/__defineFunction';

declare var $g;

export default function _ext(cls: any, property: string, func: Function, override?: boolean): void {
    try {
        if (!$g.__craydentNoConflict) {
            if (override) {
                cls['prototype'][property] = func;
            } else {
                cls['prototype'][property] = cls['prototype'][property] || func;
            }
        }
        __defineFunction(property, func);
    } catch (e) {
        /* istanbul ignore next */
        error && error('_ext', e);
    }
}