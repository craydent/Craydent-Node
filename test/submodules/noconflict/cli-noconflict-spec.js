var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-cli/noConflict.js'); }
else { $c = require('../../../noConflict.js'); }
$c.DEBUG_MODE = true;
