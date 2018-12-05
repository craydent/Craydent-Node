<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-fs');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-fs/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-fs/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [FS](#markdown-header-fs)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |


## Methods

<a name='markdown-header-fs'></a>
## FS

*** 
#### _access_ 
***

**Info:** A promisified version of access.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _appendFile_ 
***

**Info:** A promisified version of appendFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _chmod_ 
***

**Info:** A promisified version of chmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _chown_ 
***

**Info:** A promisified version of chown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _close_ 
***

**Info:** A promisified version of close.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fchmod_ 
***

**Info:** A promisified version of fchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fchown_ 
***

**Info:** A promisified version of fchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fdatasync_ 
***

**Info:** A promisified version of fdatasync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fstat_ 
***

**Info:** A promisified version of fstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fsync_ 
***

**Info:** A promisified version of fsync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _ftruncate_ 
***

**Info:** A promisified version of ftruncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _futimes_ 
***

**Info:** A promisified version of futimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lchmod_ 
***

**Info:** A promisified version of lchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lchown_ 
***

**Info:** A promisified version of lchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _link_ 
***

**Info:** A promisified version of link.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lstat_ 
***

**Info:** A promisified version of lstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _mkdir_ 
***

**Info:** A promisified version of mkdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _mkdtemp_ 
***

**Info:** A promisified version of mkdtemp.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _open_ 
***

**Info:** A promisified version of open.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _read_ 
***

**Info:** A promisified version of read.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readFile_ 
***

**Info:** A promisified version of readFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readdir_ 
***

**Info:** A promisified version of readdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readlink_ 
***

**Info:** A promisified version of readlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _realpath_ 
***

**Info:** A promisified version of realpath.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _rename_ 
***

**Info:** A promisified version of rename.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _rmdir_ 
***

**Info:** A promisified version of rmdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _stat_ 
***

**Info:** A promisified version of stat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _symlink_ 
***

**Info:** A promisified version of symlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _truncate_ 
***

**Info:** A promisified version of truncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _unlink_ 
***

**Info:** A promisified version of unlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _utimes_ 
***

**Info:** A promisified version of utimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _write_ 
***

**Info:** A promisified version of write.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _writeFile_ 
***

**Info:** A promisified version of writeFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>