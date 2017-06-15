/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

require('./common');
require('./submodules/array');
require('./submodules/class');
require('./submodules/cli');
require('./submodules/control-flow');
require('./submodules/date');
require('./submodules/fs');
require('./submodules/function');
require('./submodules/http');
require('./submodules/json-parser');
require('./submodules/number');
require('./submodules/object');
require('./submodules/regexp');
require('./submodules/string');
require('./submodules/template');
require('./submodules/typeof');
require('./submodules/utility');
require('./submodules/xml-to-json');

JSON.parseAdvanced = $c.parseAdvanced;
JSON.stringifyAdvanced = $c.stringifyAdvanced;

module.exports = $c;