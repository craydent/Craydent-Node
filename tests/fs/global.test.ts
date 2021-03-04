const win = (global as any).window;
delete (global as any).window;
import $c from '../../compiled/transformedMajor/fs/global';
import * as fs from 'fs';

jest.mock("fs", () => {
    return {
        "access": (...args) => _fsHelper.apply(this, args),
        "appendFile": (...args) => _fsHelper.apply(this, args),
        "chmod": (...args) => _fsHelper.apply(this, args),
        "chown": (...args) => _fsHelper.apply(this, args),
        "close": (...args) => _fsHelper.apply(this, args),
        "fdatasync": (...args) => _fsHelper.apply(this, args),
        "fstat": (...args) => _fsHelper.apply(this, args),
        "fsync": (...args) => _fsHelper.apply(this, args),
        "ftruncate": (...args) => _fsHelper.apply(this, args),
        "lchmod": (...args) => _fsHelper.apply(this, args),
        "lchown": (...args) => _fsHelper.apply(this, args),
        "lstat": (...args) => _fsHelper.apply(this, args),
        "mkdir": (...args) => _fsHelper.apply(this, args),
        "mkdtemp": (...args) => _fsHelper.apply(this, args),
        "open": (...args) => _fsHelper.apply(this, args),
        "read": (...args) => _fsHelper.apply(this, args),
        "readdir": (...args) => _fsHelper.apply(this, args),
        "readFile": (...args) => _fsHelper.apply(this, args),
        "readlink": (...args) => _fsHelper.apply(this, args),
        "realpath": (...args) => _fsHelper.apply(this, args),
        "rename": (...args) => _fsHelper.apply(this, args),
        "rmdir": (...args) => _fsHelper.apply(this, args),
        "stat": (...args) => _fsHelper.apply(this, args),
        "truncate": (...args) => _fsHelper.apply(this, args),
        "unlink": (...args) => _fsHelper.apply(this, args),
        "write": (...args) => _fsHelper.apply(this, args),
        "writeFile": (...args) => _fsHelper.apply(this, args),
        "constants": { F_OK: 1 }
    }
});
$c;
let _fsHelper = (...args) => { };
describe('FS', function () {
    afterAll(() => {
        if (win) { (global as any).window = win; }
    });
    beforeEach(() => {
        _fsHelper = jest.fn(() => Promise.resolve());
    });
    it('access', function () {
        expect(access('./test.json', fs.constants.F_OK)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.json', fs.constants.F_OK, expect.any(Function));
    });

    it('appendFile', function () {
        expect(appendFile('./test.txt', 'test')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 'test', expect.any(Function));
    })

    it('chmod', function () {
        expect(chmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 777, expect.any(Function));
    })

    it('chown', function () {
        expect(chown('./test.txt', 501, 20)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 501, 20, expect.any(Function));
    })

    it('close', function () {
        expect($c.close(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    // it('fchmod',function(){
    //     expect(fchmod).toEqual(new Promise(function(){}));
    // })

    // it('fchown',function(){
    //     expect(fchown).toEqual(new Promise(function(){}));
    // })

    it('fdatasync', function () {
        expect(fdatasync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('fstat', function () {
        expect(fstat(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('fsync', function () {
        expect(fsync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('ftruncate', function () {
        expect(ftruncate(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    // it('futimes',function(){
    //     expect(futimes).toEqual(new Promise(function(){}));
    // })

    it('lchmod', function () {
        expect(lchmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 777, expect.any(Function));
    })

    it('lchown', function () {
        expect(lchown('./test.txt', 1, 1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 1, 1, expect.any(Function));
    })

    // it('link',function(){
    //     expect(link).toEqual(new Promise(function(){}));
    // })

    it('lstat', function () {
        expect(lstat('./test.xt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.xt', expect.any(Function));
    })

    it('mkdir', function () {
        expect(mkdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./temp', expect.any(Function));
    })

    it('mkdtemp', function () {
        expect(mkdtemp('testing')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('testing', expect.any(Function));
    })

    it('open', function () {
        expect(open('./test.txt', 'w')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 'w', expect.any(Function));
    })

    it('read', function () {
        expect(read(0, [] as any, 0, 0, 0)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(0, [], 0, 0, 0, expect.any(Function));
    })

    it('readdir', function () {
        expect(readdir('./')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./', expect.any(Function));
    })

    it('readFile', function () {
        expect(readFile('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('readlink', function () {
        expect(readlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('realpath', function () {
        expect(realpath('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('rename', function () {
        expect(rename('./test.txt', './test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', './test.txt', expect.any(Function));
    })

    it('rmdir', function () {
        expect(rmdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./temp', expect.any(Function));
    })

    it('stat', function () {
        expect(stat('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    // it('symlink',function(){
    //     expect(symlink).toEqual(new Promise(function(){}));
    // })

    it('truncate', function () {
        expect(truncate('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('unlink', function () {
        expect(unlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    // it('utimes',function(){
    //     expect(utimes).toEqual(new Promise(function(){}));
    // })

    it('write', function () {
        expect(write(1, [])).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, [], expect.any(Function));
    })

    it('writeFile', function () {
        expect(writeFile('./test.txt', '')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', '', expect.any(Function));
    })
})