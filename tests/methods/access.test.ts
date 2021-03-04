import access from '../../compiled/transformedMinor/craydent.access';
jest.mock('fs', () => {
    return {
        "access": (...args) => {
            _access.apply(this, args);
        }
    }
});
let _access = (...args) => { args[args.length - 1](); };
describe('access', () => {
    beforeEach(() => {
        _access = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _access = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await access('/the/path.js')).toBe(null);
        expect(_access).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _access = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await access('/the/path.js', 1)).toEqual({});
        expect(_access).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function));
    })
});

