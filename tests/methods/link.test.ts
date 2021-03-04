import link from '../../compiled/transformedMinor/craydent.link';
jest.mock('fs', () => {
    return {
        "link": (...args) => {
            _link.apply(this, args);
        }
    }
});
let _link = (...args) => { args[args.length - 1](); };
describe('link', () => {
    beforeEach(() => {
        _link = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _link = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await link('/the/path.js', '/new/path.js')).toBe(null);
        expect(_link).toHaveBeenLastCalledWith('/the/path.js', '/new/path.js', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _link = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await link('/the/path.js', '/new/path.js')).toEqual({});
        expect(_link).toHaveBeenLastCalledWith('/the/path.js', '/new/path.js', expect.any(Function));
    })
});
