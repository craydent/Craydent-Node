<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.7
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-string');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-string/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-string/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [String](#markdown-header-string)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |VERSION (String) |
LOCAL_IP (String) |PUBLIC_IP (String) |


## Methods

<a name='markdown-header-string'></a>
## String

*** 
#### _acronymize_ 
***

**Info:** String class extension to create an acronym from the given string

**Return:** (String)

**Parameters:**

* capsOnly: (Boolean) Flag to indicate to use capital letters only.

**Overloads:**

1)

* match: (RegExp) Pattern to match to qualify the Acronym.

2)

* capsOnly: (Boolean) Flag to indicate to use capital letters only.
* delimiter: (String) Character that delimits the string.

3)

* match: (RegExp) Pattern to match to qualify the Acronym.
* delimiter: (String) Character that delimits the string.

4)

* capsOnly: (Boolean) Flag to indicate to use capital letters only.
* delimiter: (RegExp) RegExp pattern that delimits the string.

5)

* match: (RegExp) Pattern to match to qualify the Acronym.
* delimiter: (RegExp) RegExp pattern that delimits the string.

*** 
#### _capitalize_ 
***

**Info:** String class extension to capitalize parts of the string

**Return:** (String)

**Parameters:**

* pos: (Int[]) Index of the string to capitalize

**Overloads:**

1)

* pos: (Int) Index of the string to capitalize
* everyWord: (Bool) Flag to capital every word

*** 
#### _contains_ 
***

**Info:** Object class extension to check if value exists

**Return:** (Bool)

**Parameters:**

* val: (Mixed) Value to check or custom function to determine validity

**Overloads:**

1)

* val: (Mixed) Value to check
* func: (Function) Callback function used to do the comparison

2)

* arr: (Array) Array of values to return first matching value

*** 
#### _convertUTCDate_ 
***

**Info:** String class extension to convert date string to UTC format

**Return:** (String)

**Parameters:**

* delimiter: (String) Character that delimits the date string

**Overloads:**

* None

*** 
#### _count_ 
***

**Info:** Object class extension to count the properties in the object/elements in arrays/characters in strings.

**Return:** (Int)

**Parameters:**

* None

**Overloads:**

1)

* option: (Mixed) Query used in Array.where when counting elements in an Array

2)

* option: (String) Word or phrase to count in the String

3)

* option: (RegExp) Word or phrase pattern to count in the String

*** 
#### _cut_ 
***

**Info:** String class extension to remove between the provided indexes

**Return:** (String)

**Parameters:**

* start_index: (Integer) Start index to cut
* end_index: (Integer) End index to cut

**Overloads:**

1)

* start_index: (Integer) Start index to cut
* end_index: (Integer) End index to cut
* replacement: (String) String to put in place of the cut

*** 
#### _ellipsis_ 
***

**Info:** String class extension to shorten by ellipsis

**Return:** (String)

**Parameters:**

* before: (Int) Number of characters to use before using ellipsis

**Overloads:**

1)

* before: (Int) Number of characters to use before using ellipsis
* after: (Int) Number of characters to use after the ellipsis

*** 
#### _endItWith_ 
***

**Info:** String class extension to guarantee the original string ends with the passed string

**Return:** (String)

**Parameters:**

* ending: (String) String to end with

**Overloads:**

* None

*** 
#### _endsWith_ 
***

**Info:** String class extension to check if the string ends with the given string

**Return:** (Mix)

**Parameters:**

* infinite: any number of arguments can be passed

**Overloads:**

1)

* arr: (String[]) An array of strings to check

*** 
#### _endsWithAny_ 
***

**Info:** String class extension to check if the string ends with the given string

**Return:** (Mix)

**Parameters:**

* infinite: any number of arguments can be passed

**Overloads:**

1)

* arr: (String[]) An array of strings to check

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
#### _highlight_ 
***

**Info:** String class extension to surround search words with the given tag(default span) and class (default chighlight)

**Return:** (String)

**Parameters:**

* search: (String) String to search

**Overloads:**

1)

* search: (RegExp) Regular expression to search

2)

* search: (String) String to search
* cssClass: (String) Class to add for highlighting

3)

* search: (RegExp) Regular expression to search
* cssClass: (String) Class to add for highlighting

4)

* search: (String) String to search
* cssClass: (String) Class to add for highlighting
* tag: (String) Tag to use to surround the search

5)

* search: (RegExp) Regular expression to search
* cssClass: (String) Class to add for highlighting
* tag: (String) Tag to use to surround the search

*** 
#### _indexOfAlt_ 
***

**Info:** Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression

**Return:** (Integer)

**Parameters:**

* value: (Mixed) value to find
* func: (Function) Callback function used to do the comparison

**Overloads:**

1)

* regex: (RegExp) Regular expression to check value against

2)

* regex: (RegExp) Regular expression to check value against
* pos: (Int) Index offset to start

*** 
#### _ireplace_all_ 
***

**Info:** String class extension to replace all substrings ignoring case

**Return:** (String)

**Parameters:**

* replace: (String) String to replace
* subject: (String) String to replace with

**Overloads:**

* None

*** 
#### _isBlank_ 
***

**Info:** String class extension to check if the string is empty

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isCuid_ 
***

**Info:** String class extension to check if the string is a cuid

**Return:** (Bool)

**Parameters:**

* msFormat: (Bool) use microsoft format if true

**Overloads:**

* None

*** 
#### _isValidEmail_ 
***

**Info:** String class extension to check if string is a valid email

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _lastIndexOfAlt_ 
***

**Info:** String class extension to find the last index based on a regular expression

**Return:** (Int)

**Parameters:**

* regex: (RegExp) Regular expression to check value against

**Overloads:**

1)

* regex: (RegExp) Regular expression to check value against
* pos: (Int) Max index to go up to in the search

*** 
#### _ltrim_ 
***

**Info:** String class extension to remove characters from the beginning of the string

**Return:** (String)

**Parameters:**

* character: (Char[]) Character to remove

**Overloads:**

* None

*** 
#### _pluralize_ 
***

**Info:** String class extension to do a best guess pluralization of the string

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _replace_all_ 
***

**Info:** String class extension to replace all substrings (case sensitive)

**Return:** (String)

**Parameters:**

* replace: (String) String to replace
* subject: (String) String to replace with

**Overloads:**

1)

* replace: (String[]) Array of string to replace
* subject: (String[]) Array of string to replace with

*** 
#### _reverse_ 
***

**Info:** String class extension to reverse the string

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _rtrim_ 
***

**Info:** String class extension to remove characters from the end of the string

**Return:** (String)

**Parameters:**

* character: (Char[]) Character to remove

**Overloads:**

* None

*** 
#### _sanitize_ 
***

**Info:** String class extension to remove potential XSS threats

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _singularize_ 
***

**Info:** String class extension to do a best guess singularization of the string

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _startItWith_ 
***

**Info:** String class extension to guarantee the original string starts with the passed string

**Return:** (String)

**Parameters:**

* starting: (String) String to start with

**Overloads:**

* None

*** 
#### _startsWith_ 
***

**Info:** String class extension to check if the string starts with the given string

**Return:** (Bool)

**Parameters:**

* infinite: any number of String arguments can be passed

**Overloads:**

1)

* arr: (String[]) An array of strings to check

*** 
#### _startsWithAny_ 
***

**Info:** String class extension to check if the string starts with the given string

**Return:** (Bool)

**Parameters:**

* infinite: any number of String arguments can be passed

**Overloads:**

1)

* arr: (String[]) An array of strings to check

*** 
#### _strip_ 
***

**Info:** String class extension to remove characters from the beginning and end of the string

**Return:** (String)

**Parameters:**

* character: (Char[]) Character to remove

**Overloads:**

* None

*** 
#### _substringBetween_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

* start: (Char) Character to use for the starting index
* end: (Char) Character to use for the ending index

**Overloads:**

1)

* start: (Char) Character to use for the starting index

2)

* start: (Char) Character to use for the starting index

*** 
#### _substringEndAt_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

* end: (Char) Character to use for the ending index

**Overloads:**

* None

*** 
#### _substringStartFrom_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

* start: (Char) Character to use for the starting index

**Overloads:**

* None

*** 
#### _toCurrencyNotation_ 
***

**Info:** String class extension to change number to use separater character

**Return:** (String)

**Parameters:**

* None

**Overloads:**

1)

* separator: (Char) Character to use as delimiter

*** 
#### _toDateTime_ 
***

**Info:** String class extension to convert string to datetime

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* options: (Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format

*** 
#### _trim_ 
***

**Info:** String class extension to remove characters from the beginning and end of the string.

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

1)

* character: (Char[]) Character to remove in the String

*** 
#### _toObject_ 
***

**Info:** String class extension to convert to JSON

**Return:** (Object)

**Parameters:**

* None

**Overloads:**

1)

* assignmentChar: (Char) Character to use as assignment delimiter. Defaults to '='.

2)

* assignmentChar: (Char) Character to use as assignment delimiter. Defaults to '&'.
* delimiter: (Char) Character to use as pair delimiter




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>