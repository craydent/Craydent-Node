<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.3
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
* [Featured](#markdown-header-featured)
* [Control Flow](#markdown-header-control flow)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (String) |MODULES_LOADED (String) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |

<a name='markdown-header-featured'></a>
## Featured



## Methods

<a name='markdown-header-control flow'></a>
## Control Flow

*** 
#### _awaitable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to execute each array item in parallel or run each item against a generator/function in parallel

**Return:** (Promise)

**Parameters:**

* None

**Overloads:**

1)

* gen: (Generator) Generator function to apply to each item

2)

* func: (Function) Function to apply to each item

3)

* args: (Array) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

