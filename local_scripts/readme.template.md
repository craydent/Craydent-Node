<img src="http://craydent.com/JsonObjectEditor/img/svgs/craydent-logo.svg" width=75 height=75/>

# Craydent ${version}
**by Clark Inada**

Craydent is all inclusive utility library.  There are several ways to use the library in NodeJS.
More detailed documentation on constants can be found at [Craydent Properties](http://www.craydent.com/JsonObjectEditor/docs.html#/property/CraydentNode).
More detailed documentation on methods can be found at [Craydent Methods](http://www.craydent.com/JsonObjectEditor/docs.html#/method/CraydentNode)

${if (${methods} && ${methods.length} > 1)}
```js
// require with prototypes - this require will add prototypes to extend classes and add two constants ($c, $g) to the global space.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent${suffix}');
$c.logit($c.VERSION, $g);
arr.prototypedMethod(args);
```

```js
// require no conflict - this require is the fully modular version with no global constants, prototypes, or methods.
var $c = require('craydent${suffix}/noConflict');
$c.logit($c.VERSION);
$c.prototypedMethod(arr, args);
```

```js
// require global - this require constants and methods in the global space and add prototypes to extend classes.
// $g is an alias to global and $c is the constant containing all the utility methods and properties.
require('craydent${suffix}/global');
logit($c.VERSION, $g);
arr.prototypedMethod(args);
```
${else}
```js
// require - this require is the fully modular version with no global constants, prototypes, or methods.
const ${methods[0].name} = require('craydent${suffix}').default;
```
```ts
// import - this require is the fully modular version with no global constants, prototypes, or methods.
import ${methods[0].name} from 'craydent${suffix}';
```
${end if}
${if (${categories} && ${categories.length})}
## Categories

${foreach ${item} in ${categories}}
* [${item}](#markdown-header-${item.toLowerCase().replace(/\s/g,'-')})
${end foreach}
${end if}

${if (${constants} && ${constants.length})}
<a name='markdown-header-constants'></a>
## Constants

| | | |
| ----- | ----- | ----- |
|${for ${i=0,len=${constants}.length};${i<len};${i++}}
${if (${i+1}%3===0)}\n${end if}
${constants[i].name} (${constants[i].type}) |
${end for}
${end if}

${if (${featured} && ${featured.length})}
<a name='markdown-header-featured'></a>
## Featured


${foreach ${items} in ${featured}}
### ${items.category}

${foreach ${feature} in ${items.features}}
***
#### _${feature.name}_
***

**Info:** ${feature.info}

**Return:** ${feature.return}

**Parameters:**
${if (${feature.parameters.length})}
${foreach ${param} in ${feature.parameters}}
>* ${param}
${end foreach}
${else}
>None
${end if}
${end foreach}
${end foreach}
${end if}

${if (${methods} && ${methods.length} > 1)}
## Methods
${end if}

${foreach ${category} in ${methods}}
<a name='markdown-header-${category.name.toLowerCase()}'></a>
## ${category.name}

${foreach ${func} in ${category.functions}}
${if (${methods} && ${methods.length} > 1)}
***
#### _${func.name}_
***
${end if}

**Info:** ${func.info}

**Return:** ${func.return}

**Parameters:**
${if (${func.parameters.length})}
${foreach ${fparams} in ${func.parameters}}
>* ${fparams}

${end foreach}
${else}
>None
${end if}

**Overloads:**

${if (${func.overloads.length})}
${foreach ${overload} in ${func.overloads}}
>Parameters
${foreach ${oparams} in ${overload}}
>* ${oparams}

${end foreach}
${end foreach}
${else}
>None
${end if}
${end foreach}

${end foreach}


## Download
${declare path=~${suffix}.indexOf('.')?'modules/methods/'+${suffix}.replace('.',''):'modules/'+${suffix}.replace('-','')}
 * [GitHub](https://github.com/craydent/node-library/${if (${suffix})}${path}${end if})
 * [BitBucket](https://bitbucket.org/craydent/node-library/${if (${suffix})}${path}${end if})
 * [GitLab](https://gitlab.com/craydent/node-library/${if (${suffix})}${path}${end if})
Craydent is released under the [Dual licensed under the MIT or GPL Version 2 licenses](http://craydent.com/license).<br>