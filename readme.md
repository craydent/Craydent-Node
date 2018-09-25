<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.8
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Array](#markdown-header-array)
* [Class](#markdown-header-class)
* [CLI](#markdown-header-cli)
* [Control Flow](#markdown-header-control-flow)
* [Date](#markdown-header-date)
* [FS](#markdown-header-fs)
* [Function](#markdown-header-function)
* [JSON Parser](#markdown-header-json-parser)
* [Number](#markdown-header-number)
* [Object](#markdown-header-object)
* [RegExp](#markdown-header-regexp)
* [String](#markdown-header-string)
* [Template](#markdown-header-template)
* [TypeOf](#markdown-header-typeof)
* [Utility](#markdown-header-utility)
* [XML to JSON](#markdown-header-xml-to-json)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| DEBUG_MODE (Boolean) |PUBLIC_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
EXPOSE_ROUTE_API (Boolean) |RESPONSES (Object) |TEMPLATE_VARS (Array) |
HTTP_STATUS_TEMPLATE (Array) |REST_API_TEMPLATE (String) |VERSION (String) |
LOCAL_IP (String) |ROUTE_API_PATH (String) |
MODULES_LOADED (Object) |ROUTE_LOGO_URL (String) |

<a name='markdown-header-featured'></a>
## Featured

### Array

*** 
#### _add_ 
***

**Info:** Array class extension to perform push and update indexes if used

**Return:** (Array)

**Parameters:**

* value: (Mixed) value to find

**Overloads:**

* None

*** 
#### _aggregate_ 
***

**Info:** Array class extension to perform mongo style aggregation

**Return:** (Array)

**Parameters:**

* pipelines: (Object[]) Array of stages defined in mongodb. ($project, $match, $redact, $limit, $skip, $unwind, $group, $sample, $sort, $lookup, $out)

**Overloads:**

* None

*** 
#### _average_ 
***

**Info:** Array class extension to perform average of all the values (any value which is not a number is 0).

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _find_ 
***

**Info:** Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)

**Return:** (Array)

**Parameters:**

* condition: (Mixed) Query following find/where clause syntax

**Overloads:**

1)

* condition: (Mixed) Query following find/where clause syntax
* projection: (Mixed) Indicate which properties to return

2)

* condition: (Mixed) Query following find/where clause syntax
* useReference: (Bool) Flag to make a copy instead of using references

*** 
#### _findOne_ 
***

**Info:** Array class extension to use mongo or sql queries returning the first item match

**Return:** (Object)

**Parameters:**

* condition: (Mixed) Query following find/where clause syntax

**Overloads:**

1)

* condition: (Mixed) Query following find/where clause syntax
* projection: (Mixed) Indicate which properties to return

2)

* condition: (Mixed) Query following find/where clause syntax
* useReference: (Bool) Flag to make a copy instead of using references

*** 
#### _stdev_ 
***

**Info:** Array class extension to perform standard deviation (any value which is not a number is 0).

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _sum_ 
***

**Info:** Array class extension to perform summation of all the values (any value which is not a number is 0).

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _where_ 
***

**Info:** Array class extension to use mongo or sql queries

**Return:** (Array)

**Parameters:**

* condition: (Mixed) Query following find/where clause syntax

**Overloads:**

1)

* condition: (Mixed) Query following find/where clause syntax
* limit: (Int) Limit the number of the results returned.

2)

* condition: (Mixed) Query following find/where clause syntax
* projection: (Mixed) Indicate which properties to return

3)

* condition: (Mixed) Query following find/where clause syntax
* useReference: (Bool) Flag to make a copy instead of using references

4)

* condition: (Mixed) Query following find/where clause syntax
* projection: (Mixed) Indicate which properties to return
* limit: (Int) Limit the number of the results returned.

5)

* condition: (Mixed) Query following find/where clause syntax
* useReference: (Bool) Flag to make a copy instead of using references
* limit: (Int) Limit the number of the results returned.

### Date

*** 
#### _format_ 
***

**Info:** Date class extension to convert to formatted string

**Return:** (String)

**Parameters:**

* format: (String) Format syntax to use to to format date

**Overloads:**

1)

* format: (String) Format syntax to use to to format date
* options: (Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset

### HTTP

*** 
#### _$COOKIE_ 
***

**Info:** Get/set Cookies

**Return:** (Mixed)

**Parameters:**

* key: (String) Key for cookie value

**Overloads:**

1)

* key: (String) Key for cookie
* option: (Object) Specify delete

2)

* keyValue: (Object) Specify the key value pair
* option: (Object) Specify path, domain, and/or expiration of cookie

3)

* key: (String) Key for cookie value
* value: (String) Value to store
* option: (Object) Specify path and/or expiration of cookie

*** 
#### _$DEL_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$DELETE_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$GET_ 
***

**Info:** Retrieve all or specific variables in the url

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$HEADER_ 
***

**Info:** Retrieve all or specific variables in the headers

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$PAYLOAD_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$POST_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

*** 
#### _$PUT_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* key: (String) key for query value

2)

* key: (String) key for query value
* options: (Object) Options to defer, ignore case, etc

### Object

*** 
#### _get_ 
***

**Info:** Alias to getProperty; however, it can not be used as a protoype property.

**Return:** (Mixed)

**Parameters:**

* object: (Object) object to get the property of
* path: (String) Path to nested property

**Overloads:**

1)

* object: (Object) object to get the property of
* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path

2)

* object: (Object) object to get the property of
* path: (RegExp) Regex match for the property

3)

* object: (Object) object to get the property of
* path: (String) Path to nested property
* options: (Object) Options for ignoring inheritance, validPath, etc

4)

* object: (Object) object to get the property of
* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path
* options: (Object) Options for ignoring inheritance, validPath, etc

*** 
#### _getProperty_ 
***

**Info:** Object class extension to retrieve nested properties without error when property path does not exist

**Return:** (Mixed)

**Parameters:**

* path: (String) Path to nested property

**Overloads:**

1)

* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path

2)

* path: (RegExp) Regex match for the property

3)

* path: (String) Path to nested property
* options: (Object) Options for ignoring inheritance, validPath, etc

4)

* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path
* options: (Object) Options for ignoring inheritance, validPath, etc

### String

*** 
#### _fillTemplate_ 
***

**Info:** String class extension to fill template based on template syntax

**Return:** (String)

**Parameters:**

* objs: (Objects[]) Objects to fill the template variables

**Overloads:**

1)

* objs: (Objects[]) Objects to fill the template variables
* offset: (Int) The start index of the Object array
* max: (Int) The maximum number of records to process

2)

* objs: (Objects[]) Objects to fill the template variables
* max: (Int) The maximum number of records to process

### Template

*** 
#### _fillTemplate_ 
***

**Info:** String class extension to fill template based on template syntax

**Return:** (String)

**Parameters:**

* objs: (Objects[]) Objects to fill the template variables

**Overloads:**

1)

* objs: (Objects[]) Objects to fill the template variables
* offset: (Int) The start index of the Object array
* max: (Int) The maximum number of records to process

2)

* objs: (Objects[]) Objects to fill the template variables
* max: (Int) The maximum number of records to process

### Utility

*** 
#### _catchAll_ 
***

**Info:** Creates an catch all for exceptions in the current node service.

**Return:** (Mixed)

**Parameters:**

* callback: (Function) Callback function to call when there is an uncaught exception

**Overloads:**

1)

* callback: (Function) Callback function to call when there is an uncaught exception
* append: (Boolean) Options to defer, ignore case, etc

*** 
#### _zipit_ 
***

**Info:** Download a zip of files from file contents

**Return:** (void)

**Parameters:**

* files: (Object[]) Objects containing properties name for file name and content for file content

**Overloads:**

1)

* files: (String) Name of the file
* content: (String) contents of the file



## Methods

<a name='markdown-header-array'></a>
## Array

*** 
#### _buildTree_ 
***

**Info:** Array class extension to create a parent/child hierarchy

**Return:** (Array)

**Parameters:**

* parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.
* childFinder: (String) Property name of the object to use as a grouping.

**Overloads:**

1)

* parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.
* childFinder: (Function) Function to determine the grouping.

2)

* parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.
* childFinder: (String) Property name of the object to use as a grouping.
* options: (Object) Options to customize properties,  Valid property is:<br />childProperty

3)

* parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.
* childFinder: (String) Property name of the object to use as a grouping.
* options: (Object) Options to customize properties,  Valid property is:<br />childProperty

*** 
#### _condense_ 
***

**Info:** Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

1)

* check_values: (Bool) Flag to remove duplicates

*** 
#### _createIndex_ 
***

**Info:** Array class extension to create indexes for faster searches during where

**Return:** (Array)

**Parameters:**

* properties: (String) Property or comma delimited property list to index.

**Overloads:**

1)

* indexes: (String[]) Array of properties to index

*** 
#### _delete_ 
***

**Info:** Array class extension to delete records

**Return:** (Array)

**Parameters:**

* condition: (Mixed) Query following find/where clause syntax

**Overloads:**

1)

* condition: (Mixed) Query following find/where clause syntax
* justOne: (Boolean) Flag for deleting just one records [Default is: true]

*** 
#### _distinct_ 
***

**Info:** Array class extension to get all unique records by fields specified

**Return:** (Array)

**Parameters:**

* fields: (String) Fields to use as the projection and unique comparison (comma delimited)

**Overloads:**

1)

* fields: (Array) Fields to use as the projection and unique comparison

2)

* fields: (String) Fields to use as the projection and unique comparison (comma delimited)
* condition: (String) Query following SQL where clause syntax

3)

* fields: (Array) Fields to use as the projection and unique comparison (comma delimited)
* condition: (String) Query following SQL where clause syntax

4)

* fields: (String) Fields to use as the projection and unique comparison (comma delimited)
* condition: (Object) Query following MongoDB find clause syntax

5)

* fields: (Array) Fields to use as the projection and unique comparison (comma delimited)
* condition: (Object) Query following MongoDB find clause syntax

*** 
#### _filter_ 
***

**Info:** Array class extension to implement filter

**Return:** (Array)

**Parameters:**

* func: (Function) Callback function used to determine if value should be returned

**Overloads:**

1)

* func: (Function) Callback function used to determine if value should be returned
* craydent_ctxs: (Mixed) Specify the context on callback function

*** 
#### _group_ 
***

**Info:** Array class extension to group records by fields

**Return:** (Array)

**Parameters:**

* params: (Object) specs with common properties:<br />(Object) key<br />(Mixed) cond<br />(Function) reduce<br />(Object) initial

**Overloads:**

* None

*** 
#### _indexOf_ 
***

**Info:** Array class extension to implement indexOf

**Return:** (Int)

**Parameters:**

* value: (Mixed) value to find

**Overloads:**

* None

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
#### _innerJoin_ 
***

**Info:** Array class extension to do an inner join on arrays

**Return:** (Array)

**Parameters:**

* arr: (Array) Array to be joined with
* on: (String) Condition to join on

**Overloads:**

* None

*** 
#### _insert_ 
***

**Info:** Array class extension to add to the array

**Return:** (Bool)

**Parameters:**

* value: (Mixed) value to add

**Overloads:**

* None

*** 
#### _insertAfter_ 
***

**Info:** Array class extension to add to the array after a specific index

**Return:** (Bool)

**Parameters:**

* index: (Int) Index to add after
* value: (Mixed) Value to add

**Overloads:**

* None

*** 
#### _insertAt_ 
***

**Info:** Array class extension to add to the array at a specific index and push the all indexes down

**Return:** (Bool)

**Parameters:**

* index: (Int) Index to add after
* value: (Mixed) Value to add

**Overloads:**

* None

*** 
#### _insertBefore_ 
***

**Info:** Array class extension to add to the array before a specific index

**Return:** (Bool)

**Parameters:**

* index: (Int) Index to add before
* value: (Mixed) Value to add

**Overloads:**

* None

*** 
#### _joinLeft_ 
***

**Info:** Array class extension to do an outer left join on arrays

**Return:** (Array)

**Parameters:**

* arr: (Array) Secondary array to be joined with
* on: (String) Condition to join on

**Overloads:**

* None

*** 
#### _joinRight_ 
***

**Info:** Array class extension to do an outer right join on arrays

**Return:** (Array)

**Parameters:**

* arr: (Array) Secondary array to be joined with
* on: (String) Condition to join on

**Overloads:**

* None

*** 
#### _last_ 
***

**Info:** Array class extension to retrieve the last item in the array.

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _limit_ 
***

**Info:** Array class extension to return a limited amount of items

**Return:** (Array)

**Parameters:**

* max: (Int) Maximum number of items to return

**Overloads:**

1)

* max: (Int) Maximum number of items to return
* skip: (Int) Number of items to skip

*** 
#### _mapReduce_ 
***

**Info:** Array class extension to run map-reduce aggregation over records

**Return:** (Array)

**Parameters:**

* map: (Function) Function to apply to each item
* reduce: (Function) Function used to condense the items

**Overloads:**

1)

* map: (Function) Function to apply to each item
* reduce: (Function) Function used to condense the items
* options: (Object) Options specified in the Mongo Doc

*** 
#### _normalize_ 
***

**Info:** Array class extension to normalize all properties in the object array

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to execute each array item in parallel or run each item against a generator/function in parallel

**Return:** (Promise)

**Parameters:**

* None

**Overloads:**

1)

* gen: (Generator) Generator function to apply to each item

2)

* func: (Function) Function to apply to each item

3)

* args: (Array) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)

*** 
#### _remove_ 
***

**Info:** Array class extension to remove an item by value

**Return:** (Mixed)

**Parameters:**

* value: (Mixed) Value to remove

**Overloads:**

1)

* value: (Mixed) Value to remove
* indexOf: (Function) Callback function to use to find the item based on the value

*** 
#### _removeAll_ 
***

**Info:** Array class extension to remove all items by value

**Return:** (Array)

**Parameters:**

* value: (Mixed) Value to remove

**Overloads:**

1)

* value: (Mixed) Value to remove
* indexOf: (Function) Callback function to use to find the item based on the value

*** 
#### _removeAt_ 
***

**Info:** Array class extension to remove item at a specific index

**Return:** (Mixed)

**Parameters:**

* index: (Int) Index of the item to remove

**Overloads:**

* None

*** 
#### _replaceAt_ 
***

**Info:** Array class extension to replace item at a specific index

**Return:** (Array)

**Parameters:**

* index: (Int) Index of the item to remove
* value: (Mixed) Value to replace with

**Overloads:**

* None

*** 
#### _scramble_ 
***

**Info:** Array class extension to scramble the order.

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _sortBy_ 
***

**Info:** Array class extension to sort the array

**Return:** (Array)

**Parameters:**

* props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

**Overloads:**

1)

* props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

2)

* props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort

3)

* props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort

4)

* props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.

5)

* props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.

6)

* props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.
* lookup: (Object) Look up object to use as values instead of the array values.

7)

* props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.
* lookup: (Object) Look up object to use as values instead of the array values.

8)

* props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.
* lookup: (Object) Look up object to use as values instead of the array values.
* options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

9)

* props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed
* rev: (Boolean) Flag to reverse the sort
* primer: (Function) Function to apply to values in the array.
* lookup: (Object) Look up object to use as values instead of the array values.
* options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

*** 
#### _toSet_ 
***

**Info:** Array class extension to convert the array to a set

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _update_ 
***

**Info:** Array class extension to update records in the array

**Return:** (Array)

**Parameters:**

* condition: (Mixed) Query following find/where clause syntax
* setClause: (Mixed) Set clause used to update the records

**Overloads:**

1)

* condition: (Mixed) Query following find/where clause syntax
* setClause: (Mixed) Set clause used to update the records
* options: (Object) Options to specify if mulit update and/or upsert

*** 
#### _upsert_ 
***

**Info:** Array class extension to upsert records to array

**Return:** (Object)

**Parameters:**

* records: (Array) Records to use to insert/update array

**Overloads:**

1)

* records: (Array) Records to use to insert/update array
* callback: (Function) Method to use to determine if the records are equal

2)

* records: (Array) Records to use to insert/update array
* prop: (String) Property to use as the primary key

3)

* records: (Array) Records to use to insert/update array
* prop: (String) Property to use as the primary key
* callback: (Function) Method to use to determine if the records are equal

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

*** 
#### _context_ 
***

**Info:** Class used to create a new context for HTTP server

**Return:** (void)

**Parameters:**

* request: (HTTPRequest) HTTP request object provided by createServer
* response: (HTTPResponse) HTTP response object provided by createServer

**Overloads:**

* None

<a name='markdown-header-cli'></a>
## CLI

*** 
#### _CLI_ 
***

**Info:** CLI parser for arguments and simplem method to execute shell commands

**Return:** (Cursor)

**Parameters:**

* None

**Overloads:**

1)

* options: (Object[]) Array of options having properties option(required:command option ex: -c), type(data type returned using typeof, ex:string), description, required(default:false).

<a name='markdown-header-control-flow'></a>
## Control Flow

*** 
#### _awaitable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

4)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.
* returnIndex: (Integer) Index of callback argument.

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to execute each array item in parallel or run each item against a generator/function in parallel

**Return:** (Promise)

**Parameters:**

* None

**Overloads:**

1)

* gen: (Generator) Generator function to apply to each item

2)

* func: (Function) Function to apply to each item

3)

* args: (Array) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

4)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.
* returnIndex: (Integer) Index of callback argument.

<a name='markdown-header-date'></a>
## Date

*** 
#### _getDayOfYear_ 
***

**Info:** Date class extension to retrieve the day of the year

**Return:** (Int)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _getWeek_ 
***

**Info:** Date class extension to retrieve the week number in the year

**Return:** (Int)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isValidDate_ 
***

**Info:** Date class extension to check if the date is valid

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

<a name='markdown-header-fs'></a>
## FS

*** 
#### _access_ 
***

**Info:** A promisified version of access.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _appendFile_ 
***

**Info:** A promisified version of appendFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _chmod_ 
***

**Info:** A promisified version of chmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _chown_ 
***

**Info:** A promisified version of chown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _close_ 
***

**Info:** A promisified version of close.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _fchmod_ 
***

**Info:** A promisified version of fchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _fchown_ 
***

**Info:** A promisified version of fchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _fdatasync_ 
***

**Info:** A promisified version of fdatasync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _fstat_ 
***

**Info:** A promisified version of fstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _fsync_ 
***

**Info:** A promisified version of fsync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _ftruncate_ 
***

**Info:** A promisified version of ftruncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _futimes_ 
***

**Info:** A promisified version of futimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _lchmod_ 
***

**Info:** A promisified version of lchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _lchown_ 
***

**Info:** A promisified version of lchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _link_ 
***

**Info:** A promisified version of link.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _lstat_ 
***

**Info:** A promisified version of lstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _mkdir_ 
***

**Info:** A promisified version of mkdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _mkdtemp_ 
***

**Info:** A promisified version of mkdtemp.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _open_ 
***

**Info:** A promisified version of open.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _read_ 
***

**Info:** A promisified version of read.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _readFile_ 
***

**Info:** A promisified version of readFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _readdir_ 
***

**Info:** A promisified version of readdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _readlink_ 
***

**Info:** A promisified version of readlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _realpath_ 
***

**Info:** A promisified version of realpath.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _rename_ 
***

**Info:** A promisified version of rename.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _rmdir_ 
***

**Info:** A promisified version of rmdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _stat_ 
***

**Info:** A promisified version of stat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _symlink_ 
***

**Info:** A promisified version of symlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _truncate_ 
***

**Info:** A promisified version of truncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _unlink_ 
***

**Info:** A promisified version of unlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _utimes_ 
***

**Info:** A promisified version of utimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _write_ 
***

**Info:** A promisified version of write.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _writeFile_ 
***

**Info:** A promisified version of writeFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

* None

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
#### _then_ 
***

**Info:** Function listener to register the then event

**Return:** (String)

**Parameters:**

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

<a name='markdown-header-http'></a>
## HTTP

*** 
#### _ChromeVersion_ 
***

**Info:** Get Chrome version

**Return:** (Float)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _FirefoxVersion_ 
***

**Info:** Get Firefox version

**Return:** (Float)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _IEVersion_ 
***

**Info:** Get Internet Explorer version

**Return:** (Float)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _OperaVersion_ 
***

**Info:** Get Opera version

**Return:** (Float)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _SafariVersion_ 
***

**Info:** Get Safari version

**Return:** (Float)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _createServer_ 
***

**Info:** Create http server, ability to run middleware, and define routes.

**Return:** (Server)

**Parameters:**

* callback: (Function) Function to callback when a request is received

**Overloads:**

1)

* callback: (Function) Function to callback when a request is received
* createServer: (Object) Options for creating the server (ex: {createServer:require('http').createServer})

*** 
#### _echo_ 
***

**Info:** Echo to buffer and use in response

**Return:** (void)

**Parameters:**

* output: Data to send in response

**Overloads:**

* None

*** 
#### _end_ 
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
#### _getSession_ 
***

**Info:** Retrieve the session object when used in conjunction with createServer

**Return:** (void)

**Parameters:**

* sid: (String) Session id of the session object to retrieve syncronously.

**Overloads:**

1)

* sid: (String) Session id of the session object to retrieve.
* callback: (Function) callback function to invoke once the session object is retrieved.

*** 
#### _getSessionID_ 
***

**Info:** Retrieve the session id when used in conjunction with createServer

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _getSessionSync_ 
***

**Info:** Syncronously retrieve the session object when used in conjunction with createServer

**Return:** (void)

**Parameters:**

* sid: (String) Session id of the session object to retrieve syncronously.

**Overloads:**

* None

*** 
#### _header_ 
***

**Info:** Set Http Headers to send

**Return:** (void)

**Parameters:**

* header: (String) Http header.

**Overloads:**

1)

* headers: (Object) Http headers.

2)

* header: (String) Http header.
* code: (Integer) Http response code.

3)

* headers: (Object) Http headers.
* code: (Integer) Http response code.

*** 
#### _isAmaya_ 
***

**Info:** Check if browser is Amaya

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isAndroid_ 
***

**Info:** Check if device is Android

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isBlackBerry_ 
***

**Info:** Check if device is BlackBerry

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isChrome_ 
***

**Info:** Check if browser is Chrome

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isFirefox_ 
***

**Info:** Check if browser is Firefox

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isGecko_ 
***

**Info:** Check if engine is Gecko

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isIE_ 
***

**Info:** Check if browser is Internet Explorer

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isIE6_ 
***

**Info:** Check if browser is Internet Explorer 6

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isIPad_ 
***

**Info:** Check if device is iPad

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isIPhone_ 
***

**Info:** Check if device is IPhone

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isIPod_ 
***

**Info:** Check if device is IPod

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isKHTML_ 
***

**Info:** Check if engine is KHTML

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isLinux_ 
***

**Info:** Check if OS is Linux

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isMac_ 
***

**Info:** Check if OS is Mac Based

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isMobile_ 
***

**Info:** Check if the device is a Mobile device

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isOpera_ 
***

**Info:** Check if browser is Opera

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isPalmOS_ 
***

**Info:** Check if OS is PalmOS

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isPresto_ 
***

**Info:** Check if engine is Presto

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isPrince_ 
***

**Info:** Check if engine is Prince

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isSafari_ 
***

**Info:** Check if browser is Safari

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isSymbian_ 
***

**Info:** Check if OS is Symbian

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isTrident_ 
***

**Info:** Check if engine is Trident

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isWebkit_ 
***

**Info:** Check if engine is Webkit

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isWindows_ 
***

**Info:** Check if OS is Windows

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isWindowsMobile_ 
***

**Info:** Check if device is Windows Mobile

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _send_ 
***

**Info:** Recursively require the entire directory and returns an object containing the required modules.

**Return:** (Object)

**Parameters:**

* data: (Object) Object to send in response.

**Overloads:**

1)

* status: (Integer) Status code for response.
* data: (Object) Object to send in response.

*** 
#### _var_dump_ 
***

**Info:** Dump of variables to response.

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

**Overloads:**

* None

*** 
#### _writeSession_ 
***

**Info:** Writes session to filesystem to be retrieved later.

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

<a name='markdown-header-number'></a>
## Number

*** 
#### _aboutEqualTo_ 
***

**Info:** Number class extension to check if values are approximately equal

**Return:** (Bool)

**Parameters:**

* compare: (Number) Number to compare
* giveOrTake: (Number) Plus/minus value

**Overloads:**

* None

*** 
#### _isEven_ 
***

**Info:** Number class extension to check if number is even

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isOdd_ 
***

**Info:** Number class extension to check if number is odd

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

<a name='markdown-header-object'></a>
## Object

*** 
#### _addObjectPrototype_ 
***

**Info:** Method to extend the Object Class

**Return:** (void)

**Parameters:**

* name: (String) name of the method to add
* fn: (Function) method implementation

**Overloads:**

1)

* name: (String) name of the method to add
* fn: (Function) method implementation
* override: (Bool) if true, override the previously defined prototype

*** 
#### _changes_ 
***

**Info:** Object class extension to compare properties that have changed

**Return:** (Object)

**Parameters:**

* compare: (Object) Object to compare against

**Overloads:**

* None

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
#### _copyObject_ 
***

**Info:** Object class extension to copy an object excluding constructor

**Return:** (Object)

**Parameters:**

* None

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
#### _duplicate_ 
***

**Info:** Object class extension to copy an object including constructor

**Return:** (Object)

**Parameters:**

* None

**Overloads:**

1)

* recursive: (Boolean) Flag to copy all child objects recursively

*** 
#### _eachProperty_ 
***

**Info:** Object class extension to loop through all properties where hasOwnValue is true.

**Return:** (Object)

**Parameters:**

* callback: (Function) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed

**Overloads:**

* None

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
#### _every_ 
***

**Info:** Object class extension to check property values against a function

**Return:** (Bool)

**Parameters:**

* callback: (Function) Callback to apply to each value

**Overloads:**

1)

* callback: (Function) Callback to apply to each value
* craydent_ctxObject: (Mixed) Context for the callback function

*** 
#### _getClass_ 
***

**Info:** Object class extension to get the constructor name

**Return:** (String)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _getKeys_ 
***

**Info:** Object class extension to get the keys of the object

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
#### _has_ 
***

**Info:** Alias to Object.prototype.hasOwnProperty

**Return:** (Boolean)

**Parameters:**

* property: (String) Property name to check

**Overloads:**

* None

*** 
#### _isArray_ 
***

**Info:** Object class extension to check if object is an array

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isAsync_ 
***

**Info:** Object class extension to check if object is a async function

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isBetween_ 
***

**Info:** Object class extension to check if object is between lower and upper bounds

**Return:** (Bool)

**Parameters:**

* lowerBound: (Mixed) Lower bound comparison
* upperBound: (Mixed) Upper bound comparison

**Overloads:**

1)

* lowerBound: (Mixed) Lower bound comparison
* upperBound: (Mixed) Upper bound comparison
* inclusive: (Bool) Flag to include give bounds

*** 
#### _isBoolean_ 
***

**Info:** Object class extension to check if object is a boolean

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isDate_ 
***

**Info:** Object class extension to check if object is a date

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isDomElement_ 
***

**Info:** Object class extension to check if object is a DOM element

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isEmpty_ 
***

**Info:** Object class extension to check if it is empty

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isError_ 
***

**Info:** Object class extension to check if object is a boolean

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isFloat_ 
***

**Info:** Object class extension to check if object is a float

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isFunction_ 
***

**Info:** Object class extension to check if object is a function

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isGenerator_ 
***

**Info:** Object class extension to check if object is a generator function

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isGeolocation_ 
***

**Info:** Object class extension to check if object is a geolocation

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isInt_ 
***

**Info:** Object class extension to check if object is an integer

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isNumber_ 
***

**Info:** Object class extension to check if object is a number

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isObject_ 
***

**Info:** Object class extension to check if object is an object

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isPromise_ 
***

**Info:** Object class extension to check if object is a promise object

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isRegExp_ 
***

**Info:** Object class extension to check if object is a RegExp

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isString_ 
***

**Info:** Object class extension to check if object is a string

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _isSubset_ 
***

**Info:** Object class extension to check if item is a subset

**Return:** (Bool)

**Parameters:**

* compare: (Mixed) Superset to compare against

**Overloads:**

* None

*** 
#### _itemCount_ 
***

**Info:** Object class extension to count the properties in item

**Return:** (Int)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _keyOf_ 
***

**Info:** Object class extension to get the key of the give value

**Return:** (String)

**Parameters:**

* value: (Mixed) Value to compare against

**Overloads:**

* None

*** 
#### _map_ 
***

**Info:** Object class extension to apply method to every value

**Return:** (void)

**Parameters:**

* callback: (Function) Callback to apply to each value

**Overloads:**

1)

* callback: (Function) Callback to apply to each value
* craydent_ctxObject: (Mixed) Context for the callback function

*** 
#### _merge_ 
***

**Info:** Object class extension to merge objects

**Return:** (Object)

**Parameters:**

* secondary: (Object) Object to merge with

**Overloads:**

1)

* secondary: (Object) Object to merge with
* condition: (Mixed) Flags to recurse, merge only shared value, clone, intersect etc

*** 
#### _set_ 
***

**Info:** Alias to setProperty; however, it can not be used as a protoype property.

**Return:** (Bool)

**Parameters:**

* object: (Object) object to add the property to
* path: (String) Path to nested property
* value: (Mixed) Value to set

**Overloads:**

1)

* object: (Object) object to add the property to
* path: (String) Path to nested property
* value: (Mixed) Value to set
* delimiter: (Char) Separator used to parse path

2)

* object: (Object) object to add the property to
* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path
* value: (Mixed) Value to set
* options: (Object) Options for ignoring inheritance, validPath, etc

*** 
#### _setProperty_ 
***

**Info:** Object class extension to set nested properties creating necessary property paths

**Return:** (Bool)

**Parameters:**

* path: (String) Path to nested property
* value: (Mixed) Value to set

**Overloads:**

1)

* path: (String) Path to nested property
* value: (Mixed) Value to set
* delimiter: (Char) Separator used to parse path

2)

* path: (String) Path to nested property
* delimiter: (Char) Separator used to parse path
* value: (Mixed) Value to set
* options: (Object) Options for ignoring inheritance, validPath, etc

*** 
#### _toStringAlt_ 
***

**Info:** Object class extension for an alternate way to stringify object to formatted string

**Return:** (String)

**Parameters:**

* None

**Overloads:**

1)

* delimiter: (Char) Character to separate the property from the value

2)

* delimiter: (Char) Character to separate the property from the value
* prefix: (Char) Character to prefix the property name

3)

* delimiter: (Char) Character to separate the property from the value
* prefix: (Char) Character to prefix the property name
* urlEncode: (Bool) Flag to url encode the property and value

<a name='markdown-header-regexp'></a>
## RegExp

*** 
#### _addFlags_ 
***

**Info:** RegExp class extension to add flags to regex

**Return:** (RegExp)

**Parameters:**

* flags: (String) Flags to add

**Overloads:**

* None

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

<a name='markdown-header-utility'></a>
## Utility

*** 
#### _addObjectPrototype_ 
***

**Info:** Method to extend the Object Class

**Return:** (void)

**Parameters:**

* name: (String) name of the method to add
* fn: (Function) method implementation

**Overloads:**

1)

* name: (String) name of the method to add
* fn: (Function) method implementation
* override: (Bool) if true, override the previously defined prototype

*** 
#### _ajax_ 
***

**Info:** Method to make ajax calls

**Return:** (void)

**Parameters:**

* params: (Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess

**Overloads:**

1)

* params: (Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess
* returnData: (String) Specifies which data to return when using Promise pattern

*** 
#### _awaitable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

4)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.
* returnIndex: (Integer) Index of callback argument.

*** 
#### _clearCache_ 
***

**Info:** Clear a module from the require cache.

**Return:** (Boolean)

**Parameters:**

* module: (String) Single module to remove.

**Overloads:**

1)

* None

*** 
#### _clusterit_ 
***

**Info:** Enable clustering

**Return:** (void)

**Parameters:**

* callback: Method to call for Workers.  Callback is passed the cluster object as an argument.

**Overloads:**

* None

*** 
#### _cout_ 
***

**Info:** Log to console when DEBUG_MODE is true and when the console is available

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

**Overloads:**

* None

*** 
#### _cuid_ 
***

**Info:** Creates a Craydent/Global Unique Identifier

**Return:** (String)

**Parameters:**

* msFormat: (Bool) use microsoft format if true

**Overloads:**

* None

*** 
#### _error_ 
***

**Info:** User implemented place holder function to handle errors

**Return:** (void)

**Parameters:**

* fname: (String) The function name the error was thrown
* e: (Error) Exception object thrown

**Overloads:**

* None

*** 
#### _exclude_ 
***

**Info:** Exclude prototyping

**Return:** (void)

**Parameters:**

* list: (String[]) Array of strings in containing the property to exclude from prototyping.

**Overloads:**

* None

*** 
#### _foo_ 
***

**Info:** Place holder function for a blank function

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _include_ 
***

**Info:** Require without erroring when module does not exist.

**Return:** (Mixed)

**Parameters:**

* path: (String) Module or Path to module.

**Overloads:**

1)

* path: (String) Module or Path to module.
* refresh: (Boolean) Flag to clear cache for the specific include.

*** 
#### _logit_ 
***

**Info:** Log to console when DEBUG_MODE is true and when the console is available

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

**Overloads:**

* None

*** 
#### _md5_ 
***

**Info:** MD5 encode a string.

**Return:** (String)

**Parameters:**

* str: (String) String to encode.

**Overloads:**

* None

*** 
#### _mkdirRecursive_ 
***

**Info:** Recursively create folders.

**Return:** (void)

**Parameters:**

* path: (String) Path to create.
* callback: (Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors).

**Overloads:**

* None

*** 
#### _namespace_ 
***

**Info:** Adds the class to a namespace instead of the global space

**Return:** (void)

**Parameters:**

* name: (String) Name of the namespace to add to.
* clazz: (Class) Class to add to the given namespace

**Overloads:**

1)

* name: (String) Name of the namespace to add to.
* clazz: (Class) Class to add to the given namespace
* fn: (Function) Method to call after the class has been added to the namespace

*** 
#### _noop_ 
***

**Info:** Place holder function for a blank function

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

*** 
#### _now_ 
***

**Info:** Get the DateTime of now

**Return:** (Mixed)

**Parameters:**

* None

**Overloads:**

1)

* format: (String) Format syntax to return formatted string of now

*** 
#### _parseBoolean_ 
***

**Info:** Try to parse value to a Boolean (0, 1, '0', and '1' are valid unless strict is set to true).

**Return:** (Mixed)

**Parameters:**

* value: (Mixed) value to parse as boolean.

**Overloads:**

1)

* value: (Mixed) value to parse as boolean.
* strict: (Boolean) Disable parsing of 0, 1, '0', and '1'.

*** 
#### _parseRaw_ 
***

**Info:** Creates an evaluable string

**Return:** (String)

**Parameters:**

* value: value to parse

**Overloads:**

1)

* value: (Mixed) Value to parse
* skipQuotes: (Bool) Flag to skip quotes for strings
* saveCircular: (Bool) Flag to save circular references

*** 
#### _rand_ 
***

**Info:** Create a random number between two numbers

**Return:** (Number)

**Parameters:**

* num1: (Number) Lower bound
* num2: (Number) Upper bound

**Overloads:**

1)

* num1: (Number) Lower bound
* num2: (Number) Upper bound
* inclusive: (Bool) Flag to include the given numbers

*** 
#### _requireDirectory_ 
***

**Info:** Recursively require the entire directory and returns an object containing the required modules.

**Return:** (Promise/Object)

**Parameters:**

* path: (String) Path to directory.

**Overloads:**

1)

* path: (String) Path to directory.
* options: (Char) 'r' Flag to use to indicate recursively require, (Char) 's' Flag to indicate use syncronous instead of Promise Pattern

*** 
#### _suid_ 
***

**Info:** Creates a short Craydent/Global Unique Identifier

**Return:** (String)

**Parameters:**

* None

**Overloads:**

1)

* length: (Integer) Custom length of the short unique identifier

*** 
#### _syncroit_ 
***

**Info:** Generator based control flow to allow for more "syncronous" programing structure

**Return:** (Promise)

**Parameters:**

* gen: (GeneratorFunction) Generator function to execute

**Overloads:**

1)

* async: (AsyncFunction) Async function to execute

*** 
#### _tryEval_ 
***

**Info:** Evaluates an expression without throwing an error

**Return:** (Mixed)

**Parameters:**

* expression: (Mixed) Expression to evaluate

**Overloads:**

1)

* expression: (Mixed) Expression to evaluate
* evaluator: (Function) Method to use to evaluate the expression

*** 
#### _wait_ 
***

**Info:** Stops execution until the condition is satisfied

**Return:** (void)

**Parameters:**

* condition: (Mixed) Condition equivalent to js true to resume execution

**Overloads:**

* None

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise)

**Parameters:**

* value: (Mixed) Value to make yieldable

**Overloads:**

1)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.

2)

* func: (Function) Function to make yieldable
* callbackIndex: (Integer) Index of callback argument.

3)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.

4)

* func: (Function) Function to make yieldable
* context: (Mixed) Context to use to execute func.
* callbackIndex: (Integer) Index of callback argument.
* returnIndex: (Integer) Index of callback argument.

<a name='markdown-header-xml-to-json'></a>
## XML to JSON

*** 
#### _xmlToJson_ 
***

**Info:** Converts XML to JSON

**Return:** (Object)

**Parameters:**

* xml: (Mixed) XML string or XML DOM

**Overloads:**

1)

* xml: (Mixed) XML string or XML DOM
* ignoreAttributes: (Bool) Flag to ignore attributes




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>