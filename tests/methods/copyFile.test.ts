import copyFile from '../../modules/methods/copyFile';
jest.mock('fs', () => {
    return {
        "copyFile": (...args) => {
            _copyFile.apply(this, args);
        }
    }
});
let _copyFile = (...args) => { args[args.length - 1](); };
describe('copyFile', () => {
    beforeEach(() => {
        _copyFile = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _copyFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await copyFile('/the/path.js', 'dest')).toBe(null);
        expect(_copyFile).toHaveBeenLastCalledWith('/the/path.js', 'dest', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _copyFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await copyFile('/the/path.js', 'dest', 1)).toEqual({});
        expect(_copyFile).toHaveBeenLastCalledWith('/the/path.js', 'dest', 1, expect.any(Function));
    })
});
