<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.5
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
| DEBUG_MODE (Boolean) |LOCAL_IP (String) |PUBLIC_IP (String) |
ERROR_TYPES (Array) |MODULES_LOADED (Object) |VERSION (String) |


## Methods

<a name='markdown-header-function'></a>
## Function

*** 
#### _catch_ 
***

**Info:** Function listener to register the catch event

**Return:** (String)

**Parameters:**

* func: (Function) Function to call on emit

**Overloads:**

* None

*** 
#### _emit_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

* event: Event to trigger.

**Overloads:**

1)

* event: Event to trigger.
* infinite: any number of arguments can be passed and will be applied to listening functions.

*** 
#### _equals_ 
***

**Info:** Object class extension to check if object values are equal

**Return:** (Bool)

**Parameters:**

* compare: (Object) Object to compare against

**Overloads:**

1)

* compare: (Object) Object to compare against
* props: (String[]) Array of property values to compare against

*** 
#### _extends_ 
***

**Info:** Function class extension to extend another class

**Return:** (Function)

**Parameters:**

* extendee: (Object) Class to extend

**Overloads:**

1)

* extendee: (Object) Class to extend
* inheritAsOwn: (Boolean) Flag to inherit and for values hasOwnProperty to be true.

*** 
#### _getName_ 
***

**Info:** Function class extension to get the name of the function

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _getParameters_ 
***

**Info:** Function class extension to get parameters in definition

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _getValue_ 
***

**Info:** Object class extension to retrieve value of an object property

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* dflt: (Mixed) Default value to return if context is not a function

2)

* args: (Mixed[]) An array of arguments to pass to context when it is a function
* dflt: (Mixed) Default value to return if context is not a function

*** 
#### _next_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

**Overloads:**

* None

*** 
#### _on_ 
***

**Info:** Function listener to register events

**Return:** (String)

**Parameters:**

* event: (String) Event to listen on and invoked on emit
* func: (Function) Function to call on emit

**Overloads:**

* None

*** 
#### _toPromise_ 
***

**Info:** Function listener to register events

**Return:** (String)

**Parameters:**

* event: (String) Event to listen on and invoked on emit
* func: (Function) Function to call on emit

**Overloads:**

* None

*** 
#### _then_ 
***

**Info:** Function listener to register the then event

**Return:** (String)

**Parameters:**

* func: (Function) Function to call on emit

**Overloads:**

* None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>