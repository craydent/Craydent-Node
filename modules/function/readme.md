<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.15.2
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-function');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-function/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-function/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Function](#markdown-header-function)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| CONSOLE_COLORS (Object) |LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |
ERROR_TYPES (Array) |PUBLIC_IP (String) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Object) |RESPONSES (Object) |


## Methods

<a name='markdown-header-function'></a>
## Function

*** 
#### _emit_ 
***

**Info:** Call the next function(s) in queue

**Return:** (Array<TResult>)

**Parameters:**

>* event: (String) Event to trigger.
>* ...infinite: (any) any number of arguments can be passed and will be applied to listening functions as arguments.

**Overloads:**

>None

*** 
#### _next_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

>* ...infinite: (any) any number of arguments can be passed.

**Overloads:**

>None

*** 
#### _on_ 
***

**Info:** Function listener to register events

**Return:** (Function)

**Parameters:**

>* event: (String) Event to listen on and invoked on emit
>* func: (Function) Function to call on emit

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/function)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/function)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/function)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>