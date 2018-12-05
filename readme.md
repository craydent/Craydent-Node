<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
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

**Return:** (Bool) Value to indicate success or failure

**Parameters:**

>* value: (Object) value to add

**Overloads:**

>None

*** 
#### _aggregate_ 
***

**Info:** Array class extension to perform mongo style aggregation

**Return:** (Array<TResult>) returns an array of aggregates

**Parameters:**

>* pipelines: (Array<MongoPipelines>) Array of stages defined in mongodb. ($project, $match, $redact, $limit, $skip, $unwind, $group, $sample, $sort, $lookup, $out)

**Overloads:**

>None

*** 
#### _average_ 
***

**Info:** Array class extension to perform average of all the values (any value which is not 0).

**Return:** (number | NaN)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _find_ 
***

**Info:** Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)

**Return:** (Array<T>)

**Parameters:**

>* condition: (WhereCondition | string) Query following find/where clause syntax

**Overloads:**

>Parameters
>* condition: (WhereCondition | string) Query following find/where clause syntax
>* projection: (Object | string) Indicate which properties to return

>Parameters
>* condition: (WhereCondition | string) Query following find/where clause syntax
>* useReference: (Bool) Flag to make a copy instead of using references

*** 
#### _findOne_ 
***

**Info:** Array class extension to use mongo or sql queries returning the first item match

**Return:** (T)

**Parameters:**

>* condition: (WhereCondition | string) Query following find/where clause syntax

**Overloads:**

>Parameters
>* condition: (WhereCondition | string) Query following find/where clause syntax
>* projection: (WhereCondition | string) Indicate which properties to return

>Parameters
>* condition: (WhereCondition | string) Query following find/where clause syntax
>* useReference: (Bool) Flag to make a copy instead of using references

*** 
#### _stdev_ 
***

**Info:** Array class extension to perform standard deviation (any value which is not a number is 0).

**Return:** (number | NaN) returns the standard deviation of the array of numbers

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _sum_ 
***

**Info:** Array class extension to perform summation of all the values (any value which is not a number is 0).

**Return:** (number | NaN) returns the sum of the array of numbers

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _where_ 
***

**Info:** Array class extension to use mongo or sql queries

**Return:** (Array<T>) returns a filtered subset of the array.

**Parameters:**

>* condition: (WhereCondition) Query following mongo find/where clause syntax

**Overloads:**

>Parameters
>* condition: (WhereCondition) Query following mongo find/where clause syntax
>* limit: (number) Limit the number of the results returned.

>Parameters
>* condition: (WhereCondition) Query following mongo find/where clause syntax
>* projection: (Object) Indicate which properties to return

>Parameters
>* condition: (WhereCondition) Query following mongo find/where clause syntax
>* useReference: (Bool) Flag to make a copy instead of using references

>Parameters
>* condition: (WhereCondition) Query following mongo find/where clause syntax
>* projection: (Object) Indicate which properties to return
>* limit: (Int) Limit the number of the results returned.

>Parameters
>* condition: (WhereCondition) Query following mongo find/where clause syntax
>* useReference: (Bool) Flag to make a copy instead of using references
>* limit: (Int) Limit the number of the results returned.

>Parameters
>* condition: (WhereIterator<T>) The funciton invoked per iteration.
>* limit: (number) Limit the number of the results returned.

>Parameters
>* condition: (WhereIterator<T>) The funciton invoked per iteration.
>* projection: (Object) Indicate which properties to return

>Parameters
>* condition: (WhereIterator<T>) The funciton invoked per iteration.
>* useReference: (Bool) Flag to make a copy instead of using references

>Parameters
>* condition: (WhereIterator<T>) The funciton invoked per iteration.
>* projection: (Object) Indicate which properties to return
>* limit: (Int) Limit the number of the results returned.

>Parameters
>* condition: (WhereIterator<T>) The funciton invoked per iteration.
>* useReference: (Bool) Flag to make a copy instead of using references
>* limit: (Int) Limit the number of the results returned.

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

### HTTP

*** 
#### _$COOKIE_ 
***

**Info:** Get/set Cookies

**Return:** (String|Bool)

**Parameters:**

>* key: (String) Key for cookie value
>* option?: (CookieOptions) Specify delete

**Overloads:**

>Parameters
>* keyValue: (Object) Specify the key value pair: key=>property, value=>object[key]
>* option?: (CookieOptions) Specify path, domain, and/or expiration of cookie

>Parameters
>* key: (String) Key for cookie value
>* value: (any) Value to store
>* option?: (CookieOptions) Specify path and/or expiration of cookie

*** 
#### _$DEL_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

*** 
#### _$DELETE_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

*** 
#### _$GET_ 
***

**Info:** Retrieve all or specific variables in the url

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (GetOptions|VerbOptionsTypes|String) Options to defer, ignore case, etc

*** 
#### _$HEADER_ 
***

**Info:** Retrieve all or specific variables in the headers

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

*** 
#### _$PAYLOAD_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

*** 
#### _$POST_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

*** 
#### _$PUT_ 
***

**Info:** Retrieve all or specific variables in the Body

**Return:** (Bool|Object)

**Parameters:**

>None

**Overloads:**

>Parameters
>* key: (String) key for query value
>* options?: (VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc

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

### Template

*** 
#### _fillTemplate_ 
***

**Info:** Function for templetizing

**Return:** (String)

**Parameters:**

>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* options: (FillTemplateOptions) Options to use: max,offset,newlineToHtml,preserve_nonmatching

**Overloads:**

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* max: (Int) The maximum number of records to process

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* offset: (Int) The start index of the Object array
>* max: (Int) The maximum number of records to process

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* offset: (Int) The start index of the Object array
>* max: (Int) The maximum number of records to process
>* newlineToHtml: (Boolean) Flag to replace all new line chars () to the HTML <br /> tag.  Default is true.

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* offset: (Int) The start index of the Object array
>* max: (Int) The maximum number of records to process
>* newlineToHtml: (Boolean) Flag to replace all new line chars () to the HTML <br /> tag.  Default is true.
>* preserve_nonmatching: (Boolean) Flag to used to leave template variables that were not replaced.

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

<a name='markdown-header-array'></a>
## Array

*** 
#### _buildTree_ 
***

**Info:** Array class extension to create a parent/child hierarchy

**Return:** (Array<TResult>) returns a hierarchical array.

**Parameters:**

>* parentFinder: (TreeParentFinder<T>) Function to determine the parent.  Should return a boolean value and is passed the current item as an argument.
>* childFinder: (String) Property name of the object to use as a grouping.
>* options?: (TreeOptions) Options to customize properties,  Valid property is:<br />childProperty

**Overloads:**

>Parameters
>* parentFinder: (TreeParentFinder<T>) Function to determine the parent.  Should return a boolean value and is passed the current item as an argument.
>* childFinder: (TreeChildFinder<T>) Function to determine the grouping.
>* options?: (TreeOptions) Options to customize properties,  Valid property is:<br />childProperty

*** 
#### _condense_ 
***

**Info:** Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls

**Return:** (Array<T>)

**Parameters:**

>None

**Overloads:**

>Parameters
>* check_values: (Bool) Flag to remove duplicates

*** 
#### _createIndex_ 
***

**Info:** Array class extension to create indexes for faster searches during where

**Return:** (Array<T> | Bool) returns the Array<T> if successfull otherwise false.

**Parameters:**

>* properties: (string) Property or comma delimited property list to index.

**Overloads:**

>Parameters
>* indexes: (Array<string>) Array of properties to index

*** 
#### _delete_ 
***

**Info:** Array class extension to delete records

**Return:** (Array<T>) returns a list of the deleted objects.

**Parameters:**

>* condition: (WhereCondition) Query following find/where clause syntax
>* justOne?: (Bool) Flag for deleting just one records [Default is: true]

**Overloads:**

>None

*** 
#### _distinct_ 
***

**Info:** Array class extension to get all unique records by fields specified

**Return:** (Array<T>) returns an array with distinct values

**Parameters:**

>* fields: (String) Fields to use as the projection and unique comparison (comma delimited)
>* condition?: (String|WhereCondition) Query following SQL where clause syntax

**Overloads:**

>Parameters
>* fields: (Array<String>) Fields to use as the projection and unique comparison
>* condition?: (String|WhereCondition) Query following SQL where clause syntax

*** 
#### _filter_ 
***

**Info:** Array class extension to implement filter

**Return:** (Array<TResult>)

**Parameters:**

>* func: (ArrayIterator<T, TResult>) Callback function used to determine if value should be returned. Callback will get the current item, index, context as arguments.
>* craydent_ctxs?: (any) Specify the context on callback function

**Overloads:**

>None

*** 
#### _group_ 
***

**Info:** Array class extension to group records by fields

**Return:** (Array<TResult>)

**Parameters:**

>* params: (GroupOptions<T, TResult>) specs with common properties:<br />(Object) key<br />(Object | string) condition<br />(Function) reduce<br />(Object) initial<br />(Array<string> | Function) keyf<br />(Function) finalize
>* removeProps?: (Bool) Flag to preserve property if the value is null or undefined.

**Overloads:**

>None

*** 
#### _indexOf_ 
***

**Info:** Array class extension to implement indexOf

**Return:** (Int)

**Parameters:**

>* value: (any) value to find

**Overloads:**

>None

*** 
#### _indexOfAlt_ 
***

**Info:** Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression

**Return:** (Int) returns the index of the item that matches or -1. 

**Parameters:**

>* value: (any) value to find
>* func: (ArrayIterator<T, TResult>) Callback function used to do the comparison

**Overloads:**

>Parameters
>* regex: (RegExp) Regular expression to check value against
>* pos?: (Int) Index offset to start

*** 
#### _innerJoin_ 
***

**Info:** Array class extension to do an inner join on arrays

**Return:** (Array<TResult>) resulting array of the join.

**Parameters:**

>* arr: (Array<T>) Array to be joined with
>* on: (String) Condition to join on

**Overloads:**

>None

*** 
#### _insert_ 
***

**Info:** Array class extension to add to the array

**Return:** (Bool) returns true for success and false for failure.

**Parameters:**

>* value: (any) value to add

**Overloads:**

>None

*** 
#### _insertAfter_ 
***

**Info:** Array class extension to add to the array after a specific index

**Return:** (Bool) returns true for success and false for failure.

**Parameters:**

>* index: (Int) Index to add after
>* value: (any) Value to add

**Overloads:**

>None

*** 
#### _insertAt_ 
***

**Info:** Array class extension to add to the array at a specific index and push the all indexes down

**Return:** (Bool) returns true for success and false for failure.

**Parameters:**

>* index: (Int) Index to add after
>* value: (any) Value to add

**Overloads:**

>None

*** 
#### _insertBefore_ 
***

**Info:** Array class extension to add to the array before a specific index

**Return:** (Bool) returns true for success and false for failure.

**Parameters:**

>* index: (Int) Index to add before
>* value: (any) Value to add

**Overloads:**

>None

*** 
#### _joinLeft_ 
***

**Info:** Array class extension to do an outer left join on arrays

**Return:** (Array<TResult>) resulting array of the join.

**Parameters:**

>* arr: (Array<T>) Secondary array to be joined with
>* on: (String) Condition to join on

**Overloads:**

>None

*** 
#### _joinRight_ 
***

**Info:** Array class extension to do an outer right join on arrays

**Return:** (Array<TResult>) resulting array of the join.

**Parameters:**

>* arr: (Array<T>) Secondary array to be joined with
>* on: (String) Condition to join on

**Overloads:**

>None

*** 
#### _last_ 
***

**Info:** Array class extension to retrieve the last item in the array.

**Return:** (T) returns the last item in the array.

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _limit_ 
***

**Info:** Array class extension to return a limited amount of items

**Return:** (Array<T>) returns the first n items in the array.

**Parameters:**

>* max: (Int) Maximum number of items to return
>* skip?: (Int) Number of items to skip

**Overloads:**

>None

*** 
#### _mapReduce_ 
***

**Info:** Array class extension to run map-reduce aggregation over records

**Return:** (Array<TResult>) returns the map reduced array.

**Parameters:**

>* map: (ArrayIterator<T, TResult>) Function to apply to each item
>* reduce: (MongoReducer<T>) Function used to condense the items
>* options?: (MongoMapReduceOptions<T, TResult>) Options specified in the Mongo Doc

**Overloads:**

>None

*** 
#### _normalize_ 
***

**Info:** Array class extension to normalize all properties in the object array

**Return:** (Array<TResult>) returns a normalized version of the objects.

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to execute each array item in parallel or run each item against a generator/function in parallel

**Return:** (Promise<any>)

**Parameters:**

>None

**Overloads:**

>Parameters
>* func: (Yieldables) function to apply to each item

>Parameters
>* args: (Array<Yieldables>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, async functions, or functions)

*** 
#### _remove_ 
***

**Info:** Array class extension to remove an item by value

**Return:** (T | undefined) returns the removed item.

**Parameters:**

>* value: (any) Value to remove
>* indexOf?: (IndexOf<T>) Callback function to use to find the item based on the value

**Overloads:**

>None

*** 
#### _removeAll_ 
***

**Info:** Array class extension to remove all items by value

**Return:** (Array<T>) returns an array of all the removed items.

**Parameters:**

>* value?: (any) Value to remove
>* indexOf?: (IndexOf<T>) Callback function to use to find the item based on the value

**Overloads:**

>None

*** 
#### _removeAt_ 
***

**Info:** Array class extension to remove item at a specific index

**Return:** (T | undefined) returns the removed item.

**Parameters:**

>* index: (Int) Index of the item to remove

**Overloads:**

>None

*** 
#### _replaceAt_ 
***

**Info:** Array class extension to replace item at a specific index

**Return:** (T | undefined) returns the item removed.

**Parameters:**

>* index: (Int) Index of the item to remove
>* value: (any) Value to replace with

**Overloads:**

>None

*** 
#### _scramble_ 
***

**Info:** Array class extension to scramble the order.

**Return:** (Array<T>)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _sortBy_ 
***

**Info:** Array class extension to sort the array

**Return:** (Array<T>)

**Parameters:**

>* props: (string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

**Overloads:**

>Parameters
>* props: (Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed

>Parameters
>* props: (string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort

>Parameters
>* props: (Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort

>Parameters
>* props: (string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.

>Parameters
>* props: (Array<String>) Properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.

>Parameters
>* props: (string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.
>* lookup: (Object) Look up object to use as values instead of the array values.

>Parameters
>* props: (Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.
>* lookup: (Object) Look up object to use as values instead of the array values.

>Parameters
>* props: (string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.
>* lookup: (Object) Look up object to use as values instead of the array values.
>* options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

>Parameters
>* props: (Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed
>* rev: (Bool) Flag to reverse the sort
>* primer: (SortPrimer<T>|null|undefined) Function to apply to values in the array.
>* lookup: (Object) Look up object to use as values instead of the array values.
>* options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

*** 
#### _toSet_ 
***

**Info:** Array class extension to convert the array to a set

**Return:** (Set<T>) returns a Set from the array Values

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _update_ 
***

**Info:** Array class extension to update records in the array

**Return:** (Array<T>)

**Parameters:**

>* condition: (WhereCondition) Query following find/where clause syntax
>* setClause: (MongoSet) Set clause used to update the records

**Overloads:**

>Parameters
>* condition: (WhereCondition) Query following find/where clause syntax
>* setClause: (MongoSet) Set clause used to update the records
>* options: (UpdateOptions) Options to specify if mulit update and/or upsert

*** 
#### _upsert_ 
***

**Info:** Array class extension to upsert records to array

**Return:** (UpsertResult<T>) returns the information for resulting operation.

**Parameters:**

>* records: (Array<T>|T) Record(s) to use to insert/update array

**Overloads:**

>Parameters
>* records: (Array<T>|T) Records to use to insert/update array
>* callback: (UpsertIterator<T>) Method to use to determine if the records are equal

>Parameters
>* records: (Array<T>|T) Records to use to insert/update array
>* prop: (string) Property to use as the primary key
>* callback?: (UpsertIterator<T>) Method to use to determine if the records are equal

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

*** 
#### _context_ 
***

**Info:** Class used to create a new context for HTTP server

**Return:** (void)

**Parameters:**

>* request: (HTTPRequest) HTTP request object provided by createServer
>* response: (HTTPResponse) HTTP response object provided by createServer

**Overloads:**

>None

<a name='markdown-header-cli'></a>
## CLI

*** 
#### _CLI_ 
***

**Info:** CLI parser for arguments and simplem method to execute shell commands

**Return:** (CLI)

**Parameters:**

>None

**Overloads:**

>Parameters
>* options: (CLIOption[]) Array of options having properties option(required:command option ex: -c), type(data type returned using typeof, ex:string), description, required(default:false).

<a name='markdown-header-control-flow'></a>
## Control Flow

*** 
#### _awaitable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise<YieldableResult>)

**Parameters:**

>* value: (YieldableValue) Value to make yieldable

**Overloads:**

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make yieldable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to execute each array item in parallel or run each item against a generator/function in parallel

**Return:** (Promise<any>)

**Parameters:**

>None

**Overloads:**

>Parameters
>* func: (Yieldables) function to apply to each item

>Parameters
>* args: (Array<Yieldables>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, async functions, or functions)

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise<YieldableResult>)

**Parameters:**

>* value: (YieldableValue) Value to make yieldable

**Overloads:**

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make yieldable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.

<a name='markdown-header-date'></a>
## Date

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

<a name='markdown-header-fs'></a>
## FS

*** 
#### _access_ 
***

**Info:** A promisified version of access.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _appendFile_ 
***

**Info:** A promisified version of appendFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _chmod_ 
***

**Info:** A promisified version of chmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _chown_ 
***

**Info:** A promisified version of chown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _close_ 
***

**Info:** A promisified version of close.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fchmod_ 
***

**Info:** A promisified version of fchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fchown_ 
***

**Info:** A promisified version of fchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fdatasync_ 
***

**Info:** A promisified version of fdatasync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fstat_ 
***

**Info:** A promisified version of fstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _fsync_ 
***

**Info:** A promisified version of fsync.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _ftruncate_ 
***

**Info:** A promisified version of ftruncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _futimes_ 
***

**Info:** A promisified version of futimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lchmod_ 
***

**Info:** A promisified version of lchmod.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lchown_ 
***

**Info:** A promisified version of lchown.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _link_ 
***

**Info:** A promisified version of link.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lstat_ 
***

**Info:** A promisified version of lstat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _mkdir_ 
***

**Info:** A promisified version of mkdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _mkdtemp_ 
***

**Info:** A promisified version of mkdtemp.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _open_ 
***

**Info:** A promisified version of open.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _read_ 
***

**Info:** A promisified version of read.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readFile_ 
***

**Info:** A promisified version of readFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readdir_ 
***

**Info:** A promisified version of readdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _readlink_ 
***

**Info:** A promisified version of readlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _realpath_ 
***

**Info:** A promisified version of realpath.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _rename_ 
***

**Info:** A promisified version of rename.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _rmdir_ 
***

**Info:** A promisified version of rmdir.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _stat_ 
***

**Info:** A promisified version of stat.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _symlink_ 
***

**Info:** A promisified version of symlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _truncate_ 
***

**Info:** A promisified version of truncate.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _unlink_ 
***

**Info:** A promisified version of unlink.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _utimes_ 
***

**Info:** A promisified version of utimes.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _write_ 
***

**Info:** A promisified version of write.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _writeFile_ 
***

**Info:** A promisified version of writeFile.  The arguments are the same as the native fs methods minus the callback.

**Return:** (any)

**Parameters:**

>None

**Overloads:**

>None

<a name='markdown-header-function'></a>
## Function

*** 
#### _catch_ 
***

**Info:** Function listener to register the catch event

**Return:** (craydent_ctx)

**Parameters:**

>* func: (Function) Function to call on emit

**Overloads:**

>None

*** 
#### _emit_ 
***

**Info:** Call the next function(s) in queue

**Return:** (Array<TResult>)

**Parameters:**

>* event: (String) Event to trigger.
>* ...infinite: (any) any number of arguments can be passed and will be applied to listening functions.

**Overloads:**

>None

*** 
#### _extends_ 
***

**Info:** Function class extension to extend another class

**Return:** (Function)

**Parameters:**

>* extendee: (Class) Class to extend

**Overloads:**

>Parameters
>* extendee: (Class) Class to extend
>* inheritAsOwn: (Boolean) Flag to inherit and for values hasOwnProperty to be true.

*** 
#### _getName_ 
***

**Info:** Function class extension to get the name of the function

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _getParameters_ 
***

**Info:** Function class extension to get parameters in definition

**Return:** (Array<T>)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _next_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

>* ...infinite: (any) any number of arguments can be passed.

**Overloads:**

>None

*** 
#### _on_ 
***

**Info:** Function listener to register events

**Return:** (String)

**Parameters:**

>* event: (String) Event to listen on and invoked on emit
>* func: (Function) Function to call on emit

**Overloads:**

>None

*** 
#### _then_ 
***

**Info:** Function listener to register the then event

**Return:** (craydent_ctx)

**Parameters:**

>* func: (Function) Function to call on emit

**Overloads:**

>None

*** 
#### _toPromise_ 
***

**Info:** Function listener to register events

**Return:** (String)

**Parameters:**

>* event: (String) Event to listen on and invoked on emit
>* func: (Function) Function to call on emit

**Overloads:**

>None

<a name='markdown-header-http'></a>
## HTTP

*** 
#### _ChromeVersion_ 
***

**Info:** Get Chrome version

**Return:** (Float)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _FirefoxVersion_ 
***

**Info:** Get Firefox version

**Return:** (Float)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _IEVersion_ 
***

**Info:** Get Internet Explorer version

**Return:** (Float)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _OperaVersion_ 
***

**Info:** Get Opera version

**Return:** (Float)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _SafariVersion_ 
***

**Info:** Get Safari version

**Return:** (Float)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _createServer_ 
***

**Info:** Create http server, ability to run middleware, and define routes.

**Return:** (HTTP)

**Parameters:**

>* callback: (HTTPCallback) Function to callback when a request is received
>* createServer?: (HTTPOptions) Options for creating the server (ex: {createServer:require('http').createServer})

**Overloads:**

>Parameters
>* options: (HTTPOptions) Function to callback when a request is received

*** 
#### _echo_ 
***

**Info:** Echo to buffer and use in response

**Return:** (void)

**Parameters:**

>* output: (String) Data to send in response

**Overloads:**

>None

*** 
#### _end_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

>None

**Overloads:**

>Parameters
>* status?: (Integer) HTTP status code.
>* output?: (String) output to send as response.
>* encoding?: (String) encoding for the response.

*** 
#### _getSession_ 
***

**Info:** Asynchronous retrieval of the session object when used in conjunction with createServer

**Return:** (Promise<Session>)

**Parameters:**

>* sid: (String) Session id of the session object to retrieve syncronously.
>* callback?: (SessionCallback) callback function to invoke once the session object is retrieved.

**Overloads:**

>None

*** 
#### _getSessionID_ 
***

**Info:** Retrieve the session id when used in conjunction with createServer

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _getSessionSync_ 
***

**Info:** Syncronously retrieve the session object when used in conjunction with createServer

**Return:** (Session)

**Parameters:**

>* sid: (String) Session id of the session object to retrieve syncronously.

**Overloads:**

>None

*** 
#### _header_ 
***

**Info:** Set Http Headers to send

**Return:** (void)

**Parameters:**

>* header: (Header) Http header.
>* code?: (Integer) Http response code.

**Overloads:**

>None

*** 
#### _isAmaya_ 
***

**Info:** Check if browser is Amaya

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isAndroid_ 
***

**Info:** Check if device is Android

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isBlackBerry_ 
***

**Info:** Check if device is BlackBerry

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isChrome_ 
***

**Info:** Check if browser is Chrome

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isFirefox_ 
***

**Info:** Check if browser is Firefox

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isGecko_ 
***

**Info:** Check if engine is Gecko

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isIE_ 
***

**Info:** Check if browser is Internet Explorer

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isIE6_ 
***

**Info:** Check if browser is Internet Explorer 6

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isIPad_ 
***

**Info:** Check if device is iPad

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isIPhone_ 
***

**Info:** Check if device is IPhone

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isIPod_ 
***

**Info:** Check if device is IPod

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isKHTML_ 
***

**Info:** Check if engine is KHTML

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isLinux_ 
***

**Info:** Check if OS is Linux

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isMac_ 
***

**Info:** Check if OS is Mac Based

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isMobile_ 
***

**Info:** Check if the device is a Mobile device

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isOpera_ 
***

**Info:** Check if browser is Opera

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isPalmOS_ 
***

**Info:** Check if OS is PalmOS

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isPresto_ 
***

**Info:** Check if engine is Presto

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isPrince_ 
***

**Info:** Check if engine is Prince

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isSafari_ 
***

**Info:** Check if browser is Safari

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isSymbian_ 
***

**Info:** Check if OS is Symbian

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isTrident_ 
***

**Info:** Check if engine is Trident

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isWebkit_ 
***

**Info:** Check if engine is Webkit

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isWindows_ 
***

**Info:** Check if OS is Windows

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isWindowsMobile_ 
***

**Info:** Check if device is Windows Mobile

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _send_ 
***

**Info:** Recursively require the entire directory and returns an object containing the required modules.

**Return:** (void)

**Parameters:**

>* data: (Object) Object to send in response.

**Overloads:**

>Parameters
>* status: (Integer) Status code for response.
>* data: (Object) Object to send in response.

*** 
#### _var_dump_ 
***

**Info:** Dump of variables to response.

**Return:** (void)

**Parameters:**

>* ...infinite: (any) any number of arguments can be passed.

**Overloads:**

>None

*** 
#### _writeSession_ 
***

**Info:** Writes session to filesystem to be retrieved later.

**Return:** (void)

**Parameters:**

>None

**Overloads:**

>None

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

**Return:** (any)

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

<a name='markdown-header-regexp'></a>
## RegExp

*** 
#### _addFlags_ 
***

**Info:** RegExp class extension to add flags to regex

**Return:** (RegExp)

**Parameters:**

>* flags: (String) Flags to add

**Overloads:**

>None

<a name='markdown-header-string'></a>
## String

*** 
#### _acronymize_ 
***

**Info:** String class extension to create an acronym from the given string

**Return:** (String)

**Parameters:**

>* capsOnly: (Boolean) Flag to indicate to use capital letters only.

**Overloads:**

>Parameters
>* match: (RegExp) Pattern to match to qualify the Acronym.

>Parameters
>* capsOnly: (Boolean) Flag to indicate to use capital letters only.
>* delimiter: (String|RegExp) Character or RegExp pattern that delimits the string.

>Parameters
>* match: (RegExp) Pattern to match to qualify the Acronym.
>* delimiter: (String|RegExp) Character or RegExp pattern that delimits the string.

*** 
#### _capitalize_ 
***

**Info:** String class extension to capitalize parts of the string

**Return:** (String)

**Parameters:**

>* pos: (Int|Int[]) Index of the string to capitalize
>* everyWord: (Bool) Flag to capital every word

**Overloads:**

>None

*** 
#### _convertUTCDate_ 
***

**Info:** String class extension to convert date string to UTC format

**Return:** (String)

**Parameters:**

>* delimiter: (String) Character that delimits the date string

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
#### _cut_ 
***

**Info:** String class extension to remove between the provided indexes

**Return:** (String)

**Parameters:**

>* start_index: (Integer) Start index to cut
>* end_index: (Integer) End index to cut
>* replacement?: (String) String to put in place of the cut

**Overloads:**

>None

*** 
#### _ellipsis_ 
***

**Info:** String class extension to shorten by ellipsis

**Return:** (String)

**Parameters:**

>* before: (Int) Number of characters to use before using ellipsis
>* after?: (Int) Number of characters to use after the ellipsis

**Overloads:**

>None

*** 
#### _endItWith_ 
***

**Info:** String class extension to guarantee the original string ends with the passed string

**Return:** (String)

**Parameters:**

>* ending: (String) String to end with

**Overloads:**

>None

*** 
#### _endsWith_ 
***

**Info:** String class extension to check if the string ends with the given string

**Return:** (Bool|String)

**Parameters:**

>* ...infinite: (String) any number of arguments can be passed

**Overloads:**

>Parameters
>* arr: (String[]) An array of strings to check

*** 
#### _endsWithAny_ 
***

**Info:** String class extension to check if the string ends with the given string

**Return:** (Bool|String)

**Parameters:**

>* ...infinite: (String) any number of arguments can be passed

**Overloads:**

>Parameters
>* arr: (String[]) An array of strings to check

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
#### _highlight_ 
***

**Info:** String class extension to surround search words with the given tag(default span) and class (default chighlight)

**Return:** (String)

**Parameters:**

>* search: (String|RegExp) String or Regular expression to search
>* cssClass?: (String) Class to add for highlighting
>* tag?: (String) Tag to use to surround the search

**Overloads:**

>None

*** 
#### _ireplace_all_ 
***

**Info:** String class extension to replace all substrings ignoring case

**Return:** (String)

**Parameters:**

>* replace: (String|String[]) String or Array of strings to replace
>* subject: (String|String[]) String or Array of strings to replace with

**Overloads:**

>None

*** 
#### _isBlank_ 
***

**Info:** String class extension to check if the string is empty

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _isCuid_ 
***

**Info:** String class extension to check if the string is a cuid

**Return:** (Bool)

**Parameters:**

>* msFormat?: (Bool) use microsoft format if true

**Overloads:**

>None

*** 
#### _isValidEmail_ 
***

**Info:** String class extension to check if string is a valid email

**Return:** (Bool)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _lastIndexOfAlt_ 
***

**Info:** String class extension to find the last index based on a regular expression

**Return:** (Int)

**Parameters:**

>* regex: (RegExp) Regular expression to check value against
>* pos?: (Int) Max index to go up to in the search

**Overloads:**

>None

*** 
#### _ltrim_ 
***

**Info:** String class extension to remove characters from the beginning of the string

**Return:** (String)

**Parameters:**

>* character?: (Char[]) Character to remove

**Overloads:**

>None

*** 
#### _pluralize_ 
***

**Info:** String class extension to do a best guess pluralization of the string

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _replace_all_ 
***

**Info:** String class extension to replace all substrings (case sensitive)

**Return:** (String)

**Parameters:**

>* replace: (String|String[]) String or Array of strings to replace
>* subject: (String|String[]) String or Array of strings to replace with

**Overloads:**

>None

*** 
#### _reverse_ 
***

**Info:** String class extension to reverse the string

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _rtrim_ 
***

**Info:** String class extension to remove characters from the end of the string

**Return:** (String)

**Parameters:**

>* character?: (Char[]) Character to remove

**Overloads:**

>None

*** 
#### _sanitize_ 
***

**Info:** String class extension to remove potential XSS threats

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _singularize_ 
***

**Info:** String class extension to do a best guess singularization of the string

**Return:** (String)

**Parameters:**

>None

**Overloads:**

>None

*** 
#### _startItWith_ 
***

**Info:** String class extension to guarantee the original string starts with the passed string

**Return:** (String)

**Parameters:**

>* starting: (String) String to start with

**Overloads:**

>None

*** 
#### _startsWith_ 
***

**Info:** String class extension to check if the string starts with the given string

**Return:** (Bool|String)

**Parameters:**

>* ...infinite: (String) any number of String arguments can be passed

**Overloads:**

>Parameters
>* arr: (String[]) An array of strings to check

*** 
#### _startsWithAny_ 
***

**Info:** String class extension to check if the string starts with the given string

**Return:** (Bool|String)

**Parameters:**

>* ...infinite: (String) any number of String arguments can be passed

**Overloads:**

>Parameters
>* arr: (String[]) An array of strings to check

*** 
#### _strip_ 
***

**Info:** String class extension to remove characters from the beginning and end of the string

**Return:** (String)

**Parameters:**

>* character: (Char[]) Character to remove

**Overloads:**

>None

*** 
#### _substringBetween_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

>* start?: (Char) Character to use for the starting index (required if end is not passed)
>* end?: (Char) Character to use for the ending index (required if start is null or undefined)

**Overloads:**

>None

*** 
#### _substringEndAt_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

>* end: (Char) Character to use for the ending index

**Overloads:**

>None

*** 
#### _substringStartFrom_ 
***

**Info:** String class extension to substring by character instead of using indexes

**Return:** (String)

**Parameters:**

>* start: (Char) Character to use for the starting index

**Overloads:**

>None

*** 
#### _toCurrencyNotation_ 
***

**Info:** String class extension to change number to use separater character

**Return:** (String)

**Parameters:**

>* separator?: (Char) Character to use as delimiter

**Overloads:**

>None

*** 
#### _toDateTime_ 
***

**Info:** String class extension to convert string to datetime

**Return:** (Date|String)

**Parameters:**

>* options?: (DateTimeOptions) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format

**Overloads:**

>None

*** 
#### _toObject_ 
***

**Info:** String class extension to convert to JSON

**Return:** (Object)

**Parameters:**

>* assignmentChar?: (Char) Character to use as assignment delimiter. Defaults to '&'.
>* delimiter?: (Char) Character to use as pair delimiter

**Overloads:**

>None

*** 
#### _trim_ 
***

**Info:** String class extension to remove characters from the beginning and end of the string.

**Return:** (Bool)

**Parameters:**

>* character?: (Char[]) Character to remove in the String

**Overloads:**

>None

<a name='markdown-header-utility'></a>
## Utility

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
#### _awaitable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise<YieldableResult>)

**Parameters:**

>* value: (YieldableValue) Value to make yieldable

**Overloads:**

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make yieldable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.

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

*** 
#### _yieldable_ 
***

**Info:** Makes a value yieldable via a Promise.

**Return:** (Promise<YieldableResult>)

**Parameters:**

>* value: (YieldableValue) Value to make yieldable

**Overloads:**

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.

>Parameters
>* func: (Function) Function to make yieldable
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.

>Parameters
>* func: (Function) Function to make yieldable
>* context: (any) Context to use to execute func.
>* callbackIndex: (Integer) Index of callback argument.
>* returnIndex: (Integer) Index of callback argument.

<a name='markdown-header-xml-to-json'></a>
## XML to JSON

*** 
#### _xmlToJson_ 
***

**Info:** Converts XML to JSON

**Return:** (Object)

**Parameters:**

>* xml: (String|XMLDOM) XML string or XML DOM
>* ignoreAttributes?: (Bool) Flag to ignore attributes

**Overloads:**

>None




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>