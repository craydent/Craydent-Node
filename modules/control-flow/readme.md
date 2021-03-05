<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.10.11
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-control-flow');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-control-flow/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-control-flow/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Control Flow](#markdown-header-control-flow)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| CONSOLE_COLORS (Object) |LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |
ERROR_TYPES (Array) |PUBLIC_IP (String) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Object) |RESPONSES (Object) |


## Methods

<a name='markdown-header-control-flow'></a>
## Control Flow

*** 
#### _awaitable_ 
***

**Info:** Makes a value awaitable via a Promise.

**Return:** (Promise<any>)

**Parameters:**

>* value: (AwaitableValue) Value to make awaitable

**Overloads:**

>Parameters
>* func: (Function) Function to make awaitable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make awaitable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make awaitable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make awaitable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.

*** 
#### _syncroit_ 
***

**Info:** Generator/Async based control flow to allow for more "syncronous" programing structure

**Return:** (Promise<any>)

**Parameters:**

>* func: (GeneratorFunction|AsyncFunction) function to execute

**Overloads:**

>None

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise<any>)

**Parameters:**

>* value: (YieldableValue) Value to make yieldable

**Overloads:**

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make yieldable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/control-flow)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/control-flow)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/control-flow)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>