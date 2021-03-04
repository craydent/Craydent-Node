import getProperty from '../methods/getproperty';

export default function _groupFieldHelper(obj: any, fields: string[]): string {
    let prop = "", j = 0, field;
    while (field = fields[j++]) {
        let option = { validPath: 0 };
        let value = getProperty(obj, field, option);
        if (!option.validPath) { continue; }
        prop += `${field}:${value},`;
    }
    return prop;
}