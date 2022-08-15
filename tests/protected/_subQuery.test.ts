import _subQuery from '../../modules/protected/_subQuery';
import average from '../../compiled/transformedMinor/craydent.average';
describe('_subQuery', () => {
    it('should generate condition when query is not an object', () => {
        expect(_subQuery('' as any, 'name.first', 0)).toBe('((values = _qnp(record, \'name.first\')), _contains(values, function(val){return _equals(val,\"\");}))');
        expect(_subQuery('' as any, 'name', 0)).toBe('_equals(record[\'name\'], "")');
    })
    it('should generate $equals/$eq/$regex/$ne condition', () => {
        let expected = "true && ((values = _qnp(record, 'name')).length && _contains(values,(1)))";
        expected += " && ((values = _qnp(record, 'name')).length && _contains(values,(2)))";
        expected += " && ((values = _qnp(record, 'name')).length && _contains(values,(/a/)))";
        expected += " && ((values = _qnp(record, 'name')).length && !_contains(values,(4)))";
        expect(_subQuery({ $equals: 1, $eq: 2, $regex: /a/, $ne: 4 }, 'name', 0)).toBe(expected);
        expected = "true && ((values = _qnp(record, 'name')).length && !(function () { })(record,'name',index))";
        expect(_subQuery({ $ne: () => () => { } }, 'name', 0)).toBe(expected);
    })
    it('should generate $lt/$lte/$gt/$gte condition', () => {
        let expected = "true && ((values = _qnp(record, 'name')).length && _clt(values,1))";
        expected += " && ((values = _qnp(record, 'name')).length && _clte(values,2))";
        expected += " && ((values = _qnp(record, 'name')).length && _cgt(values,3))";
        expected += " && ((values = _qnp(record, 'name')).length && _cgte(values,4))";
        expect(_subQuery({ $lt: 1, $lte: 2, $gt: 3, $gte: 4 }, 'name', 0)).toBe(expected);

    })
    it('should generate $exists condition', () => {
        let expected = "true && ((finished = {validPath:0}),_getProperty(record,'name','.',finished),_parseBoolean(finished.validPath) == false)";
        expect(_subQuery({ $exists: false }, 'name', 0)).toBe(expected);

    })
    it('should generate $type condition', () => {
        let expected = "true && (!(values = _qnp(record, 'name')).length && _ct(values,null))";
        expect(_subQuery({ $type: null }, 'name', 0)).toBe(expected);
        expected = "true && ((values = _qnp(record, 'name')).length && _ct(values,Number))";
        expect(_subQuery({ $type: Number }, 'name', 0)).toBe(expected);

    })
    it('should generate $text condition', () => {
        let expected = "true";
        expect(_subQuery({ $text: 1 }, 'name', 0)).toBe(expected);

    })
    it('should generate $mod condition', () => {
        let expected = "true && ((values = _qnp(record, 'name')).length && true && _cm(values,[2,2]))";
        expect(_subQuery({ $mod: [2, 2] }, 'name', 0)).toBe(expected);

    })
    it('should generate $all condition', () => {
        let expected = "true && (values = _qnp(record, 'name')),(all = [1]),(_isArray(values[0]) && _isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!_contains(values[0],all[j])) { return false; }} return true;})()";
        expect(_subQuery({ $all: [1] }, 'name', 0)).toBe(expected);

    })
    it('should generate $size condition', () => {
        let expected = "true && (values = _qnp(record, 'name')[0]),(_isArray(values) ? (1 === values.length) : (values == undefined && 0 === 1))";
        expect(_subQuery({ $size: 1 }, 'name', 0)).toBe(expected);

    })
    it('should generate $where condition', () => {
        let expected = "true && (__where_cb1).call(record)";
        expect(_subQuery({ $where: () => { } }, 'name', 0)).toBe(expected);
        expected = "true && (function(){return (true);}).call(record)";
        expect(_subQuery({ $where: true }, 'name', 0)).toBe(expected);

    })
    it('should generate $elemMatch condition', () => {
        let expected = "true && (values = _qnp(record, 'name')[0]),(_isArray(values) && !!where(values,{\"a\": 1},1).length)";
        expect(_subQuery({ $elemMatch: { a: 1 } }, 'name', 0)).toBe(expected);

    })
    it('should generate $or/nor condition', () => {
        let expected = "true && ((true && _equals(record['a'], 1)) || false)";
        expected += " && !((true && _equals(record['b'], 1)) || false)";
        expect(_subQuery({ $or: [{ a: 1 }], $nor: [{ b: 1 }] }, 'name', 0)).toBe(expected);
        expect(_subQuery({ $or: 1 }, 'name', 0)).toBe(false);
    })
    it('should generate $and condition', () => {
        let expected = "true && ((true && _equals(record['a'], 1)) && (true && _equals(record['b'], 1)) && true)";
        expect(_subQuery({ $and: [{ a: 1 }, { b: 1 }] }, 'name', 0)).toBe(expected);
        expect(_subQuery({ $and: 1 }, 'name', 0)).toBe(false);
    })
    it('should generate $not condition', () => {
        let expected = "true && _contains(values, 1)";
        expect(_subQuery({ $not: 1 }, 'name', 0)).toBe(expected);
        expected = "true && !(true && true && ((values = _qnp(record, 'name')).length && _contains(values,(1))))";
        expect(_subQuery({ $not: { name: { $eq: 1 } } }, 'name', 0)).toBe(expected);

    })
    it('should generate $in/$nin condition', () => {
        let expected = "true && ((values = _qnp(record, 'name')),_contains(values,[1,2]))";
        expected += " && !((values = _qnp(record, 'name')),_contains(values,[3,4]))";
        expect(_subQuery({ $in: [1, 2], $nin: [3, 4] }, 'name', 0)).toBe(expected);

    })
    it('should generate default condition', () => {
        let expected = "true && _equals(record['a'], 1)";
        expect(_subQuery({ a: 1 }, 'name', 0)).toBe(expected);

    })
});
