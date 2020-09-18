import $c from '../../transformedMajor/fs';
import * as fs from 'fs';
jest.mock('../../transformedMajor/fs/protected/_fsHelper', () => {
    return {
        "default": (...args) => _fsHelper.apply(this, args)

    }
});
let _fsHelper = (...args) => { };
describe('FS', function () {
    beforeEach(() => {
        _fsHelper = jest.fn(() => Promise.resolve());
    });
    it('access', function () {
        expect($c.access('./test.json', fs.constants.F_OK)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('access','./test.json', fs.constants.F_OK);
    })

    it('appendFile', function () {
        expect($c.appendFile('./test.txt', 'test')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('appendFile','./test.txt', 'test');
    })

    it('chmod', function () {
        expect($c.chmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('chmod','./test.txt', 777);
    })

    it('chown', function () {
        expect($c.chown('./test.txt', 501, 20)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('chown','./test.txt', 501, 20);
    })

    it('close', function () {
        expect($c.close(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('close',1);
    })

    // it('fchmod',function(){
    //     expect($c.fchmod).toEqual(new Promise(function(){}));
    // })

    // it('fchown',function(){
    //     expect($c.fchown).toEqual(new Promise(function(){}));
    // })

    it('fdatasync', function () {
        expect($c.fdatasync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fdatasync',1);
    })

    it('fstat', function () {
        expect($c.fstat(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fstat',1);
    })

    it('fsync', function () {
        expect($c.fsync(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('fsync',1);
    })

    it('ftruncate', function () {
        expect($c.ftruncate(1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('ftruncate',1);
    })

    // it('futimes',function(){
    //     expect($c.futimes).toEqual(new Promise(function(){}));
    // })

    it('lchmod', function () {
        expect($c.lchmod('./test.txt', 777)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lchmod','./test.txt', 777);
    })

    it('lchown', function () {
        expect($c.lchown('./test.txt', 1, 1)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lchown','./test.txt', 1, 1);
    })

    // it('link',function(){
    //     expect($c.link).toEqual(new Promise(function(){}));
    // })

    it('lstat', function () {
        expect($c.lstat('./test.xt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('lstat','./test.xt');
    })

    it('mkdir', function () {
        expect($c.mkdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('mkdir','./temp');
    })

    it('mkdtemp', function () {
        expect($c.mkdtemp('testing')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('mkdtemp','testing');
    })

    it('open', function () {
        expect($c.open('./test.txt', 'w')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('open','./test.txt', 'w');
    })

    it('read', function () {
        expect($c.read(0, [] as any, 0, 0, 0)).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('read',0, [], 0, 0, 0);
    })

    it('readdir', function () {
        expect($c.readdir('./')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readdir','./');
    })

    it('readFile', function () {
        expect($c.readFile('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readFile','./test.txt');
    })

    it('readlink', function () {
        expect($c.readlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('readlink','./test.txt');
    })

    it('realpath', function () {
        expect($c.realpath('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('realpath','./test.txt');
    })

    it('rename', function () {
        expect($c.rename('./test.txt', './test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('rename','./test.txt', './test.txt');
    })

    it('rmdir', function () {
        expect($c.rmdir('./temp')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('rmdir','./temp');
    })

    it('stat', function () {
        expect($c.stat('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('stat','./test.txt');
    })

    // it('symlink',function(){
    //     expect($c.symlink).toEqual(new Promise(function(){}));
    // })

    it('truncate', function () {
        expect($c.truncate('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('truncate','./test.txt');
    })

    it('unlink', function () {
        expect($c.unlink('./test.txt')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('unlink','./test.txt');
    })

    // it('utimes',function(){
    //     expect($c.utimes).toEqual(new Promise(function(){}));
    // })

    it('write', function () {
        expect($c.write(1, [])).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('write',1, []);
    })

    it('writeFile', function () {
        expect($c.writeFile('./test.txt', '')).toEqual(Promise.resolve());
        expect(_fsHelper).toHaveBeenCalledWith('writeFile','./test.txt', '');
    })
})