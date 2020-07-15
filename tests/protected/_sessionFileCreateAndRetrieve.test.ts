import _sessionFileCreateAndRetrieve from '../../modules/protected/_sessionFileCreateAndRetrieve';
jest.mock('fs', () => {
    return {
        accessSync: (...args) => {
            return fsMocks.accessSync.apply(this, args)
        },
        openSync: (...args) => {
            return fsMocks.openSync.apply(this, args)
        },
        mkdirSync: (...args) => {
            return fsMocks.mkdirSync.apply(this, args)
        },
        access: (...args) => {
            return fsMocks.access.apply(this, args)
        },
        readFileSync: (...args) => {
            return fsMocks.readFileSync.apply(this, args)
        },
        readFile: (...args) => {
            return fsMocks.readFile.apply(this, args)
        },
        open: (...args) => {
            return fsMocks.open.apply(this, args)
        }
    }
});
let fsMocks = {
    accessSync: (...args) => {

    },
    openSync: (...args) => {

    },
    mkdirSync: (...args) => {

    },
    access: (...args) => {

    },
    readFileSync: (...args) => {

    },
    readFile: (...args) => {

    },
    open: (...args) => {

    }
}
jest.mock('../../modules/methods/mkdirRecursive', () => {
    return {
        "default": (directory, cb) => {
            return cb({});
        }
    }
});
describe('_sessionFileCreateAndRetrieve', () => {
    it('should retrieve session and create path when path and directory does not exist', () => {
        jest.spyOn(fsMocks, 'accessSync')
            .mockImplementationOnce(() => { throw ''; })
            .mockImplementationOnce(() => { throw ''; })
            .mockImplementationOnce(() => { throw ''; })
            .mockImplementationOnce(() => { throw ''; });
        const mkDirSync = jest.spyOn(fsMocks, 'mkdirSync');
        const openSync = jest.spyOn(fsMocks, 'openSync');
        const readFileSync = jest.spyOn(fsMocks, 'readFileSync').mockImplementationOnce(() => '{}');

        const path = 'craydent/session/abcdefg';
        expect(_sessionFileCreateAndRetrieve(path, true)).toEqual({});
        expect(mkDirSync).toHaveBeenNthCalledWith(1, 'craydent/');
        expect(mkDirSync).toHaveBeenNthCalledWith(2, 'craydent/session/');
        expect(openSync).toHaveBeenCalledWith(path, 'w+');
        expect(readFileSync).toHaveBeenCalledWith(path);
    });
    it('should retrieve session and create path when path does not exist', () => {
        jest.spyOn(fsMocks, 'accessSync')
            .mockImplementationOnce(() => { throw ''; })
            .mockImplementationOnce(() => { });
        const openSync = jest.spyOn(fsMocks, 'openSync');
        const readFileSync = jest.spyOn(fsMocks, 'readFileSync').mockImplementationOnce(() => '');

        const path = 'craydent/session/abcdefg';
        expect(_sessionFileCreateAndRetrieve(path, true)).toEqual({});
        expect(openSync).toHaveBeenCalledWith(path, 'w+');
        expect(readFileSync).toHaveBeenCalledWith(path);
    });
    it('should retrieve session and create path when path does not exist using async', () => {
        jest.spyOn(fsMocks, 'access')
            .mockImplementationOnce((path, callback) => { callback(null); });
        const readFile = jest.spyOn(fsMocks, 'readFile')
            .mockImplementationOnce((path, callback) => { callback(null, '{}'); });

        const path = 'craydent/session/abcdefg';
        expect(_sessionFileCreateAndRetrieve(path, false)).toEqual(new Promise(() => { }));
    });
    it('should retrieve session and retrieve session using async with callback', () => {
        jest.spyOn(fsMocks, 'access')
            .mockImplementationOnce((path, cb) => { cb(null); });
        jest.spyOn(fsMocks, 'readFile')
            .mockImplementationOnce((path, cb) => { cb(null, '{}'); });

        const path = 'craydent/session/abcdefg';
        const callback = jest.fn();
        expect(_sessionFileCreateAndRetrieve(path, false, callback)).toEqual(new Promise(() => { }));
        expect(callback).toHaveBeenCalledWith({})
    });
    it('should create path when path does not exist using async with callback', () => {
        jest.spyOn(fsMocks, 'access')
            .mockImplementationOnce((path, cb) => { cb(true); });
        jest.spyOn(fsMocks, 'readFile')
            .mockImplementationOnce((path, cb) => { cb(null, '{}'); });
        jest.spyOn(fsMocks, 'open')
            .mockImplementationOnce((directory, mode, cb) => {
                return cb();
            });

        const path = 'craydent/session/abcdefg';
        const callback = jest.fn();
        expect(_sessionFileCreateAndRetrieve(path, false, callback)).toEqual(new Promise(() => { }));
        expect(callback).toHaveBeenCalledWith({})
    });
});