import unlink from '../../compiled/transformedMinor/craydent.unlink';
jest.mock('fs', () => {
    return {
        "unlink": (...args) => {
            _unlink.apply(this, args);
        }
    }
});
let _unlink = (...args) => { args[args.length - 1](); };
describe('unlink', () => {
    beforeEach(() => {
        _unlink = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _unlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await unlink('/the/path.js')).toBe(null);
        expect(_unlink).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _unlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await unlink('/the/path.js')).toEqual({});
        expect(_unlink).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
