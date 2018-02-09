<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.8.5
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
| DEBUG_MODE (Boolean) |LOCAL_IP (String) |PUBLIC_IP (String) |
ERROR_TYPES (Array) |MODULES_LOADED (Object) |VERSION (String) |

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

* pipelines: (Object[]) Array of stages defined in mongodb

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

**Info:** Array class extension to implement .every method

**Return:** (Bool)

**Parameters:**

* callback: (Function) Callback to test for each element

**Overloads:**

1)

* callback: (Function) Callback to test for each element
* craydent_ctxObject: (Object) Context for the callback function

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
#### _isEmpty_ 
***

**Info:** Array class extension to check if it is empty

**Return:** (Array)

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
#### _map_ 
***

**Info:** Array class extension to implement map

**Return:** (Array)

**Parameters:**

* callback: (Function) Callback function used to apply changes

**Overloads:**

1)

* callback: (Function) Callback function used to apply changes
* craydent_ctxObject: (Mixed) Specify the context on callback function

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
#### _trim_ 
***

**Info:** Array class extension to remove all white space/chars from the beginning and end of all string values in the array.

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

1)

* ref: (Boolean) Whether or not to mutate the original array.

2)

* character: (Char[]) Character to remove in the String

*** 
#### _universal_trim_ 
***

**Info:** Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.

**Return:** (Bool)

**Parameters:**

* None

**Overloads:**

1)

* ref: (Boolean) Whether or not to mutate the original array.

2)

* character: (Char[]) Character to remove in the String

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

