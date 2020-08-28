import readFile from '../../modules/methods/readFile';
jest.mock('fs', () => {
    return {
        "readFile": (...args) => {
            _readFile.apply(this, args);
        }
    }
});
let _readFile = (...args) => { args[args.length - 1](); };
describe('readFile', () => {
    beforeEach(() => {
        _readFile = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _readFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await readFile('/the/path.js')).toBe(null);
        expect(_readFile).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _readFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await readFile('/the/path.js')).toEqual({});
        expect(_readFile).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
