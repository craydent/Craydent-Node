const pre = require('../_prep')();
let path = '../../../index.js';
if (process.env.name == 'single') { path = `${pre}craydent-cli`; }
const $c = require(path);
$c.DEBUG_MODE = true;