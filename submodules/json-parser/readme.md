<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-json-parser');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-json-parser/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-json-parser/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [JSON Parser](#markdown-header-json-parser)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |PUBLIC_IP (String) |VERSION (String) |
LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |


## Methods

<a name='markdown-header-json-parser'></a>
## JSON Parser

*** 
#### _parseAdvanced_ 
***

**Info:** JSON Parser that can handle types and refs

**Return:** (Object)

**Parameters:**

>* text: (String) A valid JSON string.
>* reviver?: (Reviver) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.
>* values?: (Object) Key/value pairs to be used to replace template variables defined in the json.

**Overloads:**

>None

*** 
#### _stringifyAdvanced_ 
***

**Info:** JSON Parser that can handle types and refs

**Return:** (String)

**Parameters:**

>* json: (Object) A JavaScript value, usually an object or array, to be converted.
>* replacer?: (Replacer) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is.
>* space?: (String|Integer) Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>