
import * as ICLI from '../methods/cli';

import { scope } from '../private/__common';
scope.eval = str => eval(str);
//#region dependencies
const CLI: typeof ICLI.default = require('../methods/cli').default;
//#endregion

export { CLI };