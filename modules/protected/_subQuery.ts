import isObject from "../methods/isObject";
import parseRaw from "../methods/parseRaw";
import getValue from "../methods/getValue";
import isFunction from "../methods/isFunction";
import _getFuncName from "./_getFuncName";
import isNull from "../methods/isNull";
import isArray from "../methods/isArray";
import replaceAll from "../methods/replaceAll";

export type MongoQuery = any;

export default function _subQuery(query: MongoQuery, field: string, index: number, _whereRefs_arg?: any[]): string | boolean {
    let _whereRefs = _whereRefs_arg || [];
    if (!isObject(query)) {
        if (~field.indexOf('.')) {
            return `_equals(_getProperty(record,'${field}'), ${parseRaw(query)})`;
        }
        return `_equals(record['${field}'], ${parseRaw(query)})`;
    }
    let expression = 'true', comparison_map = {
        '$lt': '_clt',
        '$lte': '_clte',
        '$gt': '_cgt',
        '$gte': '_cgte'
    };


    // prep multiple subqueries
    for (let prop in query) {
        /* istanbul ignore next */
        if (!query.hasOwnProperty(prop)) { continue; }
        let val;
        switch (prop) {
            // value is the record in the array
            // q is the conditional value
            case '$equals':
            case '$eq':
            case '$regex':
            case '$ne':
                val = getValue(query[prop]);
                let q = `(${parseRaw(val)})`;
                if (isFunction(val)) {
                    q += `(record,'${field}',index)`;
                } else {
                    q = `_contains(values,${q})`;
                }
                expression += ` && ((values = _qnp(record, '${field}')).length && ${(prop == '$ne' ? '!' : '')}${q})`;
                break;
            case '$lt':
            case '$lte':
            case '$gt':
            case '$gte':
                expression += ` && ((values = _qnp(record, '${field}')).length && ${comparison_map[prop]}(values,${parseRaw(query[prop])}))`;
                break;
            case '$exists':
                expression += ` && ((finished = {validPath:0}),_getProperty(record,'${field}','.',finished),_parseBoolean(finished.validPath) == ${query['$exists']})`;
                break;
            case '$type':
                let qt = isNull(query['$type']) ? '!' : '';
                expression += ` && (${qt}(values = _qnp(record, '${field}')).length && _ct(values,${_getFuncName(query['$type'] || 'null')}))`;
            case '$text':
                //return record.getProperty(field).contains(query['$search']);
                break;
            case '$mod':
                let qm = isArray(query['$mod']);
                expression += ` && ((values = _qnp(record, '${field}')).length && ${qm} && _cm(values,${parseRaw(query[prop])}))`;
                break;
            case '$all':
                let all = parseRaw(query['$all']) ||/* istanbul ignore next */ undefined;
                expression += ` && (values = _qnp(record, '${field}')),(all = ${all}),(_isArray(values[0]) && _isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!_contains(values[0],all[j])) { return false; }} return true;})()`;
                break;
            case '$size':
                let ival = parseInt(query['$size']);
                expression += ` && (values = _qnp(record, '${field}')[0]),(_isArray(values) ? (${ival} === values.length) : (values == undefined && 0 === ${ival}))`;
                break;
            case '$where':
                let isfunc = isFunction(query['$where']);
                if (isfunc) {
                    _whereRefs.push(query['$where']);
                }
                val = `(${(isfunc ? `__where_cb${_whereRefs.length}` : `function(){return (${query['$where']});}`)})`;
                expression += ' && ' + val + '.call(record)';
                break;
            case '$elemMatch':
                expression += ` && (values = _qnp(record, '${field}')[0]),(_isArray(values) && !!where(values,${parseRaw(query['$elemMatch'])},1).length)`;
                break;
            case '$or':
            case '$nor':
                let ors = query[prop], o = 0, or, nor = '';
                if (!isArray(ors)) { return false; }
                if (prop == '$nor') { nor = '!'; }
                expression += ` && ${nor}(`;
                while (or = ors[o++]) {
                    expression += `(${_subQuery(or, field, index, _whereRefs)}) || `;
                }
                expression += 'false)';

                break;
            case '$and':
                let ands = query['$and'], a = 0, and;
                if (!isArray(ands)) { return false; }
                expression += ' && (';
                while (and = ands[a++]) {
                    expression += `(${_subQuery(and, field, index, _whereRefs)}) && `;
                }
                expression += 'true)';

                break;
            case '$not':
                if (!isObject(query['$not'])) {
                    expression += ` && _contains(values, ${parseRaw(query['$not'])})`;
                    break;
                }

                expression += ` && !(${_subQuery(query[prop], field, null, _whereRefs)})`;
                break;

            case '$in':
            case '$nin':
                expression += ` && ${(prop == '$nin' ? '!' : '')}((values = _qnp(record, '${field}')),_contains(${parseRaw(query[prop])},values))`;
                break;
            default:
                expression += ` && ${_subQuery(query[prop], replaceAll(prop, '\'', '\\\''), null, _whereRefs)}`;
                break;
        }
    }
    return expression;
}