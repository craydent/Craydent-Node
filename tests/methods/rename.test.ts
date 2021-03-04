import rename from '../../compiled/transformedMinor/craydent.rename';
jest.mock('fs', () => {
    return {
        "rename": (...args) => {
            _rename.apply(this, args);
        }
    }
});
let _rename = (...args) => { args[args.length - 1](); };
describe('rename', () => {
    beforeEach(() => {
        _rename = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _rename = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await rename('/the/path.js', '/new/path.js')).toBe(null);
        expect(_rename).toHaveBeenLastCalledWith('/the/path.js', '/new/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _rename = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await rename('/the/path.js', '/new/path.js')).toEqual({});
        expect(_rename).toHaveBeenLastCalledWith('/the/path.js', '/new/path.js', expect.any(Function));
    })
});
