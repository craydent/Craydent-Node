import write from '../../modules/methods/write';
jest.mock('fs', () => {
    return {
        "write": (...args) => {
            _write.apply(this, args);
        }
    }
});
let _write = (...args) => { args[args.length - 1](); };
describe('write', () => {
    beforeEach(() => {
        _write = (...args) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _write = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1](null); });
        expect(await write(1, '')).toBe(null);
        expect(_write).toHaveBeenLastCalledWith(1, '', expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _write = jest.fn().mockImplementationOnce((...args) => { args[args.length - 1]({}); });
        expect(await write(1, '')).toEqual({});
        expect(_write).toHaveBeenLastCalledWith(1, '', expect.any(Function));
    })
});
