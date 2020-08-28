import error from '../methods/error';
import _generalTrim from './_generalTrim';

export default function _getFuncName(func: Function): string {
    try {
        return _generalTrim(func.toString().replace(/\/\/.*?[\r\n]/gi, '').replace(/[\t\r\n]*/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/.*?function\s*?(.*?)\s*?\(.*/, '$1'));
    } catch (e) /* istanbul ignore next */ {
        error && error('_getFuncName', e);
    }
}