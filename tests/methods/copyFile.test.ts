import copyFile from '../../compiled/transformedMinor/craydent.copyfile';
jest.mock('fs', () => {
    return {
        "copyFile": (...args: any[]) => {
            _copyFile.apply(this, args);
        }
    }
});
let _copyFile = (...args: any[]) => { args[args.length - 1](); };
describe('copyFile', () => {
    beforeEach(() => {
        _copyFile = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _copyFile = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await copyFile('/the/path.js', 'dest')).toBe(null);
        expect(_copyFile).toHaveBeenLastCalledWith('/the/path.js', 'dest', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _copyFile = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await copyFile('/the/path.js', 'dest', 1)).toEqual({});
        expect(_copyFile).toHaveBeenLastCalledWith('/the/path.js', 'dest', 1, expect.any(Function));
    })
});
