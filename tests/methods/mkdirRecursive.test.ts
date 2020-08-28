import mkdirRecursive from '../../modules/methods/mkdirRecursive';
jest.mock('fs', () => {
    return {
        "exists": (...args) => exists.apply(this, args),
        "mkdir": (...args) => mkdir.apply(this, args)
    }
});
let exists = (path, cb) => { };
let mkdir = (path, cb) => { };
describe('mkdirRecursive', () => {
    beforeEach(() => {
        exists = () => { };
        mkdir = () => { };
    });
    it('should handle blank path', async () => {
        expect(await mkdirRecursive('')).toBe('');

    });
    it('should handle existing path', async () => {
        exists = jest.fn((path, cb) => cb(true));
        mkdir = jest.fn((path, cb) => cb(null));
        expect(await mkdirRecursive('/path')).toBe('/path');
        expect(mkdir).not.toHaveBeenCalled();

    });
    it('should handle when path creation fails', async () => {
        exists = jest.fn((path, cb) => cb(null));
        mkdir = jest.fn((path, cb) => cb('failed'));
        expect(await mkdirRecursive('/path')).toBe('failed');

    });
    it('should make directories using absolute path', async () => {
        exists = jest.fn((path, cb) => cb(null));
        mkdir = jest.fn((path, cb) => cb(null));
        expect(await mkdirRecursive('/path')).toBe('/path');

    });
    it('should make directories using absolute path', async () => {
        exists = jest.fn((path, cb) => cb(null));
        mkdir = jest.fn((path, cb) => cb(null));
        expect(await mkdirRecursive('/path')).toBe('/path');

    });
});