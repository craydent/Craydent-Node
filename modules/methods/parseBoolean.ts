import error from './error';
import isBoolean from './isBoolean';
import isNumber from './isNumber';
import isString from './isString';
const _isString = isString,
    _isNumber = isNumber,
    _isBoolean = isBoolean;

export default function parseBoolean(value: any, strict?: boolean): boolean | undefined {
    /*|{
        "info": "Try to parse value to a Boolean (0, 1, '0', and '1' are valid unless strict is set to true).",
        "category": "Utility",
        "parameters":[
            {"value": "(any) value to parse as boolean."},
            {"strict?": "(Boolean) Disable parsing of 0, 1, '0', and '1'."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseBoolean",
        "returnType": "(Bool|undefined)"
    }|*/
    try {
        if (_isString(value)) {
            value = value.toLowerCase();
            let valids = strict ? { "true": 1, "false": 1 } : { "true": 1, "false": 1, "0": 1, "1": 1 };
            if (value in valids) {
                return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
            }
        } else if (_isNumber(value) && !strict) {
            return (value === 1 ? true : value === 0 ? false : undefined);
        } else if (_isBoolean(value)) {
            return value;
        }
        return undefined;
    } catch (e) {
        error && error('parseBoolean', e);
        return null;
    }
}
