<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.6.14
**by Clark Inada**

## Constants

| | | |
| ----- | ----- | ----- |
| ACCEPT_ENCODING (String) |IE7 (String) |PROTOCOL (String) |
ACCEPT_LANGUAGE (String) |IE8 (String) |PUBLIC_IP (String) |
AMAYA (String) |IE_VERSION (String) |REFERER (String) |
ANDROID (String) |IPAD (String) |REFERER_IP (String) |
BLACKBERRY (String) |IPHONE (String) |RESPONSES (String) |
BROWSER (String) |IPOD (String) |REST_API_TEMPLATE (String) |
CHROME (String) |KHTML (String) |ROUTE_API_PATH (String) |
CHROME_VERSION (String) |LINUX (String) |SAFARI (String) |
CLICK (String) |LOCAL_IP (String) |SAFARI_VERSION (String) |
CLIENT (String) |MAC (String) |SERVER (String) |
CORES_SUPPORT (String) |ONMOUSEDOWN (String) |SERVER_PATH (String) |
DEBUG_MODE (String) |ONMOUSEUP (String) |SYMBIAN (String) |
DEVICE (String) |OPERA (String) |TEMPLATE_VARS (String) |
ENGINE (String) |OPERA_VERSION (String) |TEMPLATE_TAG_CONFIG (String) |
EXPOSE_ROUTE_API (String) |ORIGIN (String) |TRIDENT (String) |
FIREFOX (String) |OS (String) |VERBOSE_LOGS (String) |
FIREFOX_VERSION (String) |PAGE_NAME (String) |VERSION (String) |
GEKKO (String) |PAGE_NAME_RAW (String) |VISIBLE (String) |
HANDPOINT (String) |PALM (String) |WAIT (String) |
HIDDEN (String) |POINTER (String) |WEBKIT (String) |
HTTP_STATUS_TEMPLATE (String) |PRAGMA (String) |WINDOWS (String) |
IE (String) |PRESTO (String) |WINDOWS_MOBILE (String) |
IE6 (String) |PRINCE (String) |

## Featured

### Global

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

### Array

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
* projection: (Mixed) Indicate which properties to return

2)

* condition: (Mixed) Query following find/where clause syntax
* useReference: (Bool) Flag to make a copy instead of using references

3)

* condition: (Mixed) Query following find/where clause syntax
* projection: (Mixed) Indicate which properties to return
* limit: (Int) Limit the number of the results returned.

4)

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

### Object

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

* path: (String) Path to nested property
* options: (Object) Options for ignoring inheritance, validPath, etc

3)

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



##** Methods **##

---

## Global ##

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
#### _ChromeVersion_ 
***

**Info:** Get Chrome version

**Return:** (Float)

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
#### _SafariVersion_ 
***

**Info:** Get Safari version

**Return:** (Float)

**Parameters:**

* None

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
#### _echo_ 
***

**Info:** Echo to buffer and use in response

**Return:** (void)

**Parameters:**

* output: Data to send in response

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
#### _include_ 
***

**Info:** Require without erroring when module does not exist.

**Return:** (Mixed)

**Parameters:**

* path: (String) Module or Path to module.

**Overloads:**

* None

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
#### _isNull_ 
***

**Info:** Check if a value is Null

**Return:** (Mixed)

**Parameters:**

* value: (Mixed) Value to check

**Overloads:**

1)

* value: (Mixed) Value to check
* defaultValue: (Mixed) Value to return if null

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
#### _next_ 
***

**Info:** Call the next function(s) in queue

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

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

**Info:** Try to parse value to a Boolean

**Return:** (Mixed)

**Parameters:**

* value: (Mixed) value to parse as boolean

**Overloads:**

* None

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

**Return:** (Object)

**Parameters:**

* path: (String) Path to directory.

**Overloads:**

1)

* path: (String) Path to directory.
* options: (Char) 'r' Flag to use to indicate recursively require

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

* None

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
#### _var_dump_ 
***

**Info:** Dump of variables to response.

**Return:** (void)

**Parameters:**

* infinite: any number of arguments can be passed.

**Overloads:**

* None

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

*** 
#### _writeSession_ 
***

**Info:** Writes session to filesystem to be retrieved later.

**Return:** (void)

**Parameters:**

* None

**Overloads:**

* None

## Array ##

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
#### _createServer_ 
***

**Info:** Array class extension to do an inner join on arrays

**Return:** (Server)

**Parameters:**

* callback: (Function) Function to callback when a request is received

**Overloads:**

1)

* callback: (Function) Function to callback when a request is received
* createServer: (Object) Options for creating the server (ex: {createServer:require('http').createServer})

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
* craydent_thiss: (Mixed) Specify the context on callback function

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
#### _trim_ 
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

## Date ##

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

## Function ##

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

## Module ##

*** 
#### _globalize_ 
***

**Info:** Module method to globalize functions

**Return:** (Array)

**Parameters:**

* None

**Overloads:**

* None

## Number ##

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

## Object ##

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
* craydent_thisObject: (Mixed) Context for the callback function

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
* craydent_thisObject: (Mixed) Context for the callback function

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

## RegExp ##

*** 
#### _addFlags_ 
***

**Info:** RegExp class extension to add flags to regex

**Return:** (RegExp)

**Parameters:**

* flags: (String) Flags to add

**Overloads:**

* None

## String ##

*** 
#### _acronymize_ 
***

**Info:** String class extension to capitalize parts of the string

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
#### _convertUTCDate_ 
***

**Info:** String class extension to convert date string to UTC format

**Return:** (String)

**Parameters:**

* delimiter: (String) Character that delimits the date string

**Overloads:**

* None

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
#### _toCurrencyNotation_ 
***

**Info:** Number/String class extension to change number to currency

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

