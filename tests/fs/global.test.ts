const win = (global as any).window;
delete (global as any).window;
import $c from '../../transformedMajor/fs/global';
import * as fs from 'fs';
jest.mock('../../transformedMajor/fs/protected/_fsHelper', () => {
    return {
        "default": (...args) => _fsHelper.apply(this, args)

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
        expect(_fsHelper).toHaveBeenCalledWith('access', './test.json', fs.constants.F_OK);
    })

    it('appendFile', function () {
        expect(appendFile('./test.txt', 'test')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('appendFile', './test.txt', 'test');
    })

    it('chmod', function () {
        expect(chmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('chmod', './test.txt', 777);
    })

    it('chown', function () {
        expect(chown('./test.txt', 501, 20)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('chown', './test.txt', 501, 20);
    })

    it('close', function () {
        expect($c.close(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('close', 1);
    })

    // it('fchmod',function(){
    //     expect(fchmod).toEqual(new Promise(function(){}));
    // })

    // it('fchown',function(){
    //     expect(fchown).toEqual(new Promise(function(){}));
    // })

    it('fdatasync', function () {
        expect(fdatasync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fdatasync', 1);
    })

    it('fstat', function () {
        expect(fstat(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fstat', 1);
    })

    it('fsync', function () {
        expect(fsync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fsync', 1);
    })

    it('ftruncate', function () {
        expect(ftruncate(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('ftruncate', 1);
    })

    // it('futimes',function(){
    //     expect(futimes).toEqual(new Promise(function(){}));
    // })

    it('lchmod', function () {
        expect(lchmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lchmod', './test.txt', 777);
    })

    it('lchown', function () {
        expect(lchown('./test.txt', 1, 1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lchown', './test.txt', 1, 1);
    })

    // it('link',function(){
    //     expect(link).toEqual(new Promise(function(){}));
    // })

    it('lstat', function () {
        expect(lstat('./test.xt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lstat', './test.xt');
    })

    it('mkdir', function () {
        expect(mkdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('mkdir', './temp');
    })

    it('mkdtemp', function () {
        expect(mkdtemp('testing')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('mkdtemp', 'testing');
    })

    it('open', function () {
        expect(open('./test.txt', 'w')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('open', './test.txt', 'w');
    })

    it('read', function () {
        expect(read(0, [] as any, 0, 0, 0)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('read', 0, [], 0, 0, 0);
    })

    it('readdir', function () {
        expect(readdir('./')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readdir', './');
    })

    it('readFile', function () {
        expect(readFile('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readFile', './test.txt');
    })

    it('readlink', function () {
        expect(readlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readlink', './test.txt');
    })

    it('realpath', function () {
        expect(realpath('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('realpath', './test.txt');
    })

    it('rename', function () {
        expect(rename('./test.txt', './test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('rename', './test.txt', './test.txt');
    })

    it('rmdir', function () {
        expect(rmdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('rmdir', './temp');
    })

    it('stat', function () {
        expect(stat('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('stat', './test.txt');
    })

    // it('symlink',function(){
    //     expect(symlink).toEqual(new Promise(function(){}));
    // })

    it('truncate', function () {
        expect(truncate('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('truncate', './test.txt');
    })

    it('unlink', function () {
        expect(unlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('unlink', './test.txt');
    })

    // it('utimes',function(){
    //     expect(utimes).toEqual(new Promise(function(){}));
    // })

    it('write', function () {
        expect(write(1, [])).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('write', 1, []);
    })

    it('writeFile', function () {
        expect(writeFile('./test.txt', '')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('writeFile', './test.txt', '');
    })
})