global.__craydentNoConflict = true;
var craydent = require('./craydent.js');
delete global.__craydentNoConflict;
delete global.$c;
delete global.navigator;
module.exports = craydent;