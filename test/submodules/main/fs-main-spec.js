var pre = require('../_prep');
var fs = require('fs');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-fs'); }
else { $c = require('../../../index.js'); }
$c.DEBUG_MODE = true;

describe ('FS', function () {
    it('access',function(){
        expect($c.access('./test.json', fs.constants.F_OK)).toEqual(new Promise(function(){}));
    })

    it('appendFile',function(){
        expect($c.appendFile('./test.txt', 'test')).toEqual(new Promise(function(){}));
    })

    it('chmod',function(){
        expect($c.chmod('./test.txt', 777)).toEqual(new Promise(function(){}));
    })

    it('chown',function(){
        expect($c.chown('./test.txt',501, 20)).toEqual(new Promise(function(){}));
    })

    it('close',function(){
        expect($c.close(1)).toEqual(new Promise(function(){}));
    })

    // it('fchmod',function(){
    //     expect($c.fchmod).toEqual(new Promise(function(){}));
    // })

    // it('fchown',function(){
    //     expect($c.fchown).toEqual(new Promise(function(){}));
    // })

    it('fdatasync',function(){
        expect($c.fdatasync(1)).toEqual(new Promise(function(){}));
    })

    it('fstat',function(){
        expect($c.fstat(1)).toEqual(new Promise(function(){}));
    })

    it('fsync',function(){
        expect($c.fsync(1)).toEqual(new Promise(function(){}));
    })

    it('ftruncate',function(){
        expect($c.ftruncate(1)).toEqual(new Promise(function(){}));
    })

    // it('futimes',function(){
    //     expect($c.futimes).toEqual(new Promise(function(){}));
    // })

    it('lchmod',function(){
        expect($c.lchmod('./test.txt', 777)).toEqual(new Promise(function(){}));
    })

    it('lchown',function(){
        expect($c.lchown('./test.txt','cinada', 'admin')).toEqual(new Promise(function(){}));
    })

    // it('link',function(){
    //     expect($c.link).toEqual(new Promise(function(){}));
    // })

    it('lstat',function(){
        expect($c.lstat('./test.xt')).toEqual(new Promise(function(){}));
    })

    it('mkdir',function(){
        expect($c.mkdir('./temp')).toEqual(new Promise(function(){}));
    })

    it('mkdtemp',function(){
        expect($c.mkdtemp('testing')).toEqual(new Promise(function(){}));
    })

    it('open',function(){
        expect($c.open('./test.txt','w')).toEqual(new Promise(function(){}));
    })

    it('read',function(){
        expect($c.read(0,[],0,0,0)).toEqual(new Promise(function(){}));
    })

    it('readdir',function(){
        expect($c.readdir('./')).toEqual(new Promise(function(){}));
    })

    it('readFile',function(){
        expect($c.readFile('./test.txt')).toEqual(new Promise(function(){}));
    })

    it('readlink',function(){
        expect($c.readlink('./test.txt')).toEqual(new Promise(function(){}));
    })

    it('realpath',function(){
        expect($c.realpath('./test.txt')).toEqual(new Promise(function(){}));
    })

    it('rename',function(){
        expect($c.rename('./test.txt','./test.txt')).toEqual(new Promise(function(){}));
    })

    it('rmdir',function(){
        expect($c.rmdir('./temp')).toEqual(new Promise(function(){}));
    })

    it('stat',function(){
        expect($c.stat('./test.txt')).toEqual(new Promise(function(){}));
    })

    // it('symlink',function(){
    //     expect($c.symlink).toEqual(new Promise(function(){}));
    // })

    it('truncate',function(){
        expect($c.truncate('./test.txt')).toEqual(new Promise(function(){}));
    })

    it('unlink',function(){
        expect($c.unlink('./test.txt')).toEqual(new Promise(function(){}));
    })

    // it('utimes',function(){
    //     expect($c.utimes).toEqual(new Promise(function(){}));
    // })

    it('write',function(){
        expect($c.write(1,[])).toEqual(new Promise(function(){}));
    })

    it('writeFile',function(){
        expect($c.writeFile('./test.txt','')).toEqual(new Promise(function(){}));
    })
})