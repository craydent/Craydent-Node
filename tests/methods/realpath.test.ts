import realpath from '../../modules/methods/realpath';
jest.mock('fs', () => {
    return {
        "realpath": (...args) => {
            _realpath.apply(this, args);
        }
    }
});
let _realpath = (...args) => { args[args.length - 1](); };
describe('realpath', () => {
    beforeEach(() => {
        _realpath = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _realpath = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await realpath('/the/path.js')).toBe(null);
        expect(_realpath).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _realpath = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await realpath('/the/path.js')).toEqual({});
        expect(_realpath).toHaveBeenLastCalledWith('/the/path.js', expect.any(Function));
    })
});
