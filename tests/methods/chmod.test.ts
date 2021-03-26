import chmod from '../../compiled/transformedMinor/craydent.chmod';
jest.mock('fs', () => {
    return {
        "chmod": (...args: any[]) => {
            _chmod.apply(this, args);
        }
    }
});
let _chmod = (...args: any[]) => { args[args.length - 1](); };
describe('chmod', () => {
    beforeEach(() => {
        _chmod = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _chmod = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await chmod('/the/path.js', 0o775)).toBe(null);
        expect(_chmod).toHaveBeenLastCalledWith('/the/path.js', 0o775, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _chmod = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await chmod('/the/path.js', "777")).toEqual({});
        expect(_chmod).toHaveBeenLastCalledWith('/the/path.js', "777", expect.any(Function));
    })
});