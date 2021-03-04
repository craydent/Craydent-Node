import open from '../../compiled/transformedMinor/craydent.open';
jest.mock('fs', () => {
    return {
        "open": (...args) => {
            _open.apply(this, args);
        }
    }
});
let _open = (...args) => { args[args.length - 1](); };
describe('open', () => {
    beforeEach(() => {
        _open = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _open = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await open('/the/path.js', 'flag')).toBe(null);
        expect(_open).toHaveBeenLastCalledWith('/the/path.js', 'flag', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _open = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await open('/the/path.js', 'flag', 1)).toEqual({});
        expect(_open).toHaveBeenLastCalledWith('/the/path.js', 'flag', 1, expect.any(Function));
    })
});
