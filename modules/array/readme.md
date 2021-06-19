<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.12.1
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-array');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-array/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-array/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Array](#markdown-header-array)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| CONSOLE_COLORS (Object) |LOCAL_IP (String) |TEMPLATE_TAG_CONFIG (Object) |
DEBUG_MODE (Boolean) |MODULES_LOADED (Object) |TEMPLATE_VARS (Array) |
ERROR_TYPES (Array) |PUBLIC_IP (String) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Object) |RESPONSES (Object) |

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

**Return:** (Documents<T>) returns an array of aggregates

**Parameters:**

>* pipelines: (Array<MongoPipelines>) Array of stages defined in mongodb. ($project, $match, $redact, $limit, $skip, $unwind, $group, $sample, $sort, $lookup, $out)

**Overloads:**

>None

*** 
#### _average_ 
***

**Info:** Array class extension to perform average of all the values (any value which is not a number is skipped).

**Return:** (number)

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
>* projection: (Fields | string) Indicate which properties to return

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
>* projection: (Fields | string) Indicate which properties to return

>Parameters
>* condition: (WhereCondition | string) Query following find/where clause syntax
>* useReference: (Bool) Flag to make a copy instead of using references

*** 
#### _parallelEach_ 
***

**Info:** Array class extension to perform push and update indexes if used

**Return:** (Bool) Value to indicate success or failure

**Parameters:**

>* value: (Object) value to add

**Overloads:**

>None

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
>* childFinder: (String|TreeChildFinder<T>) Property name of the object to use as a grouping.
>* options?: (TreeOptions) Options to customize properties,  Valid property is:<br />childProperty

**Overloads:**

>None

*** 
#### _condense_ 
***

**Info:** Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls

**Return:** (Array<T>) returns a condensed version of the array.

**Parameters:**

>* check_values?: (Bool) Set craydent_ctx flag to remove duplicates

**Overloads:**

>None

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

>* fields: (String|Array<String>) Fields to use as the projection and unique comparison (comma delimited) or array of fields
>* condition?: (String|WhereCondition) Query following SQL where clause syntax

**Overloads:**

>None

*** 
#### _emit_ 
***

**Info:** Call the next function(s) in queue

**Return:** (Array<TResult>)

**Parameters:**

>* event: (String) Event to trigger.
>* ...infinite: (any) any number of arguments can be passed and will be applied to listening functions as arguments.

**Overloads:**

>None

*** 
#### _filter_ 
***

**Info:** Array class extension to implement filter

**Return:** (Array<T>)

**Parameters:**

>* func: (ArrayIterator<T>) Callback function used to determine if value should be returned. Callback will get the current item, index, context as arguments.
>* craydent_ctxs?: (any) Specify the context on callback function

**Overloads:**

>None

*** 
#### _group_ 
***

**Info:** Array class extension to group records by fields

**Return:** (Array<T>)

**Parameters:**

>* params: (GroupOptions<T>) specs with common properties:<br />(Object) key<br />(Object | string) condition<br />(Function) reduce<br />(Object) initial<br />(Array<string> | Function) keyf<br />(Function) finalize
>* removeProps?: (Bool) Flag to preserve property if the value is null or undefined.

**Overloads:**

>None

*** 
#### _indexOfAlt_ 
***

**Info:** Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression

**Return:** (Integer)

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

**Return:** (Bool)

**Parameters:**

>* value: (Mixed) value to add

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
#### _remove_ 
***

**Info:** Array class extension to remove an item by value

**Return:** (T | undefined) returns the removed item.

**Parameters:**

>* value: (any) Value to remove
>* indexOf?: (ArrayIterator<T>) Callback function to use to find the item based on the value

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
>* options?: (UpdateOptions) Options to specify if mulit update and/or upsert

**Overloads:**

>None

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




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/array)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/array)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/array)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>