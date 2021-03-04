import * as IAccess from '../methods/access';
import * as IAppendFile from '../methods/appendfile';
import * as IChmod from '../methods/chmod';
import * as IChown from '../methods/chown';
import * as IClose from '../methods/close';
import * as ICopyFile from '../methods/copyfile';
import * as IFchmod from '../methods/fchmod';
import * as IFchown from '../methods/fchown';
import * as IFdatasync from '../methods/fdatasync';
import * as IFstat from '../methods/fstat';
import * as IFsync from '../methods/fsync';
import * as IFtruncate from '../methods/ftruncate';
import * as IFutimes from '../methods/futimes';
import * as ILchmod from '../methods/lchmod';
import * as ILchown from '../methods/lchown';
import * as ILink from '../methods/link';
import * as ILstat from '../methods/lstat';
import * as IMkdir from '../methods/mkdir';
import * as IMkdtemp from '../methods/mkdtemp';
import * as IOpen from '../methods/open';
import * as IRead from '../methods/read';
import * as IReaddir from '../methods/readdir';
import * as IReadFile from '../methods/readfile';
import * as IReadlink from '../methods/readlink';
import * as IRealpath from '../methods/realpath';
import * as IRename from '../methods/rename';
import * as IRmdir from '../methods/rmdir';
import * as IStat from '../methods/stat';
import * as ISymlink from '../methods/symlink';
import * as ITruncate from '../methods/truncate';
import * as IUnlink from '../methods/unlink';
import * as IUtimes from '../methods/utimes';
import * as IWrite from '../methods/write';
import * as IWriteFile from '../methods/writefile';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const access: typeof IAccess.default = require('../methods/access').default;
const appendFile: typeof IAppendFile.default = require('../methods/appendfile').default;
const chmod: typeof IChmod.default = require('../methods/chmod').default;
const chown: typeof IChown.default = require('../methods/chown').default;
const close: typeof IClose.default = require('../methods/close').default;
const copyFile: typeof ICopyFile.default = require('../methods/copyfile').default;
const fchmod: typeof IFchmod.default = require('../methods/fchmod').default;
const fchown: typeof IFchown.default = require('../methods/fchown').default;
const fdatasync: typeof IFdatasync.default = require('../methods/fdatasync').default;
const fstat: typeof IFstat.default = require('../methods/fstat').default;
const fsync: typeof IFsync.default = require('../methods/fsync').default;
const ftruncate: typeof IFtruncate.default = require('../methods/ftruncate').default;
const futimes: typeof IFutimes.default = require('../methods/futimes').default;
const lchmod: typeof ILchmod.default = require('../methods/lchmod').default;
const lchown: typeof ILchown.default = require('../methods/lchown').default;
const link: typeof ILink.default = require('../methods/link').default;
const lstat: typeof ILstat.default = require('../methods/lstat').default;
const mkdir: typeof IMkdir.default = require('../methods/mkdir').default;
const mkdtemp: typeof IMkdtemp.default = require('../methods/mkdtemp').default;
const open: typeof IOpen.default = require('../methods/open').default;
const read: typeof IRead.default = require('../methods/read').default;
const readdir: typeof IReaddir.default = require('../methods/readdir').default;
const readFile: typeof IReadFile.default = require('../methods/readfile').default;
const readlink: typeof IReadlink.default = require('../methods/readlink').default;
const realpath: typeof IRealpath.default = require('../methods/realpath').default;
const rename: typeof IRename.default = require('../methods/rename').default;
const rmdir: typeof IRmdir.default = require('../methods/rmdir').default;
const stat: typeof IStat.default = require('../methods/stat').default;
const symlink: typeof ISymlink.default = require('../methods/symlink').default;
const truncate: typeof ITruncate.default = require('../methods/truncate').default;
const unlink: typeof IUnlink.default = require('../methods/unlink').default;
const utimes: typeof IUtimes.default = require('../methods/utimes').default;
const write: typeof IWrite.default = require('../methods/write').default;
const writeFile: typeof IWriteFile.default = require('../methods/writefile').default;
//#endregion

export {
    access,
    appendFile,
    chmod,
    chown,
    close,
    copyFile,
    fchmod,
    fchown,
    fdatasync,
    fstat,
    fsync,
    ftruncate,
    futimes,
    lchmod,
    lchown,
    link,
    lstat,
    mkdir,
    mkdtemp,
    open,
    read,
    readdir,
    readFile,
    readlink,
    realpath,
    rename,
    rmdir,
    stat,
    symlink,
    truncate,
    unlink,
    utimes,
    write,
    writeFile
}
