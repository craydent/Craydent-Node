import writeFile from '../../compiled/transformedMinor/craydent.writefile';
jest.mock('fs', () => {
    return {
        "writeFile": (...args) => {
            _writeFile.apply(this, args);
        }
    }
});
let _writeFile = (...args) => { args[args.length - 1](); };
describe('writeFile', () => {
    beforeEach(() => {
        _writeFile = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _writeFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await writeFile('/the/path.js', '')).toBe(null);
        expect(_writeFile).toHaveBeenLastCalledWith('/the/path.js', '', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _writeFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await writeFile('/the/path.js', '')).toEqual({});
        expect(_writeFile).toHaveBeenLastCalledWith('/the/path.js', '', expect.any(Function));
    })
});
