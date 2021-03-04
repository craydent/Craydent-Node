import read from '../../compiled/transformedMinor/craydent.read';
jest.mock('fs', () => {
    return {
        "read": (...args) => {
            _read.apply(this, args);
        }
    }
});
let _read = (...args) => { args[args.length - 1](); };
describe('read', () => {
    beforeEach(() => {
        _read = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _read = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await read(1, [] as any, 0, 10, 2)).toBe(null);
        expect(_read).toHaveBeenLastCalledWith(1, [] as any, 0, 10, 2, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _read = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await read(1, [] as any, 0, 10, 2)).toEqual({});
        expect(_read).toHaveBeenLastCalledWith(1, [] as any, 0, 10, 2, expect.any(Function));
    })
});
