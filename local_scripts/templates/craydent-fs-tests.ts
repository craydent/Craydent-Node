import * as $c from '@craydent/craydent-fs/noConflict';
var fs = require('fs');

// $c.access
{
$c.access('./test.json', fs.constants.F_OK); // $ExpectType object
}

// $c.appendFile
{
$c.appendFile('./test.txt', 'test'); // $ExpectType object
}

// $c.chmod
{
$c.chmod('./test.txt', 777); // $ExpectType object
}

// $c.chown
{
$c.chown('./test.txt',501, 20); // $ExpectType object
}

// $c.close
{
$c.close(1); // $ExpectType object
}

// $c.fdatasync
{
$c.fdatasync(1); // $ExpectType object
}

// $c.fstat
{
$c.fstat(1); // $ExpectType object
}

// $c.fsync
{
$c.fsync(1); // $ExpectType object
}

// $c.ftruncate
{
$c.ftruncate(1); // $ExpectType object
}

// $c.lchmod
{
$c.lchmod('./test.txt', 777); // $ExpectType object
}

// $c.lchown
{
$c.lchown('./test.txt','cinada', 'admin'); // $ExpectType object
}

// $c.lstat
{
$c.lstat('./test.xt'); // $ExpectType object
}

// $c.mkdir
{
$c.mkdir('./temp'); // $ExpectType object
}

// $c.mkdtemp
{
$c.mkdtemp('testing'); // $ExpectType object
}

// $c.open
{
$c.open('./test.txt','w'); // $ExpectType object
}

// $c.read
{
$c.read(0,[],0,0,0); // $ExpectType object
}

// $c.readdir
{
$c.readdir('./'); // $ExpectType object
}

// $c.readFile
{
$c.readFile('./test.txt'); // $ExpectType object
}

// $c.readlink
{
$c.readlink('./test.txt'); // $ExpectType object
}

// $c.realpath
{
$c.realpath('./test.txt'); // $ExpectType object
}

// $c.rename
{
$c.rename('./test.txt','./test.txt'); // $ExpectType object
}

// $c.rmdir
{
$c.rmdir('./temp'); // $ExpectType object
}

// $c.stat
{
$c.stat('./test.txt'); // $ExpectType object
}

// $c.truncate
{
$c.truncate('./test.txt'); // $ExpectType object
}

// $c.unlink
{
$c.unlink('./test.txt'); // $ExpectType object
}

// $c.write
{
$c.write(1,[]); // $ExpectType object
}

// $c.writeFile
{
$c.writeFile('./test.txt',''); // $ExpectType object
}

