import isObject from '../../modules/methods/isObject';

describe('isObject', () => {
    it('should check if value is an Object', () => {
        function a() { }
        const obj = new a();
        expect(isObject(null)).toBe(false);
        expect(isObject(1)).toBe(false);

        expect(isObject({})).toBe(true);
        expect(isObject(obj)).toBe(false);
        expect(isObject(obj, true)).toBe(true);
    });
});