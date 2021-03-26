import mkdirRecursive from '../../compiled/transformedMinor/craydent.mkdirrecursive';
import * as path from 'path';
jest.mock('fs', () => {
    return {
        "access": (...args: any[]) => access.apply(this, args as any),
        "mkdir": (...args: any[]) => mkdir.apply(this, args as any)
    }
});
jest.mock('path', () => {
    return {};
});
jest.mock('process', () => ({ cwd }));
let access = (path: any, cb: any) => { };
let mkdir = (path: any, cb: any) => { };
let cwd = () => { };
describe('mkdirRecursive linux based', () => {
    beforeEach(() => {
        access = () => { };
        mkdir = () => { };
        (path as any).sep = "/";
        (process as any).cwd = jest.fn()
            .mockImplementation(() => '/root')
    });
    it('should handle blank path', async () => {
        expect(await mkdirRecursive('')).toBe('');

    });
    it('should handle existing path', async () => {
        access = jest.fn((path: any, cb: any) => cb(null));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('/path')).toBe('/path');
        expect(mkdir).not.toHaveBeenCalled();

    });
    it('should handle when path creation fails', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb('failed'));
        expect(await mkdirRecursive('/path')).toBe('failed');

    });
    it('should make directories using absolute path', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('/path')).toBe('/path');

    });
    it('should make directories using relative path', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('./path')).toBe(`/./path`);

    });
});
describe('mkdirRecursive windows based', () => {
    beforeEach(() => {
        access = () => { };
        mkdir = () => { };
        (path as any).sep = "\\";
        (process as any).cwd = jest.fn()
            .mockImplementation(() => 'C:\\')
    });
    it('should handle blank path', async () => {
        expect(await mkdirRecursive('')).toBe('');

    });
    it('should handle existing path', async () => {
        access = jest.fn((path: any, cb: any) => cb(null));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('C:\\path')).toBe('\\path');
        expect(mkdir).not.toHaveBeenCalled();

    });
    it('should handle when path creation fails', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb('failed'));
        expect(await mkdirRecursive('C:\\path')).toBe('failed');

    });
    it('should make directories using absolute path', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('C:\\path')).toBe('\\path');

    });
    it('should make directories using relative path', async () => {
        access = jest.fn((path: any, cb: any) => cb(true));
        mkdir = jest.fn((path: any, cb: any) => cb(null));
        expect(await mkdirRecursive('\\path')).toBe('\\path');

    });
});