<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-typeof');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-typeof/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-typeof/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [TypeOf](#markdown-header-typeof)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| ERROR_TYPES (Array) |MODULES_LOADED (Object) |VERSION (String) |


## Methods

<a name='markdown-header-typeof'></a>
## TypeOf

*** 
#### _isArray_ 
***

**Info:** Object class extension to check if object is an array

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isAsync_ 
***

**Info:** Object class extension to check if object is a async function

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isBetween_ 
***

**Info:** Object class extension to check if object is between lower and upper bounds

**Return:** (Bool)

**Parameters:**

>* lowerBound: (any) Lower bound comparison
>* upperBound: (any) Upper bound comparison
>* inclusive?: (Bool) Flag to include give bounds

**Overloads:**

>None

*** 
#### _isBoolean_ 
***

**Info:** Object class extension to check if object is a boolean

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isDate_ 
***

**Info:** Object class extension to check if object is a date

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isDomElement_ 
***

**Info:** Object class extension to check if object is a DOM element

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isError_ 
***

**Info:** Object class extension to check if object is an error object

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isEmpty_ 
***

**Info:** Object class extension to check if it is empty

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isFloat_ 
***

**Info:** Object class extension to check if object is a float

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isFunction_ 
***

**Info:** Object class extension to check if object is a function

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isGenerator_ 
***

**Info:** Object class extension to check if object is a generator function

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isGeolocation_ 
***

**Info:** Object class extension to check if object is a geolocation

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isInt_ 
***

**Info:** Object class extension to check if object is an integer

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isNull_ 
***

**Info:** Check if a value is Null

**Return:** (Bool|any)

**Parameters:**

>* value: (any) Value to check

**Overloads:**

>Parameters
>* value: (any) Value to check
>* defaultValue: (any) Value to return if null

*** 
#### _isNullOrEmpty_ 
***

**Info:** Object class extension to check if object is a null or empty (object with no props, empty string, etc)

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isNumber_ 
***

**Info:** Object class extension to check if object is a number

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isObject_ 
***

**Info:** Object class extension to check if object is an object

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isPromise_ 
***

**Info:** Object class extension to check if object is a promise object

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isRegExp_ 
***

**Info:** Object class extension to check if object is a RegExp

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isString_ 
***

**Info:** Object class extension to check if object is a string

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>