import mkdtemp from '../../compiled/transformedMinor/craydent.mkdtemp';
jest.mock('fs', () => {
    return {
        "mkdtemp": (...args: any[]) => {
            _mkdtemp.apply(this, args);
        }
    }
});
let _mkdtemp = (...args: any[]) => { args[args.length - 1](); };
describe('mkdtemp', () => {
    beforeEach(() => {
        _mkdtemp = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _mkdtemp = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await mkdtemp('/the/path.js')).toBe(null);
        expect(_mkdtemp).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _mkdtemp = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await mkdtemp('/the/path.js', '1')).toEqual({});
        expect(_mkdtemp).toHaveBeenLastCalledWith('/the/path.js', '1', expect.any(Function));
    })
});
