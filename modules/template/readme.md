<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent 0.11.2
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-template');
$c.logit($c.VERSION);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent-template/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent-template/global');
logit($c.VERSION);
arr.prototypedMethod(args);
```

## Categories

* [Constants](#markdown-header-constants)
* [Featured](#markdown-header-featured)
* [Template](#markdown-header-template)

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

### Template

*** 
#### _fillTemplate_ 
***

**Info:** Function for templetizing

**Return:** (String)

**Parameters:**

>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* options?: (HelperOptions) Options to use: max,offset,newlineToHtml,preserveNonMatching,removeNewLineFromLogicalSyntax,removeWhitespaceFromLogicalSyntax

**Overloads:**

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* max: (Int) The maximum number of records to process

>Parameters
>* htmlTemplate: (String) Template to be used
>* objs: (Object[]) Objects to fill the template variables
>* offset?: (Int) The start index of the Object array
>* max?: (Int) The maximum number of records to process
>* newlineToHtml?: (Boolean) Flag to replace all new line chars () to the HTML <br /> tag.  Default is true.
>* preserveNonMatching?: (Boolean) Flag to used to leave template variables that were not replaced.
>* removeNewLineFromLogicalSyntax?: (Boolean) Flag to used to remove new lines from logical syntax.
>* removeWhitespaceFromLogicalSyntax?: (Boolean) Flag to used to remove whitespace caused by line formatting from logical syntax.



## Methods




## Download

 * [GitHub](https://github.com/craydent/node-library/modules/template)
 * [BitBucket](https://bitbucket.org/craydent/node-library/modules/template)
 * [GitLab](https://gitlab.com/craydent/node-library/modules/template)
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>