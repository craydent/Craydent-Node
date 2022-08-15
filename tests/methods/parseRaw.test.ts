import parseRaw from '../../compiled/transformedMinor/craydent.parseraw';
jest.mock('../../compiled/transformedMinor/craydent.suid', () => {
    return {
        "default": (...args: any[]) => suid.apply(this, args as any)
    }
});
let suid = () => { };
describe('parseRaw', () => {
    beforeEach(() => {
        suid = () => { }
    });
    it('should parse as raw value', () => {
        expect(parseRaw(null)).toBe('null');
        expect(parseRaw(1)).toBe('1');
        expect(parseRaw("null", true)).toBe('null');
        expect(parseRaw("null")).toBe('"null"');
        expect(parseRaw({})).toBe('{}');
        expect(parseRaw([{}])).toBe('[{}]');
        expect(parseRaw(/a/)).toBe('/a/');
        expect(parseRaw(new Date('Thu Aug 13 2020 14:15:26 GMT-0700 (Pacific Daylight Time)'))).toBe('new Date(\'Thu Aug 13 2020 14:15:26 GMT-0700 (Pacific Daylight Time)\')');
        expect(parseRaw(function () { })).toBe('function () { }');
        function a() { }
        expect(parseRaw(new (a as any)())).toBe('{}');

        suid = jest.fn(() => 's8F7Fx9p8a')
        const item: any = { item: null };
        item.item = item;
        expect(parseRaw({ a: { item } }, false, true)).toBe('{"a": {"item": {"item": $g[\'s8F7Fx9p8a\']}}}');

        (global as any).var = { var: global };
        expect(parseRaw((global as any).var, false, true)).toBe('$g[\'var\']');
        expect(parseRaw((global as any).var, false, true)).toBe('$g[\'var\']');
    })
    it('should parse as raw value', () => {

        suid = jest.fn(() => 's8F7Fx9p8a')
        const item: any = { item: null };
        item.item = item;
        expect(parseRaw({ a: { item } }, false)).toBe('{"a": {"item": {"item": {}}}}');
    })
});
