<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

#**Craydent 0.6.5**#
**by Clark Inada**



##** Constants **##

---

>ACCEPT_ENCODING

>ACCEPT_LANGUAGE

>AMAYA

>ANDROID

>BLACKBERRY

>BROWSER

>>CURRENT

>>CURRENT_VERSION

>>IE

>>IE_VERSION

>>IE6

>>IE7

>>IE8

>>CHROME

>>CHROME_VERSION

>>FIREFOX

>>FIREFOX_VERSION

>>OPERA

>>OPERA_VERSION

>>SAFARI

>>SAFARI_VERSION

>CHROME

>CHROME_VERSION

>CLICK

>CLIENT

>>BROWSER

>>CORES_SUPPORT

>>DEVICE

>>ENGINE

>>OS

>CORES_SUPPORT

>DEBUG_MODE

>DEVICE

>>CURRENT

>>ANDROID

>>BLACKBERRY

>>IPAD

>>IPHONE

>>IPOD

>>LINUX

>>MAC

>>PALM

>>SYMBIAN

>>WINDOWS

>>WINDOWS_MOBILE

>ENGINE

>>CURRENT

>>AMAYA

>>GEKKO

>>KHTML

>>PRESTO

>>PRINCE

>>TRIDENT

>>WEBKIT

>EXPOSE_ROUTE_API

>FIREFOX

>FIREFOX_VERSION

>GEKKO

>HANDPOINT

>HIDDEN

>HTTP_STATUS_TEMPLATE

>IE

>IE6

>IE7

>IE8

>IE_VERSION

>IPAD

>IPHONE

>IPOD

>KHTML

>LINUX

>LOCAL_IP

>MAC

>ONMOUSEDOWN

>ONMOUSEUP

>OPERA

>OPERA_VERSION

>ORIGIN

>OS

>>CURRENT

>>ANDROID

>>BLACKBERRY

>>LINUX

>>IOS

>>MAC

>>PALM

>>SYMBIAN

>>WINDOWS

>>WINDOWS_MOBILE

>PAGE_NAME

>PAGE_NAME_RAW

>PALM

>POINTER

>PRAGMA

>PRESTO

>PRINCE

>PROTOCOL

>PUBLIC_IP

>REFERER

>REFERER_IP

>RESPONSES

>>100

>>101

>>102

>>200

>>201

>>202

>>203

>>204

>>205

>>206

>>207

>>208

>>226

>>300

>>301

>>302

>>303

>>304

>>305

>>306

>>307

>>308

>>400

>>401

>>402

>>403

>>404

>>405

>>406

>>407

>>408

>>409

>>410

>>411

>>412

>>413

>>414

>>415

>>416

>>417

>>418

>>420

>>422

>>423

>>424

>>425

>>426

>>428

>>429

>>431

>>444

>>449

>>450

>>451

>>499

>>500

>>501

>>502

>>503

>>504

>>505

>>506

>>507

>>508

>>509

>>510

>>511

>>598

>>599

>REST_API_TEMPLATE

>ROUTE_API_PATH

>SAFARI

>SAFARI_VERSION

>SERVER

>SERVER_PATH

>SYMBIAN

>TEMPLATE_VARS

>TEMPLATE_TAG_CONFIG

>>IGNORE_CHARS

>>FOR

>>FOREACH

>>WHILE

>>IF

>>SWITCH

>>SCRIPT

>>TRY

>>VARIABLE

>>VARIABLE_NAME

>>DECLARE

>TRIDENT

>VERBOSE_LOGS

>VERSION

>VISIBLE

>WAIT

>WEBKIT

>WINDOWS

>WINDOWS_MOBILE

##** Featured **##

---

## Global ##

### $COOKIE ###

>**Info:** Get/set Cookies

>**Return:** (Mixed)

>**Parameters:**

>>key: (String) Key for cookie value

>**Overloads:**

>>key: (String) Key for cookie

>>option: (Object) Specify delete

---
>>keyValue: (Object) Specify the key value pair

>>option: (Object) Specify path, domain, and/or expiration of cookie

---
>>key: (String) Key for cookie value

>>value: (String) Value to store

>>option: (Object) Specify path and/or expiration of cookie

### $DELETE ###

>**Info:** Retrieve all or specific variables in the Body

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### $GET ###

>**Info:** Retrieve all or specific variables in the url

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### $HEADER ###

>**Info:** Retrieve all or specific variables in the headers

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### $PAYLOAD ###

>**Info:** Retrieve all or specific variables in the Body

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### $POST ###

>**Info:** Retrieve all or specific variables in the Body

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### $PUT ###

>**Info:** Retrieve all or specific variables in the Body

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>key: (String) key for query value

---
>>key: (String) key for query value

>>options: (Object) Options to defer, ignore case, etc

### catchAll ###

>**Info:** Creates an catch all for exceptions in the current node service.

>**Return:** (Mixed)

>**Parameters:**

>>callback: (Function) Callback function to call when there is an uncaught exception

>**Overloads:**

>>callback: (Function) Callback function to call when there is an uncaught exception

>>append: (Boolean) Options to defer, ignore case, etc

### zipit ###

>**Info:** Download a zip of files from file contents

>**Return:** (void)

>**Parameters:**

>>files: (Object[]) Objects containing properties name for file name and content for file content

>**Overloads:**

>>files: (String) Name of the file

>>content: (String) contents of the file

## Array ##

### aggregate ###

>**Info:** Array class extension to perform mongo style aggregation

>**Return:** (Array)

>**Parameters:**

>>pipelines: (Object[]) Array of stages defined in mongodb

>**Overloads:**

### average ###

>**Info:** Array class extension to perform average of all the values (any value which is not a number is 0).

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### find ###

>**Info:** Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)

>**Return:** (Array)

>**Parameters:**

>>condition: (Mixed) Query following find/where clause syntax

>**Overloads:**

>>condition: (Mixed) Query following find/where clause syntax

>>projection: (Mixed) Indicate which properties to return

---
>>condition: (Mixed) Query following find/where clause syntax

>>useReference: (Bool) Flag to make a copy instead of using references

### findOne ###

>**Info:** Array class extension to use mongo or sql queries returning the first item match

>**Return:** (Object)

>**Parameters:**

>>condition: (Mixed) Query following find/where clause syntax

>**Overloads:**

>>condition: (Mixed) Query following find/where clause syntax

>>projection: (Mixed) Indicate which properties to return

---
>>condition: (Mixed) Query following find/where clause syntax

>>useReference: (Bool) Flag to make a copy instead of using references

### stdev ###

>**Info:** Array class extension to perform standard deviation (any value which is not a number is 0).

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### sum ###

>**Info:** Array class extension to perform summation of all the values (any value which is not a number is 0).

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### where ###

>**Info:** Array class extension to use mongo or sql queries

>**Return:** (Array)

>**Parameters:**

>>condition: (Mixed) Query following find/where clause syntax

>**Overloads:**

>>condition: (Mixed) Query following find/where clause syntax

>>projection: (Mixed) Indicate which properties to return

---
>>condition: (Mixed) Query following find/where clause syntax

>>useReference: (Bool) Flag to make a copy instead of using references

---
>>condition: (Mixed) Query following find/where clause syntax

>>projection: (Mixed) Indicate which properties to return

>>limit: (Int) Limit the number of the results returned.

---
>>condition: (Mixed) Query following find/where clause syntax

>>useReference: (Bool) Flag to make a copy instead of using references

>>limit: (Int) Limit the number of the results returned.

## Date ##

### format ###

>**Info:** Date class extension to convert to formatted string

>**Return:** (String)

>**Parameters:**

>>format: (String) Format syntax to use to to format date

>**Overloads:**

>>format: (String) Format syntax to use to to format date

>>options: (Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset

## Object ##

### getProperty ###

>**Info:** Object class extension to retrieve nested properties without error when property path does not exist

>**Return:** (Mixed)

>**Parameters:**

>>path: (String) Path to nested property

>**Overloads:**

>>path: (String) Path to nested property

>>delimiter: (Char) Separator used to parse path

---
>>path: (String) Path to nested property

>>options: (Object) Options for ignoring inheritance, validPath, etc

---
>>path: (String) Path to nested property

>>delimiter: (Char) Separator used to parse path

>>options: (Object) Options for ignoring inheritance, validPath, etc

## String ##

### fillTemplate ###

>**Info:** String class extension to fill template based on template syntax

>**Return:** (String)

>**Parameters:**

>>objs: (Objects[]) Objects to fill the template variables

>**Overloads:**

>>objs: (Objects[]) Objects to fill the template variables

>>offset: (Int) The start index of the Object array

>>max: (Int) The maximum number of records to process

---
>>objs: (Objects[]) Objects to fill the template variables

>>max: (Int) The maximum number of records to process



##** Methods **##

---

## Global ##

### Benchmarker ###

>**Info:** Class used to measure the run time of code

>**Return:** (void)

>**Parameters:**

>>None

>**Overloads:**

### ChromeVersion ###

>**Info:** Get Chrome version

>**Return:** (Float)

>**Parameters:**

>>None

>**Overloads:**

### Cursor ###

>**Info:** Cursor class to facilitate iteration

>**Return:** (Cursor)

>**Parameters:**

>>records: (Array) Array used to create the iterator to iterate each item

>**Overloads:**

>>records: (Object) Object used to create the iterator to iterate each property

### FirefoxVersion ###

>**Info:** Get Firefox version

>**Return:** (Float)

>**Parameters:**

>>None

>**Overloads:**

### IEVersion ###

>**Info:** Get Internet Explorer version

>**Return:** (Float)

>**Parameters:**

>>None

>**Overloads:**

### OperaVersion ###

>**Info:** Get Opera version

>**Return:** (Float)

>**Parameters:**

>>None

>**Overloads:**

### OrderedList ###

>**Info:** Collection class that filters out duplicate values and maintains an ordered list

>**Return:** (OrderedList)

>**Parameters:**

>>None

>**Overloads:**

>>records: (Array) Array used to create the initial items in the ordered list

---
>>records: (Array) Array used to create the initial items in the ordered list

>>sorter: (Function) Function for sorting logic

### Queue ###

>**Info:** Collection class that follows FIFO

>**Return:** (Queue)

>**Parameters:**

>>records: (Array) Array used to create the iterator to iterate each item

>**Overloads:**

### SafariVersion ###

>**Info:** Get Safari version

>**Return:** (Float)

>**Parameters:**

>>None

>**Overloads:**

### Set ###

>**Info:** Collection class that filters out duplicate values

>**Return:** (Set)

>**Parameters:**

>>records: (Array) Array used to create the iterator to iterate each item

>**Overloads:**

### addObjectPrototype ###

>**Info:** Method to extend the Object Class

>**Return:** (void)

>**Parameters:**

>>name: (String) name of the method to add

>>fn: (Function) method implementation

>**Overloads:**

>>name: (String) name of the method to add

>>fn: (Function) method implementation

>>override: (Bool) if true, override the previously defined prototype

### ajax ###

>**Info:** Method to make ajax calls

>**Return:** (void)

>**Parameters:**

>>params: (Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess

>**Overloads:**

>>params: (Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess

>>returnData: (String) Specifies which data to return when using Promise pattern

### clusterit ###

>**Info:** Enable clustering

>**Return:** (void)

>**Parameters:**

>>callback: Method to call for Workers.  Callback is passed the cluster object as an argument.

>**Overloads:**

### cout ###

>**Info:** Log to console when DEBUG_MODE is true and when the console is available

>**Return:** (void)

>**Parameters:**

>>infinite: any number of arguments can be passed.

>**Overloads:**

### cuid ###

>**Info:** Creates a Craydent/Global Unique Identifier

>**Return:** (String)

>**Parameters:**

>>msFormat: (Bool) use microsoft format if true

>**Overloads:**

### echo ###

>**Info:** Echo to buffer and use in response

>**Return:** (void)

>**Parameters:**

>>output: Data to send in response

>**Overloads:**

### emit ###

>**Info:** Call the next function(s) in queue

>**Return:** (void)

>**Parameters:**

>>event: Event to trigger.

>**Overloads:**

>>event: Event to trigger.

>>infinite: any number of arguments can be passed and will be applied to listening functions.

### end ###

>**Info:** Call the next function(s) in queue

>**Return:** (void)

>**Parameters:**

>>event: Event to trigger.

>**Overloads:**

>>event: Event to trigger.

>>infinite: any number of arguments can be passed and will be applied to listening functions.

### error ###

>**Info:** User implemented place holder function to handle errors

>**Return:** (void)

>**Parameters:**

>>fname: (String) The function name the error was thrown

>>e: (Error) Exception object thrown

>**Overloads:**

### exclude ###

>**Info:** Exclude prototyping

>**Return:** (void)

>**Parameters:**

>>list: (String[]) Array of strings in containing the property to exclude from prototyping.

>**Overloads:**

### foo ###

>**Info:** Place holder function for a blank function

>**Return:** (void)

>**Parameters:**

>>None

>**Overloads:**

### getSession ###

>**Info:** Retrieve the session object when used in conjunction with createServer

>**Return:** (void)

>**Parameters:**

>>sid: (String) Session id of the session object to retrieve syncronously.

>**Overloads:**

>>sid: (String) Session id of the session object to retrieve.

>>callback: (Function) callback function to invoke once the session object is retrieved.

### getSessionID ###

>**Info:** Retrieve the session id when used in conjunction with createServer

>**Return:** (void)

>**Parameters:**

>>None

>**Overloads:**

### getSessionSync ###

>**Info:** Syncronously retrieve the session object when used in conjunction with createServer

>**Return:** (void)

>**Parameters:**

>>sid: (String) Session id of the session object to retrieve syncronously.

>**Overloads:**

### header ###

>**Info:** Set Http Headers to send

>**Return:** (void)

>**Parameters:**

>>header: (String) Http header.

>**Overloads:**

>>headers: (Object) Http headers.

---
>>header: (String) Http header.

>>code: (Integer) Http response code.

---
>>headers: (Object) Http headers.

>>code: (Integer) Http response code.

### include ###

>**Info:** Require without erroring when module does not exist.

>**Return:** (Mixed)

>**Parameters:**

>>path: (String) Module or Path to module.

>**Overloads:**

### isAmaya ###

>**Info:** Check if browser is Amaya

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isAndroid ###

>**Info:** Check if device is Android

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isBlackBerry ###

>**Info:** Check if device is BlackBerry

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isChrome ###

>**Info:** Check if browser is Chrome

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isFirefox ###

>**Info:** Check if browser is Firefox

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isGecko ###

>**Info:** Check if engine is Gecko

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isIE ###

>**Info:** Check if browser is Internet Explorer

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isIE6 ###

>**Info:** Check if browser is Internet Explorer 6

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isIPad ###

>**Info:** Check if device is iPad

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isIPhone ###

>**Info:** Check if device is IPhone

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isIPod ###

>**Info:** Check if device is IPod

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isKHTML ###

>**Info:** Check if engine is KHTML

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isLinux ###

>**Info:** Check if OS is Linux

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isMac ###

>**Info:** Check if OS is Mac Based

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isNull ###

>**Info:** Check if a value is Null

>**Return:** (Mixed)

>**Parameters:**

>>value: (Mixed) Value to check

>**Overloads:**

>>value: (Mixed) Value to check

>>defaultValue: (Mixed) Value to return if null

### isOpera ###

>**Info:** Check if browser is Opera

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isPalmOS ###

>**Info:** Check if OS is PalmOS

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isPresto ###

>**Info:** Check if engine is Presto

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isPrince ###

>**Info:** Check if engine is Prince

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isSafari ###

>**Info:** Check if browser is Safari

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isSymbian ###

>**Info:** Check if OS is Symbian

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isTrident ###

>**Info:** Check if engine is Trident

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isWebkit ###

>**Info:** Check if engine is Webkit

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isWindows ###

>**Info:** Check if OS is Windows

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isWindowsMobile ###

>**Info:** Check if device is Windows Mobile

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### logit ###

>**Info:** Log to console when DEBUG_MODE is true and when the console is available

>**Return:** (void)

>**Parameters:**

>>infinite: any number of arguments can be passed.

>**Overloads:**

### md5 ###

>**Info:** MD5 encode a string.

>**Return:** (String)

>**Parameters:**

>>str: (String) String to encode.

>**Overloads:**

### mkdirRecursive ###

>**Info:** Recursively create folders.

>**Return:** (void)

>**Parameters:**

>>path: (String) Path to create.

>>callback: (Function) Method to call when directories are created (Gets passed error object as an argument and is null if there were no errors).

>**Overloads:**

### namespace ###

>**Info:** Adds the class to a namespace instead of the global space

>**Return:** (void)

>**Parameters:**

>>name: (String) Name of the namespace to add to.

>>clazz: (Class) Class to add to the given namespace

>**Overloads:**

>>name: (String) Name of the namespace to add to.

>>clazz: (Class) Class to add to the given namespace

>>fn: (Function) Method to call after the class has been added to the namespace

### next ###

>**Info:** Call the next function(s) in queue

>**Return:** (void)

>**Parameters:**

>>infinite: any number of arguments can be passed.

>**Overloads:**

### now ###

>**Info:** Get the DateTime of now

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>format: (String) Format syntax to return formatted string of now

### parseBoolean ###

>**Info:** Try to parse value to a Boolean

>**Return:** (Mixed)

>**Parameters:**

>>value: (Mixed) value to parse as boolean

>**Overloads:**

### parseRaw ###

>**Info:** Creates an evaluable string

>**Return:** (String)

>**Parameters:**

>>value: value to parse

>**Overloads:**

>>value: (Mixed) Value to parse

>>skipQuotes: (Bool) Flag to skip quotes for strings

>>saveCircular: (Bool) Flag to save circular references

### rand ###

>**Info:** Create a random number between two numbers

>**Return:** (Number)

>**Parameters:**

>>num1: (Number) Lower bound

>>num2: (Number) Upper bound

>**Overloads:**

>>num1: (Number) Lower bound

>>num2: (Number) Upper bound

>>inclusive: (Bool) Flag to include the given numbers

### requireDirectory ###

>**Info:** Recursively require the entire directory and returns an object containing the required modules.

>**Return:** (Object)

>**Parameters:**

>>path: (String) Path to directory.

>**Overloads:**

>>path: (String) Path to directory.

>>options: (Char) 'r' Flag to use to indicate recursively require

### send ###

>**Info:** Recursively require the entire directory and returns an object containing the required modules.

>**Return:** (Object)

>**Parameters:**

>>data: (Object) Object to send in response.

>**Overloads:**

>>status: (Integer) Status code for response.

>>data: (Object) Object to send in response.

### suid ###

>**Info:** Creates a short Craydent/Global Unique Identifier

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

>>length: (Integer) Custom length of the short unique identifier

### syncroit ###

>**Info:** Generator based control flow to allow for more "syncronous" programing structure

>**Return:** (Promise)

>**Parameters:**

>>gen: (GeneratorFunction) Generator function to execute

>**Overloads:**

### tryEval ###

>**Info:** Evaluates an expression without throwing an error

>**Return:** (Mixed)

>**Parameters:**

>>expression: (Mixed) Expression to evaluate

>**Overloads:**

>>expression: (Mixed) Expression to evaluate

>>evaluator: (Function) Method to use to evaluate the expression

### var_dump ###

>**Info:** Dump of variables to response.

>**Return:** (void)

>**Parameters:**

>>infinite: any number of arguments can be passed.

>**Overloads:**

### wait ###

>**Info:** Stops execution until the condition is satisfied

>**Return:** (void)

>**Parameters:**

>>condition: (Mixed) Condition equivalent to js true to resume execution

>**Overloads:**

### xmlToJson ###

>**Info:** Converts XML to JSON

>**Return:** (Object)

>**Parameters:**

>>xml: (Mixed) XML string or XML DOM

>**Overloads:**

>>xml: (Mixed) XML string or XML DOM

>>ignoreAttributes: (Bool) Flag to ignore attributes

### yieldable ###

>**Info:** Makes a value yieldable via a Promise.

>**Return:** (Promise)

>**Parameters:**

>>value: (Mixed) Value to make yieldable

>**Overloads:**

>>func: (Function) Function to make yieldable

>>context: (Mixed) Context to use to execute func.

---
>>func: (Function) Function to make yieldable

>>callbackIndex: (Integer) Index of callback argument.

---
>>func: (Function) Function to make yieldable

>>context: (Mixed) Context to use to execute func.

>>callbackIndex: (Integer) Index of callback argument.

### writeSession ###

>**Info:** Writes session to filesystem to be retrieved later.

>**Return:** (void)

>**Parameters:**

>>None

>**Overloads:**

## Array ##

### buildTree ###

>**Info:** Array class extension to create a parent/child hierarchy

>**Return:** (Array)

>**Parameters:**

>>parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.

>>childFinder: (String) Property name of the object to use as a grouping.

>**Overloads:**

>>parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.

>>childFinder: (Function) Function to determine the grouping.

---
>>parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.

>>childFinder: (String) Property name of the object to use as a grouping.

>>options: (Object) Options to customize properties,  Valid property is:<br />childProperty

---
>>parentFinder: (Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument.

>>childFinder: (String) Property name of the object to use as a grouping.

>>options: (Object) Options to customize properties,  Valid property is:<br />childProperty

### condense ###

>**Info:** Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

>>check_values: (Bool) Flag to remove duplicates

### createIndex ###

>**Info:** Array class extension to create indexes for faster searches during where

>**Return:** (Array)

>**Parameters:**

>>properties: (String) Property or comma delimited property list to index.

>**Overloads:**

>>indexes: (String[]) Array of properties to index

### createServer ###

>**Info:** Array class extension to do an inner join on arrays

>**Return:** (Server)

>**Parameters:**

>>callback: (Function) Function to callback when a request is received

>**Overloads:**

>>callback: (Function) Function to callback when a request is received

>>createServer: (Object) Options for creating the server (ex: {createServer:require('http').createServer})

### delete ###

>**Info:** Array class extension to delete records

>**Return:** (Array)

>**Parameters:**

>>condition: (Mixed) Query following find/where clause syntax

>**Overloads:**

>>condition: (Mixed) Query following find/where clause syntax

>>justOne: (Boolean) Flag for deleting just one records [Default is: true]

### distinct ###

>**Info:** Array class extension to get all unique records by fields specified

>**Return:** (Array)

>**Parameters:**

>>fields: (String) Fields to use as the projection and unique comparison (comma delimited)

>**Overloads:**

>>fields: (Array) Fields to use as the projection and unique comparison

---
>>fields: (String) Fields to use as the projection and unique comparison (comma delimited)

>>condition: (String) Query following SQL where clause syntax

---
>>fields: (Array) Fields to use as the projection and unique comparison (comma delimited)

>>condition: (String) Query following SQL where clause syntax

---
>>fields: (String) Fields to use as the projection and unique comparison (comma delimited)

>>condition: (Object) Query following MongoDB find clause syntax

---
>>fields: (Array) Fields to use as the projection and unique comparison (comma delimited)

>>condition: (Object) Query following MongoDB find clause syntax

### filter ###

>**Info:** Array class extension to implement filter

>**Return:** (Array)

>**Parameters:**

>>func: (Function) Callback function used to determine if value should be returned

>**Overloads:**

>>func: (Function) Callback function used to determine if value should be returned

>>craydent_thiss: (Mixed) Specify the context on callback function

### group ###

>**Info:** Array class extension to group records by fields

>**Return:** (Array)

>**Parameters:**

>>params: (Object) specs with common properties:<br />(Object) key<br />(Mixed) cond<br />(Function) reduce<br />(Object) initial

>**Overloads:**

### indexOf ###

>**Info:** Array class extension to implement indexOf

>**Return:** (Int)

>**Parameters:**

>>value: (Mixed) value to find

>**Overloads:**

### indexOfAlt ###

>**Info:** Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression

>**Return:** (Integer)

>**Parameters:**

>>value: (Mixed) value to find

>>func: (Function) Callback function used to do the comparison

>**Overloads:**

>>regex: (RegExp) Regular expression to check value against

---
>>regex: (RegExp) Regular expression to check value against

>>pos: (Int) Index offset to start

### innerJoin ###

>**Info:** Array class extension to do an inner join on arrays

>**Return:** (Array)

>**Parameters:**

>>arr: (Array) Array to be joined with

>>on: (String) Condition to join on

>**Overloads:**

### insert ###

>**Info:** Array class extension to add to the array

>**Return:** (Bool)

>**Parameters:**

>>value: (Mixed) value to add

>**Overloads:**

### insertAfter ###

>**Info:** Array class extension to add to the array after a specific index

>**Return:** (Bool)

>**Parameters:**

>>index: (Int) Index to add after

>>value: (Mixed) Value to add

>**Overloads:**

### insertAt ###

>**Info:** Array class extension to add to the array at a specific index and push the all indexes down

>**Return:** (Bool)

>**Parameters:**

>>index: (Int) Index to add after

>>value: (Mixed) Value to add

>**Overloads:**

### insertBefore ###

>**Info:** Array class extension to add to the array before a specific index

>**Return:** (Bool)

>**Parameters:**

>>index: (Int) Index to add before

>>value: (Mixed) Value to add

>**Overloads:**

### joinLeft ###

>**Info:** Array class extension to do an outer left join on arrays

>**Return:** (Array)

>**Parameters:**

>>arr: (Array) Secondary array to be joined with

>>on: (String) Condition to join on

>**Overloads:**

### joinRight ###

>**Info:** Array class extension to do an outer right join on arrays

>**Return:** (Array)

>**Parameters:**

>>arr: (Array) Secondary array to be joined with

>>on: (String) Condition to join on

>**Overloads:**

### limit ###

>**Info:** Array class extension to return a limited amount of items

>**Return:** (Array)

>**Parameters:**

>>max: (Int) Maximum number of items to return

>**Overloads:**

>>max: (Int) Maximum number of items to return

>>skip: (Int) Number of items to skip

### mapReduce ###

>**Info:** Array class extension to run map-reduce aggregation over records

>**Return:** (Array)

>**Parameters:**

>>map: (Function) Function to apply to each item

>>reduce: (Function) Function used to condense the items

>**Overloads:**

>>map: (Function) Function to apply to each item

>>reduce: (Function) Function used to condense the items

>>options: (Object) Options specified in the Mongo Doc

### normalize ###

>**Info:** Array class extension to normalize all properties in the object array

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### remove ###

>**Info:** Array class extension to remove an item by value

>**Return:** (Mixed)

>**Parameters:**

>>value: (Mixed) Value to remove

>**Overloads:**

>>value: (Mixed) Value to remove

>>indexOf: (Function) Callback function to use to find the item based on the value

### removeAll ###

>**Info:** Array class extension to remove all items by value

>**Return:** (Array)

>**Parameters:**

>>value: (Mixed) Value to remove

>**Overloads:**

>>value: (Mixed) Value to remove

>>indexOf: (Function) Callback function to use to find the item based on the value

### removeAt ###

>**Info:** Array class extension to remove item at a specific index

>**Return:** (Mixed)

>**Parameters:**

>>index: (Int) Index of the item to remove

>**Overloads:**

### replaceAt ###

>**Info:** Array class extension to replace item at a specific index

>**Return:** (Array)

>**Parameters:**

>>index: (Int) Index of the item to remove

>>value: (Mixed) Value to replace with

>**Overloads:**

### scramble ###

>**Info:** Array class extension to scramble the order.

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### sortBy ###

>**Info:** Array class extension to sort the array

>**Return:** (Array)

>**Parameters:**

>>props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

>**Overloads:**

>>props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

---
>>props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

---
>>props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

---
>>props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

---
>>props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

---
>>props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

>>lookup: (Object) Look up object to use as values instead of the array values.

---
>>props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

>>lookup: (Object) Look up object to use as values instead of the array values.

---
>>props: (String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

>>lookup: (Object) Look up object to use as values instead of the array values.

>>options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

---
>>props: (Array) Properties to sort by. If the first character is '!', the sort order is reversed

>>rev: (Boolean) Flag to reverse the sort

>>primer: (Function) Function to apply to values in the array.

>>lookup: (Object) Look up object to use as values instead of the array values.

>>options: (Object) Options to pass. Valid options are:<br />i<br />ignoreCase

### toSet ###

>**Info:** Array class extension to convert the array to a set

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### trim ###

>**Info:** Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

>>ref: (Boolean) Whether or not to mutate the original array.

---
>>character: (Char[]) Character to remove in the String

### update ###

>**Info:** Array class extension to update records in the array

>**Return:** (Array)

>**Parameters:**

>>condition: (Mixed) Query following find/where clause syntax

>>setClause: (Mixed) Set clause used to update the records

>**Overloads:**

>>condition: (Mixed) Query following find/where clause syntax

>>setClause: (Mixed) Set clause used to update the records

>>options: (Object) Options to specify if mulit update and/or upsert

### upsert ###

>**Info:** Array class extension to upsert records to array

>**Return:** (Object)

>**Parameters:**

>>records: (Array) Records to use to insert/update array

>**Overloads:**

>>records: (Array) Records to use to insert/update array

>>callback: (Function) Method to use to determine if the records are equal

---
>>records: (Array) Records to use to insert/update array

>>prop: (String) Property to use as the primary key

---
>>records: (Array) Records to use to insert/update array

>>prop: (String) Property to use as the primary key

>>callback: (Function) Method to use to determine if the records are equal

## Date ##

### getDayOfYear ###

>**Info:** Date class extension to retrieve the day of the year

>**Return:** (Int)

>**Parameters:**

>>None

>**Overloads:**

### getWeek ###

>**Info:** Date class extension to retrieve the week number in the year

>**Return:** (Int)

>**Parameters:**

>>None

>**Overloads:**

### isValidDate ###

>**Info:** Date class extension to check if the date is valid

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

## Function ##

### catch ###

>**Info:** Function listener to register the catch event

>**Return:** (String)

>**Parameters:**

>>func: (Function) Function to call on emit

>**Overloads:**

### extends ###

>**Info:** Function class extension to extend another class

>**Return:** (Function)

>**Parameters:**

>>extendee: (Object) Class to extend

>**Overloads:**

>>extendee: (Object) Class to extend

>>inheritAsOwn: (Boolean) Flag to inherit and for values hasOwnProperty to be true.

### getName ###

>**Info:** Function class extension to get the name of the function

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### getParameters ###

>**Info:** Function class extension to get parameters in definition

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### on ###

>**Info:** Function listener to register events

>**Return:** (String)

>**Parameters:**

>>event: (String) Event to listen on and invoked on emit

>>func: (Function) Function to call on emit

>**Overloads:**

### then ###

>**Info:** Function listener to register the then event

>**Return:** (String)

>**Parameters:**

>>func: (Function) Function to call on emit

>**Overloads:**

### toPromise ###

>**Info:** Function listener to register events

>**Return:** (String)

>**Parameters:**

>>event: (String) Event to listen on and invoked on emit

>>func: (Function) Function to call on emit

>**Overloads:**

## Module ##

### globalize ###

>**Info:** Module method to globalize functions

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

## Number ##

### aboutEqualTo ###

>**Info:** Number class extension to check if values are approximately equal

>**Return:** (Bool)

>**Parameters:**

>>compare: (Number) Number to compare

>>giveOrTake: (Number) Plus/minus value

>**Overloads:**

### isEven ###

>**Info:** Number class extension to check if number is even

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isOdd ###

>**Info:** Number class extension to check if number is odd

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

## Object ##

### changes ###

>**Info:** Object class extension to compare properties that have changed

>**Return:** (Object)

>**Parameters:**

>>compare: (Object) Object to compare against

>**Overloads:**

### contains ###

>**Info:** Object class extension to check if value exists

>**Return:** (Bool)

>**Parameters:**

>>val: (Mixed) Value to check or custom function to determine validity

>**Overloads:**

>>val: (Mixed) Value to check

>>func: (Function) Callback function used to do the comparison

---
>>arr: (Array) Array of values to return first matching value

### copyObject ###

>**Info:** Object class extension to copy an object excluding constructor

>**Return:** (Object)

>**Parameters:**

>>None

>**Overloads:**

### count ###

>**Info:** Object class extension to count the properties in the object/elements in arrays/characters in strings.

>**Return:** (Int)

>**Parameters:**

>>None

>**Overloads:**

>>option: (Mixed) Query used in Array.where when counting elements in an Array

---
>>option: (String) Word or phrase to count in the String

---
>>option: (RegExp) Word or phrase pattern to count in the String

### duplicate ###

>**Info:** Object class extension to copy an object including constructor

>**Return:** (Object)

>**Parameters:**

>>None

>**Overloads:**

>>recursive: (Boolean) Flag to copy all child objects recursively

### eachProperty ###

>**Info:** Object class extension to loop through all properties where hasOwnValue is true.

>**Return:** (Object)

>**Parameters:**

>>callback: (Function) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed

>**Overloads:**

### equals ###

>**Info:** Object class extension to check if object values are equal

>**Return:** (Bool)

>**Parameters:**

>>compare: (Object) Object to compare against

>**Overloads:**

>>compare: (Object) Object to compare against

>>props: (String[]) Array of property values to compare against

### every ###

>**Info:** Object class extension to check property values against a function

>**Return:** (Bool)

>**Parameters:**

>>callback: (Function) Callback to apply to each value

>**Overloads:**

>>callback: (Function) Callback to apply to each value

>>craydent_thisObject: (Mixed) Context for the callback function

### getClass ###

>**Info:** Object class extension to get the constructor name

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### getKeys ###

>**Info:** Object class extension to get the keys of the object

>**Return:** (Array)

>**Parameters:**

>>None

>**Overloads:**

### getValue ###

>**Info:** Object class extension to retrieve value of an object property

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>dflt: (Mixed) Default value to return if context is not a function

---
>>args: (Mixed[]) An array of arguments to pass to context when it is a function

>>dflt: (Mixed) Default value to return if context is not a function

### has ###

>**Info:** Alias to Object.prototype.hasOwnProperty

>**Return:** (Boolean)

>**Parameters:**

>>property: (String) Property name to check

>**Overloads:**

### isArray ###

>**Info:** Object class extension to check if object is an array

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isBetween ###

>**Info:** Object class extension to check if object is between lower and upper bounds

>**Return:** (Bool)

>**Parameters:**

>>lowerBound: (Mixed) Lower bound comparison

>>upperBound: (Mixed) Upper bound comparison

>**Overloads:**

>>lowerBound: (Mixed) Lower bound comparison

>>upperBound: (Mixed) Upper bound comparison

>>inclusive: (Bool) Flag to include give bounds

### isBoolean ###

>**Info:** Object class extension to check if object is a boolean

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isDate ###

>**Info:** Object class extension to check if object is a date

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isDomElement ###

>**Info:** Object class extension to check if object is a DOM element

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isEmpty ###

>**Info:** Object class extension to check if it is empty

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isFloat ###

>**Info:** Object class extension to check if object is a float

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isFunction ###

>**Info:** Object class extension to check if object is a function

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isGenerator ###

>**Info:** Object class extension to check if object is a generator function

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isGeolocation ###

>**Info:** Object class extension to check if object is a geolocation

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isInt ###

>**Info:** Object class extension to check if object is an integer

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isNumber ###

>**Info:** Object class extension to check if object is a number

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isObject ###

>**Info:** Object class extension to check if object is an object

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isPromise ###

>**Info:** Object class extension to check if object is a promise object

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isRegExp ###

>**Info:** Object class extension to check if object is a RegExp

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isString ###

>**Info:** Object class extension to check if object is a string

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isSubset ###

>**Info:** Object class extension to check if item is a subset

>**Return:** (Bool)

>**Parameters:**

>>compare: (Mixed) Superset to compare against

>**Overloads:**

### itemCount ###

>**Info:** Object class extension to count the properties in item

>**Return:** (Int)

>**Parameters:**

>>None

>**Overloads:**

### keyOf ###

>**Info:** Object class extension to get the key of the give value

>**Return:** (String)

>**Parameters:**

>>value: (Mixed) Value to compare against

>**Overloads:**

### map ###

>**Info:** Object class extension to apply method to every value

>**Return:** (void)

>**Parameters:**

>>callback: (Function) Callback to apply to each value

>**Overloads:**

>>callback: (Function) Callback to apply to each value

>>craydent_thisObject: (Mixed) Context for the callback function

### merge ###

>**Info:** Object class extension to merge objects

>**Return:** (Object)

>**Parameters:**

>>secondary: (Object) Object to merge with

>**Overloads:**

>>secondary: (Object) Object to merge with

>>condition: (Mixed) Flags to recurse, merge only shared value, clone, intersect etc

### setProperty ###

>**Info:** Object class extension to set nested properties creating necessary property paths

>**Return:** (Bool)

>**Parameters:**

>>path: (String) Path to nested property

>>value: (Mixed) Value to set

>**Overloads:**

>>path: (String) Path to nested property

>>value: (Mixed) Value to set

>>delimiter: (Char) Separator used to parse path

---
>>path: (String) Path to nested property

>>delimiter: (Char) Separator used to parse path

>>value: (Mixed) Value to set

>>options: (Object) Options for ignoring inheritance, validPath, etc

### toStringAlt ###

>**Info:** Object class extension for an alternate way to stringify object to formatted string

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

>>delimiter: (Char) Character to separate the property from the value

---
>>delimiter: (Char) Character to separate the property from the value

>>prefix: (Char) Character to prefix the property name

---
>>delimiter: (Char) Character to separate the property from the value

>>prefix: (Char) Character to prefix the property name

>>urlEncode: (Bool) Flag to url encode the property and value

## RegExp ##

### addFlags ###

>**Info:** RegExp class extension to add flags to regex

>**Return:** (RegExp)

>**Parameters:**

>>flags: (String) Flags to add

>**Overloads:**

## String ##

### acronymize ###

>**Info:** String class extension to capitalize parts of the string

>**Return:** (String)

>**Parameters:**

>>capsOnly: (Boolean) Flag to indicate to use capital letters only.

>**Overloads:**

>>match: (RegExp) Pattern to match to qualify the Acronym.

---
>>capsOnly: (Boolean) Flag to indicate to use capital letters only.

>>delimiter: (String) Character that delimits the string.

---
>>match: (RegExp) Pattern to match to qualify the Acronym.

>>delimiter: (String) Character that delimits the string.

---
>>capsOnly: (Boolean) Flag to indicate to use capital letters only.

>>delimiter: (RegExp) RegExp pattern that delimits the string.

---
>>match: (RegExp) Pattern to match to qualify the Acronym.

>>delimiter: (RegExp) RegExp pattern that delimits the string.

### capitalize ###

>**Info:** String class extension to capitalize parts of the string

>**Return:** (String)

>**Parameters:**

>>pos: (Int[]) Index of the string to capitalize

>**Overloads:**

>>pos: (Int) Index of the string to capitalize

>>everyWord: (Bool) Flag to capital every word

### convertUTCDate ###

>**Info:** String class extension to convert date string to UTC format

>**Return:** (String)

>**Parameters:**

>>delimiter: (String) Character that delimits the date string

>**Overloads:**

### cut ###

>**Info:** String class extension to remove between the provided indexes

>**Return:** (String)

>**Parameters:**

>>start_index: (Integer) Start index to cut

>>end_index: (Integer) End index to cut

>**Overloads:**

>>start_index: (Integer) Start index to cut

>>end_index: (Integer) End index to cut

>>replacement: (String) String to put in place of the cut

### ellipsis ###

>**Info:** String class extension to shorten by ellipsis

>**Return:** (String)

>**Parameters:**

>>before: (Int) Number of characters to use before using ellipsis

>**Overloads:**

>>before: (Int) Number of characters to use before using ellipsis

>>after: (Int) Number of characters to use after the ellipsis

### endsWith ###

>**Info:** String class extension to check if the string ends with the given string

>**Return:** (Mix)

>**Parameters:**

>>infinite: any number of arguments can be passed

>**Overloads:**

>>arr: (String[]) An array of strings to check

### endsWithAny ###

>**Info:** String class extension to check if the string ends with the given string

>**Return:** (Mix)

>**Parameters:**

>>infinite: any number of arguments can be passed

>**Overloads:**

>>arr: (String[]) An array of strings to check

### highlight ###

>**Info:** String class extension to surround search words with the given tag(default span) and class (default chighlight)

>**Return:** (String)

>**Parameters:**

>>search: (String) String to search

>**Overloads:**

>>search: (RegExp) Regular expression to search

---
>>search: (String) String to search

>>cssClass: (String) Class to add for highlighting

---
>>search: (RegExp) Regular expression to search

>>cssClass: (String) Class to add for highlighting

---
>>search: (String) String to search

>>cssClass: (String) Class to add for highlighting

>>tag: (String) Tag to use to surround the search

---
>>search: (RegExp) Regular expression to search

>>cssClass: (String) Class to add for highlighting

>>tag: (String) Tag to use to surround the search

### ireplace_all ###

>**Info:** String class extension to replace all substrings ignoring case

>**Return:** (String)

>**Parameters:**

>>replace: (String) String to replace

>>subject: (String) String to replace with

>**Overloads:**

### isBlank ###

>**Info:** String class extension to check if the string is empty

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### isCuid ###

>**Info:** String class extension to check if the string is a cuid

>**Return:** (Bool)

>**Parameters:**

>>msFormat: (Bool) use microsoft format if true

>**Overloads:**

### isValidEmail ###

>**Info:** String class extension to check if string is a valid email

>**Return:** (Bool)

>**Parameters:**

>>None

>**Overloads:**

### lastIndexOfAlt ###

>**Info:** String class extension to find the last index based on a regular expression

>**Return:** (Int)

>**Parameters:**

>>regex: (RegExp) Regular expression to check value against

>**Overloads:**

>>regex: (RegExp) Regular expression to check value against

>>pos: (Int) Max index to go up to in the search

### ltrim ###

>**Info:** String class extension to remove characters from the beginning of the string

>**Return:** (String)

>**Parameters:**

>>character: (Char[]) Character to remove

>**Overloads:**

### pluralize ###

>**Info:** String class extension to do a best guess pluralization of the string

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### replace_all ###

>**Info:** String class extension to replace all substrings (case sensitive)

>**Return:** (String)

>**Parameters:**

>>replace: (String) String to replace

>>subject: (String) String to replace with

>**Overloads:**

>>replace: (String[]) Array of string to replace

>>subject: (String[]) Array of string to replace with

### reverse ###

>**Info:** String class extension to reverse the string

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### rtrim ###

>**Info:** String class extension to remove characters from the end of the string

>**Return:** (String)

>**Parameters:**

>>character: (Char[]) Character to remove

>**Overloads:**

### sanitize ###

>**Info:** String class extension to remove potential XSS threats

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### singularize ###

>**Info:** String class extension to do a best guess singularization of the string

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

### startsWith ###

>**Info:** String class extension to check if the string starts with the given string

>**Return:** (Bool)

>**Parameters:**

>>infinite: any number of String arguments can be passed

>**Overloads:**

>>arr: (String[]) An array of strings to check

### startsWithAny ###

>**Info:** String class extension to check if the string starts with the given string

>**Return:** (Bool)

>**Parameters:**

>>infinite: any number of String arguments can be passed

>**Overloads:**

>>arr: (String[]) An array of strings to check

### strip ###

>**Info:** String class extension to remove characters from the beginning and end of the string

>**Return:** (String)

>**Parameters:**

>>character: (Char[]) Character to remove

>**Overloads:**

### toCurrencyNotation ###

>**Info:** Number/String class extension to change number to currency

>**Return:** (String)

>**Parameters:**

>>None

>**Overloads:**

>>separator: (Char) Character to use as delimiter

### toDateTime ###

>**Info:** String class extension to convert string to datetime

>**Return:** (Mixed)

>**Parameters:**

>>None

>**Overloads:**

>>options: (Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format

### toObject ###

>**Info:** String class extension to convert to JSON

>**Return:** (Object)

>**Parameters:**

>>None

>**Overloads:**

>>assignmentChar: (Char) Character to use as assignment delimiter. Defaults to '='.

---
>>assignmentChar: (Char) Character to use as assignment delimiter. Defaults to '&'.

>>delimiter: (Char) Character to use as pair delimiter

