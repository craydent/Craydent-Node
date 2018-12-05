<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.9.0
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-http');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-http/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-http/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

Note: All methods and properties defined in the http module must be used as a property of the context (this) within the createServer callback method.

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-http');
$c.createServer(function(req, res){ this.$GET(); });
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-http/noConflict');
$c.createServer(function(req, res){ this.$GET(); });
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-http/global');
createServer(function(req, res){ this.$GET(); });
```

## Categories

* [Constants](#markdown-header-constants)
* [Properties](#markdown-header-properties)
* [Featured](#markdown-header-featured)
* [HTTP](#markdown-header-http)

<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
| ACCEPT_ENCODING (String) |IE8 (Boolean) |PUBLIC_IP (String) |
ACCEPT_LANGUAGE (String) |IE_VERSION (Number) |REFERER (String) |
AMAYA (Boolean) |IPAD (Boolean) |REFERER_IP (String) |
ANDROID (Boolean) |IPHONE (Boolean) |RESPONSES (Object) |
BLACKBERRY (Boolean) |IPOD (Boolean) |REST_API_TEMPLATE (String) |
BROWSER (Object) |KHTML (Boolean) |ROUTE_API_PATH (String) |
CHROME (Boolean) |LINUX (Boolean) |ROUTE_LOGO_URL (String) |
CHROME_VERSION (String) |LOCAL_IP (String) |SAFARI (Boolean) |
CLIENT (Object) |MAC (Boolean) |SAFARI_VERSION (String) |
CORES_SUPPORT (Boolean) |MODULES_LOADED (Object) |SERVER (String) |
DEBUG_MODE (Boolean) |OPERA (Boolean) |SERVER_PATH (String) |
DEVICE (Object) |OPERA_VERSION (String) |SYMBIAN (Boolean) |
ENGINE (Object) |ORIGIN (String) |TRIDENT (Boolean) |
EXPOSE_ROUTE_API (Boolean) |OS (Object) |TEMPLATE_TAG_CONFIG (Object) |
FIREFOX (Boolean) |PAGE_NAME (String) |TEMPLATE_VARS (Array) |
FIREFOX_VERSION (String) |PAGE_NAME_RAW (String) |VERBOSE_LOGS (String) |
GEKKO (Boolean) |PALM (Boolean) |VERSION (String) |
HTTP_STATUS_TEMPLATE (Array) |PRAGMA (String) |WEBKIT (Boolean) |
IE (Boolean) |PRESTO (Boolean) |WINDOWS (Boolean) |
IE6 (Boolean) |PRINCE (Boolean) |WINDOWS_MOBILE (Boolean) |
IE7 (Boolean) |PROTOCOL (String) |

<a name='markdown-header-properties'></a>
## Properties

| | | |
| ----- | ----- | ----- |
| $l (Object) |request (Object) |sessionid (String) |
location (Object) |response (Object) |
navigator (Object) |session (Object) |

<a name='markdown-header-featured'></a>
## Featured

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



## Methods

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




## Download

 * [GitHub](https://github.com/craydent/node-library)
 * [BitBucket](https://bitbucket.org/craydent/node-library)
 * [GitLab](https://gitlab.com/craydent/node-library)

Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>