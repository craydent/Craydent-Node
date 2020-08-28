import truncate from '../../modules/methods/truncate';
jest.mock('fs', () => {
    return {
        "truncate": (...args) => {
            _truncate.apply(this, args);
        }
    }
});
let _truncate = (...args) => { args[args.length - 1](); };
describe('truncate', () => {
    beforeEach(() => {
        _truncate = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _truncate = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await truncate('/the/path.js')).toBe(null);
        expect(_truncate).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _truncate = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await truncate('/the/path.js', 1)).toEqual({});
        expect(_truncate).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function));
    })
});
