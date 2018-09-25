var pre = require('../_prep');
var $c;
if (process.env.name == 'single') { $c = require(pre + 'craydent-cli'); }
else { $c = require('../../../index.js'); }
$c.DEBUG_MODE = true;