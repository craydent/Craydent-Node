import close from '../../modules/methods/close';
jest.mock('fs', () => {
    return {
        "close": (...args) => {
            return _close.apply(this, args);
        }
    }
});
let _close = (...args) => { args[args.length - 1](); };
describe('close', () => {
    beforeEach(() => {
        _close = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _close = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await close(1)).toBe(null);
        expect(_close).toHaveBeenLastCalledWith(1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _close = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await close(1)).toEqual({});
        expect(_close).toHaveBeenLastCalledWith(1, expect.any(Function));
    })
});
