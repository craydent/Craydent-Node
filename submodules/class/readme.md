<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
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
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |


## Methods

<a name='markdown-header-class'></a>
## Class

*** 
#### _Benchmarker_ 
***

**Info:** Class used to measure the run time of code

**Return:** (IBenchmarker)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _Cursor_ 
***

**Info:** Cursor class to facilitate iteration

**Return:** (ICursor<T>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>Parameters
>* records: (Object) Object used to create the iterator to iterate each property

*** 
#### _OrderedList_ 
***

**Info:** Collection class that filters out duplicate values and maintains an ordered list

**Return:** (IOrderedList<T>)

**Parameters:**

>None

**Overloads:**

>Parameters
>* records: (Array<T>) Array used to create the initial items in the ordered list
>* sorter?: (SortIterator<T>) Function for sorting logic

*** 
#### _Queue_ 
***

**Info:** Collection class that follows FIFO

**Return:** (IQueue<T>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>None

*** 
#### _Set_ 
***

**Info:** Collection class that filters out duplicate values

**Return:** (ISet<T, TResult>)

**Parameters:**

>* records: (Array<T>) Array used to create the iterator to iterate each item

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>