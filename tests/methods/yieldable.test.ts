import yieldable from '../../compiled/transformedMinor/craydent.yieldable';

// jest.mock('../../compiled/transformedMinor/craydent.syncroit', () => {
//     return {
//         "default": (...args: any[]) => syncroit.apply(this, args)
//     }
// });
// let syncroit = () => { }
describe('yieldable', () => {
    // beforeEach(() => {
    //     syncroit = () => { }
    // });

    it('should return a yieldable object(Promise)', () => {
        // syncroit = jest.fn();
        expect(yieldable(function* () { })()).toEqual(expect.any(Promise));
        expect(yieldable(async function () { })()).toEqual(expect.any(Promise));
        expect(yieldable(new Promise((res) => { res(undefined) }))()).toEqual(expect.any(Promise));
        expect(yieldable(function () { })()).toEqual(expect.any(Promise));
        expect(yieldable(function (a, b) { })()).toEqual(expect.any(Promise));
        expect(yieldable(1 as any)()).toEqual(expect.any(Promise));
    });
    it('should return a yieldable using options', () => {
        const options = {
            method: function (cb: any) { cb(10) },
            context: {},
            callbackIndex: 0,
            returnIndex: 0
        };
        expect(yieldable(options)()).toEqual(expect.any(Promise));

    });
    it('should return a yieldable using returnIndex as boolean', () => {
        const options = {
            method: function (a: any, b: any, cb: any) { cb(false, true) },
            context: {},
            returnIndex: true
        };
        expect(yieldable(options)('a', 'b')).toEqual(expect.any(Promise));
    });
    it('should return a yieldable using returnIndex as number', () => {
        const options = {
            method: function (a: any, b: any, cb: any) { cb(false, true) },
            context: {},
            returnIndex: 1
        };
        expect(yieldable(options)('a', 'b')).toEqual(expect.any(Promise));
    });
    it('should return a yieldable without returnIndex', () => {
        const options = {
            method: function (a: any, b: any, cb: any) { cb(false, true) },
            context: {}
        };
        expect(yieldable(options)('a', 'b')).toEqual(expect.any(Promise));
    });
});