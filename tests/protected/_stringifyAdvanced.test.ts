import _stringifyAdvanced from '../../modules/protected/_stringifyAdvanced';

describe('_stringifyAdvanced', () => {
    it('should create return an object/array that is stringifyable', () => {
        let ref = {};
        expect(_stringifyAdvanced({ prop: [{}], str: '' })).toEqual({ prop: [{}], str: '' });
        expect(_stringifyAdvanced([{ ref }, ref])).toEqual([{ ref: {} }, { '$ref': "#/0/ref" }]);
    });
    it('should create return an object/array that is stringifyable', () => {
        let ref = {};
        expect(_stringifyAdvanced("")).toBe("");
    });
    it('should create return an itself when not object/array', () => {
        let ref: any = {};
        ref.ref = ref;
        expect(_stringifyAdvanced(ref)).toEqual({ ref: { "$ref": '#/' } });
    });
});