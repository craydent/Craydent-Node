import lchown from '../../modules/methods/lchown';
jest.mock('fs', () => {
    return {
        "lchown": (...args) => {
            _lchown.apply(this, args);
        }
    }
});
let _lchown = (...args) => { args[args.length - 1](); };
describe('lchown', () => {
    beforeEach(() => {
        _lchown = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _lchown = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await lchown('/the/path.js', 1, 1)).toBe(null);
        expect(_lchown).toHaveBeenLastCalledWith('/the/path.js', 1, 1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _lchown = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await lchown('/the/path.js', 1, 1)).toEqual({});
        expect(_lchown).toHaveBeenLastCalledWith('/the/path.js', 1, 1, expect.any(Function));
    })
});
