<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-date');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-date/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-date/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Date](#markdown-header-date)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |

<a name='markdown-header-featured'></a>
## Featured

### Date

*** 
#### _format_ 
***

**Info:** Date class extension to convert to formatted string

**Return:** (String)

**Parameters:**

>* format: (String) Format syntax to use to to format date

**Overloads:**

>Parameters
>* format: (String) Format syntax to use to to format date
>* options: (DateFormatOptions) specs with optional properties:<br />(Bool) gmt<br />(Int) offset



## Methods

<a name='markdown-header-date'></a>
## Date

*** 
#### _equals_ 
***

**Info:** Object class extension to check if object values are equal

**Return:** (Bool)

**Parameters:**

>* compare: (any) Object to compare against

**Overloads:**

>Parameters
>* compare: (any) Object to compare against
>* props: (String[]) Array of property values to compare against

*** 
#### _getDayOfYear_ 
***

**Info:** Date class extension to retrieve the day of the year

**Return:** (Int)

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
#### _getWeek_ 
***

**Info:** Date class extension to retrieve the week number in the year

**Return:** (Int)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isValidDate_ 
***

**Info:** Date class extension to check if the date is valid

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