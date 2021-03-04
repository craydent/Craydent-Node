import readlink from '../../compiled/transformedMinor/craydent.readlink';
jest.mock('fs', () => {
    return {
        "readlink": (...args) => {
            _readlink.apply(this, args);
        }
    }
});
let _readlink = (...args) => { args[args.length - 1](); };
describe('readlink', () => {
    beforeEach(() => {
        _readlink = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _readlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await readlink('/the/path.js')).toBe(null);
        expect(_readlink).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _readlink = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await readlink('/the/path.js')).toEqual({});
        expect(_readlink).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
