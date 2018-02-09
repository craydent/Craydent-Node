<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.5
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-class');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-class/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-class/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Class](#markdown-header-class)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |LOCAL_IP (String) |PUBLIC_IP (String) |
ERROR_TYPES (Array) |MODULES_LOADED (Object) |VERSION (String) |


## Methods

<a name='markdown-header-class'></a>
## Class

*** 
#### _Benchmarker_ 
***

**Info:** Class used to measure the run time of code

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _Cursor_ 
***

**Info:** Cursor class to facilitate iteration

**Return:** (Cursor)

**Parameters:**

* records: (Array) Array used to create the iterator to iterate each item

**Overloads:**

1)

* records: (Object) Object used to create the iterator to iterate each property

*** 
#### _OrderedList_ 
***

**Info:** Collection class that filters out duplicate values and maintains an ordered list

**Return:** (OrderedList)

**Parameters:**

* None

**Overloads:**

1)

* records: (Array) Array used to create the initial items in the ordered list

2)

* records: (Array) Array used to create the initial items in the ordered list
* sorter: (Function) Function for sorting logic

*** 
#### _Queue_ 
***

**Info:** Collection class that follows FIFO

**Return:** (Queue)

**Parameters:**

* records: (Array) Array used to create the iterator to iterate each item

**Overloads:**

* None

*** 
#### _Set_ 
***

**Info:** Collection class that filters out duplicate values

**Return:** (Set)

**Parameters:**

* records: (Array) Array used to create the iterator to iterate each item

**Overloads:**

* None

