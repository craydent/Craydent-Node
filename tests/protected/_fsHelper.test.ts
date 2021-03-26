import _fsHelper from '../../modules/protected/_fsHelper';
jest.mock('fs', () => {
    return {
        "name": (...args: any[]) => fs.apply(this, args)
    }
});
let fs = (...args: any[]) => { }
describe('_fsHelper', () => {
    it('should return error when error is not null', async () => {
        fs = jest.fn((a, b, c, cb) => { cb({ error: 1 }) });
        const result = await _fsHelper('name', 1, 2, 3);
        expect(result).toEqual({ error: 1 });
        expect(fs).toHaveBeenCalledWith(1, 2, 3, expect.any(Function));
    });
    it('should return null when data is undefined', async () => {
        fs = jest.fn((a, b, c, cb) => { cb(null) });
        const result = await _fsHelper('name', 1, 2, 3);
        expect(result).toEqual(null);
        expect(fs).toHaveBeenCalledWith(1, 2, 3, expect.any(Function));
    });
    it('should return data when buffer is not used', async () => {
        fs = jest.fn((a, b, c, cb) => { cb(null, { data: 1 }) });
        const result = await _fsHelper('name', 1, 2, 3);
        expect(result).toEqual({ data: 1 });
        expect(fs).toHaveBeenCalledWith(1, 2, 3, expect.any(Function));
    });
    it('should return data when buffer is used', async () => {
        fs = jest.fn((a, b, c, cb) => { cb(null, { data: 1 }, []) });
        const result = await _fsHelper('name', 1, 2, 3);
        expect(result).toEqual({ bytes: { data: 1 }, buffer: [] });
        expect(fs).toHaveBeenCalledWith(1, 2, 3, expect.any(Function));
    });

});