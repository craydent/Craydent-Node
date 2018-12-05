<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-utility');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-utility/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-utility/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Utility](#markdown-header-utility)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |

<a name='markdown-header-featured'></a>
## Featured

### Utility

*** 
#### _catchAll_ 
***

**Info:** Creates an catch all for exceptions in the current node service.

**Return:** (void)

**Parameters:**

>* callback: (ErrorCallback) Callback function to call when there is an uncaught exception
>* append?: (Boolean) Options to defer, ignore case, etc

**Overloads:**

>None

*** 
#### _zipit_ 
***

**Info:** Download a zip of files from file contents

**Return:** (void)

**Parameters:**

>* files: (FileObject[]) Objects containing properties name for file name and content for file content

**Overloads:**

>Parameters
>* files: (String) Name of the file
>* content: (String) contents of the file



## Methods

<a name='markdown-header-utility'></a>
## Utility

*** 
#### _ajax_ 
***

**Info:** Method to make ajax calls

**Return:** (Promise<any>)

**Parameters:**

>* url: (String) End point url
>* returnData?: (AjaxReturnType) Specifies which data to return when using Promise pattern

**Overloads:**

>Parameters
>* params: (AjaxOptions) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess
>* returnData?: (AjaxReturnType) Specifies which data to return when using Promise pattern

*** 
#### _clearCache_ 
***

**Info:** Clear a module from the require cache.

**Return:** (Bool)

**Parameters:**

>* module?: (String) Single module to remove.

**Overloads:**

>None

*** 
#### _clusterit_ 
***

**Info:** Enable clustering

**Return:** (void)

**Parameters:**

>* callback: (ClusterCallback) Method to call for Workers.  Callback is passed the cluster object as an argument.

**Overloads:**

>None

*** 
#### _cout_ 
***

**Info:** Log to console when DEBUG_MODE is true and when the console is available

**Return:** (void)

**Parameters:**

>* ...infinite: (any) any number of arguments can be passed.

**Overloads:**

>None

*** 
#### _cuid_ 
***

**Info:** Creates a Craydent/Global Unique Identifier

**Return:** (String)

**Parameters:**

>* msFormat?: (Bool) use microsoft format if true

**Overloads:**

>None

*** 
#### _error_ 
***

**Info:** User implemented place holder function to handle errors

**Return:** (void)

**Parameters:**

>* fname: (String) The function name the error was thrown
>* e: (Error) Exception object thrown

**Overloads:**

>None

*** 
#### _exclude_ 
***

**Info:** Exclude prototyping

**Return:** (void)

**Parameters:**

>* list: (String[]) Array of strings in containing the property to exclude from prototyping.

**Overloads:**

>None

*** 
#### _foo_ 
***

**Info:** Place holder function for a blank function

**Return:** (void)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _include_ 
***

**Info:** Require without erroring when module does not exist.

**Return:** (any|false)

**Parameters:**

>* path: (String) Module or Path to module.
>* refresh?: (Bool) Flag to clear cache for the specific include.

**Overloads:**

>Parameters
>* path: (String) Module or Path to module.
>* refresh: (Boolean) Flag to clear cache for the specific include.

*** 
#### _logit_ 
***

**Info:** Log to console when DEBUG_MODE is true and when the console is available

**Return:** (void)

**Parameters:**

>* ...infinite: (any) any number of arguments can be passed.

**Overloads:**

>None

*** 
#### _md5_ 
***

**Info:** MD5 encode a string.

**Return:** (String)

**Parameters:**

>* str: (String) String to encode.

**Overloads:**

>None

*** 
#### _mkdirRecursive_ 
***

**Info:** Recursively create folders.

**Return:** (void)

**Parameters:**

>* path: (String) Path to create.
>* callback: (Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors).

**Overloads:**

>None

*** 
#### _namespace_ 
***

**Info:** Adds the class to a namespace instead of the global space

**Return:** (void)

**Parameters:**

>* name: (String) Name of the namespace to add to.
>* clazz: (Class) Class to add to the given namespace
>* fn: (Function) Method to call after the class has been added to the namespace

**Overloads:**

>None

*** 
#### _noop_ 
***

**Info:** Place holder function for a blank function

**Return:** (void)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _now_ 
***

**Info:** Get the DateTime of now

**Return:** (Date|String)

**Parameters:**

>* format?: (String) Format syntax to return formatted string of now

**Overloads:**

>None

*** 
#### _parseBoolean_ 
***

**Info:** Try to parse value to a Boolean (0, 1, '0', and '1' are valid unless strict is set to true).

**Return:** (Bool|undefined)

**Parameters:**

>* value: (any) value to parse as boolean.
>* strict?: (Boolean) Disable parsing of 0, 1, '0', and '1'.

**Overloads:**

>None

*** 
#### _parseRaw_ 
***

**Info:** Creates an evaluable string

**Return:** (String)

**Parameters:**

>* value: (any) value to parse
>* skipQuotes?: (Bool) Flag to skip quotes for strings
>* saveCircular?: (Bool) Flag to save circular references

**Overloads:**

>None

*** 
#### _rand_ 
***

**Info:** Create a random number between two numbers

**Return:** (Number)

**Parameters:**

>* num1: (Number) Lower bound
>* num2: (Number) Upper bound
>* inclusive?: (Bool) Flag to include the given numbers

**Overloads:**

>None

*** 
#### _requireDirectory_ 
***

**Info:** Recursively require the entire directory and returns an object containing the required modules.

**Return:** (Promise<any>|any)

**Parameters:**

>* path: (String) Path to directory.
>* options?: (Char) 'r' Flag to use to indicate recursively require, (Char) 's' Flag to indicate use syncronous instead of Promise Pattern

**Overloads:**

>None

*** 
#### _suid_ 
***

**Info:** Creates a short Craydent/Global Unique Identifier

**Return:** (String)

**Parameters:**

>* length?: (Integer) Custom length of the short unique identifier. Default is 10.

**Overloads:**

>None

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
#### _tryEval_ 
***

**Info:** Evaluates an expression without throwing an error

**Return:** (any)

**Parameters:**

>* expression: (any) Expression to evaluate
>* evaluator?: (EvaluatorMethod) Method to use to evaluate the expression

**Overloads:**

>None

*** 
#### _wait_ 
***

**Info:** Stops execution until the condition is satisfied

**Return:** (void)

**Parameters:**

>* condition: (Code) Condition equivalent to js true to resume execution

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>