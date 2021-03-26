import $c from '../../compiled/transformedMajor/fs';
import * as fs from 'fs';

jest.mock("fs", () => {
    return {
        "access": (...args: any[]) => _fsHelper.apply(this, args),
        "appendFile": (...args: any[]) => _fsHelper.apply(this, args),
        "chmod": (...args: any[]) => _fsHelper.apply(this, args),
        "chown": (...args: any[]) => _fsHelper.apply(this, args),
        "close": (...args: any[]) => _fsHelper.apply(this, args),
        "fdatasync": (...args: any[]) => _fsHelper.apply(this, args),
        "fstat": (...args: any[]) => _fsHelper.apply(this, args),
        "fsync": (...args: any[]) => _fsHelper.apply(this, args),
        "ftruncate": (...args: any[]) => _fsHelper.apply(this, args),
        "lchmod": (...args: any[]) => _fsHelper.apply(this, args),
        "lchown": (...args: any[]) => _fsHelper.apply(this, args),
        "lstat": (...args: any[]) => _fsHelper.apply(this, args),
        "mkdir": (...args: any[]) => _fsHelper.apply(this, args),
        "mkdtemp": (...args: any[]) => _fsHelper.apply(this, args),
        "open": (...args: any[]) => _fsHelper.apply(this, args),
        "read": (...args: any[]) => _fsHelper.apply(this, args),
        "readdir": (...args: any[]) => _fsHelper.apply(this, args),
        "readFile": (...args: any[]) => _fsHelper.apply(this, args),
        "readlink": (...args: any[]) => _fsHelper.apply(this, args),
        "realpath": (...args: any[]) => _fsHelper.apply(this, args),
        "rename": (...args: any[]) => _fsHelper.apply(this, args),
        "rmdir": (...args: any[]) => _fsHelper.apply(this, args),
        "stat": (...args: any[]) => _fsHelper.apply(this, args),
        "truncate": (...args: any[]) => _fsHelper.apply(this, args),
        "unlink": (...args: any[]) => _fsHelper.apply(this, args),
        "write": (...args: any[]) => _fsHelper.apply(this, args),
        "writeFile": (...args: any[]) => _fsHelper.apply(this, args),
        "constants": { F_OK: 1 }
    }
});
let _fsHelper = (...args: any[]) => { };
describe('FS', function () {
    beforeEach(() => {
        _fsHelper = jest.fn(() => Promise.resolve());
    });
    it('access', function () {
        expect($c.access('./test.json', fs.constants.F_OK)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.json', fs.constants.F_OK, expect.any(Function));
    })

    it('appendFile', function () {
        expect($c.appendFile('./test.txt', 'test')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 'test', expect.any(Function));
    })

    it('chmod', function () {
        expect($c.chmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 777, expect.any(Function));
    })

    it('chown', function () {
        expect($c.chown('./test.txt', 501, 20)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 501, 20, expect.any(Function));
    })

    it('close', function () {
        expect($c.close(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    // it('fchmod',function(){
    //     expect($c.fchmod).toEqual(new Promise(function(){}));
    // })

    // it('fchown',function(){
    //     expect($c.fchown).toEqual(new Promise(function(){}));
    // })

    it('fdatasync', function () {
        expect($c.fdatasync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('fstat', function () {
        expect($c.fstat(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('fsync', function () {
        expect($c.fsync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    it('ftruncate', function () {
        expect($c.ftruncate(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, expect.any(Function));
    })

    // it('futimes',function(){
    //     expect($c.futimes).toEqual(new Promise(function(){}));
    // })

    it('lchmod', function () {
        expect($c.lchmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 777, expect.any(Function));
    })

    it('lchown', function () {
        expect($c.lchown('./test.txt', 1, 1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 1, 1, expect.any(Function));
    })

    // it('link',function(){
    //     expect($c.link).toEqual(new Promise(function(){}));
    // })

    it('lstat', function () {
        expect($c.lstat('./test.xt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.xt', expect.any(Function));
    })

    it('mkdir', function () {
        expect($c.mkdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./temp', expect.any(Function));
    })

    it('mkdtemp', function () {
        expect($c.mkdtemp('testing')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('testing', expect.any(Function));
    })

    it('open', function () {
        expect($c.open('./test.txt', 'w')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', 'w', expect.any(Function));
    })

    it('read', function () {
        expect($c.read(0, [] as any, 0, 0, 0)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(0, [], 0, 0, 0, expect.any(Function));
    })

    it('readdir', function () {
        expect($c.readdir('./')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./', expect.any(Function));
    })

    it('readFile', function () {
        expect($c.readFile('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('readlink', function () {
        expect($c.readlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('realpath', function () {
        expect($c.realpath('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('rename', function () {
        expect($c.rename('./test.txt', './test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', './test.txt', expect.any(Function));
    })

    it('rmdir', function () {
        expect($c.rmdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./temp', expect.any(Function));
    })

    it('stat', function () {
        expect($c.stat('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    // it('symlink',function(){
    //     expect($c.symlink).toEqual(new Promise(function(){}));
    // })

    it('truncate', function () {
        expect($c.truncate('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    it('unlink', function () {
        expect($c.unlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', expect.any(Function));
    })

    // it('utimes',function(){
    //     expect($c.utimes).toEqual(new Promise(function(){}));
    // })

    it('write', function () {
        expect($c.write(1, [])).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith(1, [], expect.any(Function));
    })

    it('writeFile', function () {
        expect($c.writeFile('./test.txt', '')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('./test.txt', '', expect.any(Function));
    })
})