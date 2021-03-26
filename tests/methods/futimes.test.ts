import futimes from '../../compiled/transformedMinor/craydent.futimes';
jest.mock('fs', () => {
    return {
        "futimes": (...args: any[]) => {
            _futimes.apply(this, args);
        }
    }
});
let _futimes = (...args: any[]) => { args[args.length - 1](); };
describe('futimes', () => {
    beforeEach(() => {
        _futimes = (...args: any[]) => { args[args.length - 1](); };
    })
    it('should return null when there are no errors', async () => {
        _futimes = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1](null); });
        expect(await futimes(1, '', 0)).toBe(null);
        expect(_futimes).toHaveBeenLastCalledWith(1, '', 0, expect.any(Function))
    })
    it('should return error when there are errors', async () => {
        _futimes = jest.fn().mockImplementationOnce((...args: any[]) => { args[args.length - 1]({}); });
        expect(await futimes(1, '', 0)).toEqual({});
        expect(_futimes).toHaveBeenLastCalledWith(1, '', 0, expect.any(Function));
    })
});
