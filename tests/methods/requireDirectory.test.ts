const win = (global as any).window;
delete (global as any).window;
import requireDirectory from '../../compiled/transformedMinor/craydent.requiredirectory';

jest.mock('fs', () => {
    return {
        "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
        "statSync": (...args: any[]) => statSync.apply(this, args as any),
        "readdir": (...args: any[]) => readdir.apply(this, args as any),
        "stat": (...args: any[]) => stat.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.absolutepath', () => {
    return {
        "default": (...args: any[]) => absolutePath.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.include', () => {
    return {
        "default": (...args: any[]) => include.apply(this, args as any)
    }
});
let absolutePath = (path: any) => { }
let include = (name: any) => {
    return {
        "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
        "statSync": (...args: any[]) => statSync.apply(this, args as any),
        "readdir": (...args: any[]) => readdir.apply(this, args as any),
        "stat": (...args: any[]) => stat.apply(this, args as any)
    }
}
let statSync = (path: any) => { }
let readdirSync = (path: any) => { }
let readdir = (path: any, cb: any) => { }
let stat = (path: any, cb: any) => { }

describe('requireDirectory', () => {
    afterAll(() => {
        if (win) { (global as any).window = win; }
    });
    beforeEach(() => {
        absolutePath = () => { }
        include = () => {
            return {
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }
        }
        statSync = () => { }
        readdirSync = () => { }
        stat = () => { }
        readdir = () => { }
    });
    describe('syncronous', () => {
        it('should require all files in a directory excluding files starting with . or _', () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            statSync = jest.fn((path: any) => ({ isDirectory: () => false }));
            readdirSync = jest.fn((path: any) => ['_file', '.file', 'thefile'])

            expect(requireDirectory('./path', 's')).toEqual({
                "/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });

        it('should require all files in a directory excluding subdirectories and files starting with . or _', () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            statSync = jest.fn()
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => true }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }));
            readdirSync = jest.fn()
                .mockImplementationOnce((path: any) => ['_file', '.file', 'directory'])
                .mockImplementationOnce((path: any) => ['thefile']);

            expect(requireDirectory('./path', 's')).toEqual({});
        });
        it('should require all files in a directory recursively excluding files starting with . or _', () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            statSync = jest.fn()
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => true }))
                .mockImplementationOnce((path: any) => ({ isDirectory: () => false }));
            readdirSync = jest.fn()
                .mockImplementationOnce((path: any) => ['_file', '.file', 'directory'])
                .mockImplementationOnce((path: any) => ['thefile']);

            expect(requireDirectory('./path', 'sr')).toEqual({
                "/directory/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });
    });
    describe('asyncronous', () => {
        it('should require all files in a directory excluding files starting with . or _', async () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            stat = jest.fn((path: any, cb: any) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn((path: any, cb: any) => cb(null, ['_file', '.file', 'thefile']))

            expect(await requireDirectory('./path')).toEqual({
                "/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });

        it('should require all files in a directory excluding subdirectories and files starting with . or _', async () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            stat = jest.fn()
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => true }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn()
                .mockImplementationOnce((path: any, cb: any) => cb(null, ['_file', '.file', 'directory']))
                .mockImplementationOnce((path: any, cb: any) => cb(null, ['thefile']));

            expect(await requireDirectory('./path')).toEqual({});
        });
        it('should require all files in a directory recursively excluding files starting with . or _', async () => {
            absolutePath = jest.fn((path: any) => '/absolute/./path/');
            include = jest.fn((name: any) => ({
                "readdirSync": (...args: any[]) => readdirSync.apply(this, args as any),
                "statSync": (...args: any[]) => statSync.apply(this, args as any),
                "readdir": (...args: any[]) => readdir.apply(this, args as any),
                "stat": (...args: any[]) => stat.apply(this, args as any)
            }));
            stat = jest.fn()
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => true }))
                .mockImplementationOnce((path: any, cb: any) => cb(null, { isDirectory: () => false }));
            readdir = jest.fn()
                .mockImplementationOnce((path: any, cb: any) => cb(null, ['_file', '.file', 'directory']))
                .mockImplementationOnce((path: any, cb: any) => cb(null, ['thefile']));

            expect(await requireDirectory('./path', 'r')).toEqual({
                "/directory/thefile": {
                    "readdirSync": expect.any(Function),
                    "statSync": expect.any(Function),
                    "readdir": expect.any(Function),
                    "stat": expect.any(Function)
                }
            });
        });
    });
});