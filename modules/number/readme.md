<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.15.1
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-number');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-number/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-number/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Number](#markdown-header-number)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| CONSOLE_COLORS (Object) |LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |
ERROR_TYPES (Array) |PUBLIC_IP (String) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Object) |RESPONSES (Object) |


## Methods

<a name='markdown-header-number'></a>
## Number

*** 
#### _aboutEqualTo_ 
***

**Info:** Number class extension to check if values are approximately equal

**Return:** (Bool)

**Parameters:**

>* compare: (Number) Number to compare
>* giveOrTake: (Number) Plus/minus value

**Overloads:**

>None

*** 
#### _contains_ 
***

**Info:** Object class extension to check if value exists

**Return:** (Bool)

**Parameters:**

>* val: (ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity

**Overloads:**

>Parameters
>* val: (ContainsValue) Value to check
>* func: (ContainsIterator<T>) Callback function used to do the comparison

>Parameters
>* val: (ContainsValue) Value to check
>* func: (ComparisonOperator) String indicating logical operator ("$lt"|"$lte"|"$gt"|"$gte"|"$mod"|"$type")

>Parameters
>* arr: (Array<TValue>) Array of values to return first matching value

*** 
#### _equals_ 
***

**Info:** Object class extension to check if object values are equal

**Return:** (Bool)

**Parameters:**

>* compare: (any) Object to compare against
>* props?: (String[]) Array of property values to compare against

**Overloads:**

>None

*** 
#### _isEven_ 
***

**Info:** Number class extension to check if number is even

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isOdd_ 
***

**Info:** Number class extension to check if number is odd

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/number)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/number)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/number)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>