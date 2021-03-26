import close from '../../compiled/transformedMinor/craydent.close';
jest.mock('fs', () => {
    return {
        "close": (...args: any[]) => {
            return _close.apply(this, args);
        }
    }
});
let _close = (...args: any[]) => { args[args.length - 1](); };
describe('close', () => {
    beforeEach(() => {
        _close = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _close = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await close(1)).toBe(null);
        expect(_close).toHaveBeenLastCalledWith(1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _close = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await close(1)).toEqual({});
        expect(_close).toHaveBeenLastCalledWith(1, expect.any(Function));
    })
});
