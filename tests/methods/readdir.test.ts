import readdir from '../../compiled/transformedMinor/craydent.readdir';
jest.mock('fs', () => {
    return {
        "readdir": (...args) => {
            _readdir.apply(this, args);
        }
    }
});
let _readdir = (...args) => { args[args.length - 1](); };
describe('readdir', () => {
    beforeEach(() => {
        _readdir = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _readdir = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await readdir('/the/path.js')).toBe(null);
        expect(_readdir).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _readdir = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await readdir('/the/path.js')).toEqual({});
        expect(_readdir).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
