const pre = require('../_prep')();
let path = '../../../noConflict.js';
if (process.env.name == 'single') { path = `${pre}craydent-cli/noConflict`; }
const $c = require(path);
$c.DEBUG_MODE = true;
