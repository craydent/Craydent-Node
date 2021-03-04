import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import setProperty from '../methods/setproperty';

export default function _stringifyAdvanced(obj: any): string;
export default function _stringifyAdvanced(obj: any, _nobj?, _objs?, _paths?, _cpath?): string {
    _nobj = _nobj || (isObject(obj) ? {} : (isArray(obj) ? [] : obj));
    _objs = _objs || [obj];
    _paths = _paths || ["/"];
    _cpath = _cpath || "";
    for (let prop in obj) {
        /* istanbul ignore next */
        if (!obj.hasOwnProperty(prop)) { continue; }
        let val = obj[prop];
        if (isObject(obj[prop]) || isArray(obj[prop])) {
            let index;
            if (~(index = _objs.indexOf(obj[prop]))) {
                val = { "$ref": "#" + _paths[index] };
            } else {
                _objs.push(obj[prop]);
                _paths.push(_cpath + "/" + prop);
                //@ts-ignore
                val = _stringifyAdvanced(obj[prop], (isObject(obj[prop]) ? {} : []), _objs, _paths, "/" + prop);
            }
        }
        setProperty(_nobj, "/" + prop, val, '/');
    }
    return _nobj;
}