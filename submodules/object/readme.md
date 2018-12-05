<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-object');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-object/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-object/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Object](#markdown-header-object)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |

<a name='markdown-header-featured'></a>
## Featured

### Object

*** 
#### _get_ 
***

**Info:** Alias to getProperty; however, it can not be used as a protoype property.

**Return:** (any)

**Parameters:**

>* object: (Object) object to get the property of
>* path: (String) Path to nested property
>* delimiter?: (Char) Separator used to parse path

**Overloads:**

>Parameters
>* object: (Object) object to get the property of
>* path: (RegExp) Regex match for the property

>Parameters
>* object: (Object) object to get the property of
>* path: (String) Path to nested property
>* options: (GetPropertyOptions) Options for ignoring inheritance, validPath, etc

>Parameters
>* object: (Object) object to get the property of
>* path: (String) Path to nested property
>* delimiter: (Char) Separator used to parse path
>* options: (GetPropertyOptions) Options for ignoring inheritance, validPath, etc

*** 
#### _getProperty_ 
***

**Info:** Object class extension to retrieve nested properties without error when property path does not exist

**Return:** (any)

**Parameters:**

>* path: (String) Path to nested property

**Overloads:**

>Parameters
>* path: (String) Path to nested property
>* delimiter: (Char) Separator used to parse path

>Parameters
>* path: (RegExp) Regex match for the property

>Parameters
>* path: (String) Path to nested property
>* options: (GetPropertyOptions) Options for ignoring inheritance, validPath, etc

>Parameters
>* path: (String) Path to nested property
>* delimiter: (Char) Separator used to parse path
>* options: (GetPropertyOptions) Options for ignoring inheritance, validPath, etc



## Methods

<a name='markdown-header-object'></a>
## Object

*** 
#### _addObjectPrototype_ 
***

**Info:** Method to extend the Object Class

**Return:** (void)

**Parameters:**

>* name: (String) name of the method to add
>* fn: (Function) method implementation

**Overloads:**

>Parameters
>* name: (String) name of the method to add
>* fn: (Function) method implementation
>* override: (Bool) if true, override the previously defined prototype

*** 
#### _changes_ 
***

**Info:** Object class extension to compare properties that have changed

**Return:** (Object)

**Parameters:**

>* compare: (any) Object to compare against

**Overloads:**

>None

*** 
#### _copyObject_ 
***

**Info:** Object class extension to copy an object excluding constructor

**Return:** (Object)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _count_ 
***

**Info:** Object class extension to count the properties in the object/elements in arrays/characters in strings.

**Return:** (Int)

**Parameters:**

>None

**Overloads:**

>Parameters
>* option: (WhereCondition) Query used in Array.where when counting elements in an Array

>Parameters
>* option: (String) Word or phrase to count in the String

>Parameters
>* option: (RegExp) Word or phrase pattern to count in the String

*** 
#### _duplicate_ 
***

**Info:** Object class extension to copy an object including constructor

**Return:** (Object)

**Parameters:**

>* recursive?: (Boolean) Flag to copy all child objects recursively

**Overloads:**

>None

*** 
#### _eachProperty_ 
***

**Info:** Object class extension to loop through all properties where hasOwnValue is true.

**Return:** (Object)

**Parameters:**

>* callback: (EachIterator<T>) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed

**Overloads:**

>None

*** 
#### _every_ 
***

**Info:** Object class extension to check property values against a function

**Return:** (Bool)

**Parameters:**

>* callback: (ObjectIterator<T, TValue, TResult>) Callback to apply to each value

**Overloads:**

>Parameters
>* callback: (ObjectIterator<T, TValue, TResult>) Callback to apply to each value
>* craydent_ctxObject: (any) Context for the callback function

*** 
#### _getClass_ 
***

**Info:** Object class extension to get the constructor name

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _getKeys_ 
***

**Info:** Object class extension to get the keys of the object

**Return:** (Array<string>)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _getValue_ 
***

**Info:** Object class extension to retrieve value of an object property

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>Parameters
>* dflt: (any) Default value to return if context is not a function

>Parameters
>* args: (any[]) An array of arguments to pass to context when it is a function
>* dflt: (any) Default value to return if context is not a function

*** 
#### _has_ 
***

**Info:** Alias to Object.prototype.hasOwnProperty

**Return:** (Boolean)

**Parameters:**

>* property: (String) Property name to check

**Overloads:**

>None

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
#### _isEmpty_ 
***

**Info:** Object class extension to check if it is empty

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isError_ 
***

**Info:** Object class extension to check if object is a boolean

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

*** 
#### _isSubset_ 
***

**Info:** Object class extension to check if item is a subset

**Return:** (Bool)

**Parameters:**

>* compare: (any) Superset to compare against

**Overloads:**

>None

*** 
#### _itemCount_ 
***

**Info:** Object class extension to count the properties in item

**Return:** (Int)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _keyOf_ 
***

**Info:** Object class extension to get the key of the give value

**Return:** (String)

**Parameters:**

>* value: (any) Value to compare against

**Overloads:**

>None

*** 
#### _map_ 
***

**Info:** Object class extension to apply method to every value

**Return:** (void)

**Parameters:**

>* callback: (ObjectIterator<T, TValue, TResult>) Callback to apply to each value
>* craydent_ctxObject?: (any) Context for the callback function

**Overloads:**

>None

*** 
#### _merge_ 
***

**Info:** Object class extension to merge objects

**Return:** (Object)

**Parameters:**

>* secondary: (Object) Object to merge with
>* condition?: (MergeEnums|MergeOptions|MergeIterator<T>) Flags to recurse, merge only shared value, clone, intersect etc

**Overloads:**

>None

*** 
#### _set_ 
***

**Info:** Alias to setProperty; however, it can not be used as a protoype property.

**Return:** (Bool)

**Parameters:**

>* object: (Object) object to add the property to
>* path: (String) Path to nested property
>* value: (any) Value to set
>* delimiter?: (Char) Separator used to parse path

**Overloads:**

>None

*** 
#### _setProperty_ 
***

**Info:** Object class extension to set nested properties creating necessary property paths

**Return:** (Bool)

**Parameters:**

>* path: (String) Path to nested property
>* value: (any) Value to set
>* delimiter?: (Char) Separator used to parse path

**Overloads:**

>None

*** 
#### _toStringAlt_ 
***

**Info:** Object class extension for an alternate way to stringify object to formatted string

**Return:** (String)

**Parameters:**

>* delimiter?: (Char) Character to separate the property from the value
>* prefix?: (Char) Character to prefix the property name
>* urlEncode?: (Bool) Flag to url encode the property and value

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>