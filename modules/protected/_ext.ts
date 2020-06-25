import error from '../methods/error';
import __defineFunction from '../private/__defineFunction';

export default function _ext(cls: object, property: string, func: Function, override?: boolean): void {
    try {
        $g.__craydentNoConflict || (cls['prototype'][property] = cls['prototype'][property] || func);
        __defineFunction(property, func, override);
    } catch (e) {
        error && error('_ext', e);
    }
}