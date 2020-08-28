import appendFile from '../../modules/methods/appendFile';
jest.mock('fs', () => {
    return {
        "appendFile": (...args) => {
            _appendFile.apply(this, args);
        }
    }
});
let _appendFile = (...args) => { args[args.length - 1](); };
describe('appendFile', () => {
    beforeEach(() => {
        _appendFile = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _appendFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await appendFile('/the/path.js', 1)).toBe(null);
        expect(_appendFile).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _appendFile = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await appendFile('/the/path.js', 1)).toEqual({});
        expect(_appendFile).toHaveBeenLastCalledWith('/the/path.js', 1, expect.any(Function));
    })
});