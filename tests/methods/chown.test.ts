import chown from '../../compiled/transformedMinor/craydent.chown';
jest.mock('fs', () => {
    return {
        "chown": (...args: any[]) => {
            _chown.apply(this, args);
        }
    }
});
let _chown = (...args: any[]) => { args[args.length - 1](); };
describe('chown', () => {
    beforeEach(() => {
        _chown = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _chown = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await chown('/the/path.js', 1, 2)).toBe(null);
        expect(_chown).toHaveBeenLastCalledWith('/the/path.js', 1, 2, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _chown = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await chown('/the/path.js', 1, 2)).toEqual({});
        expect(_chown).toHaveBeenLastCalledWith('/the/path.js', 1, 2, expect.any(Function));
    })
});
