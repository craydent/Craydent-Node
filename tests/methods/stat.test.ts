import stat from '../../compiled/transformedMinor/craydent.stat';
jest.mock('fs', () => {
    return {
        "stat": (...args) => {
            _stat.apply(this, args);
        }
    }
});
let _stat = (...args) => { args[args.length - 1](); };
describe('stat', () => {
    beforeEach(() => {
        _stat = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _stat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await stat('/the/path.js')).toBe(null);
        expect(_stat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _stat = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await stat('/the/path.js')).toEqual({});
        expect(_stat).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
