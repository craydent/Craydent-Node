import * as IParseAdvanced from '../methods/parseAdvanced';
import * as IStringifyAdvanced from '../methods/stringifyAdvanced';

import { scope } from '../private/__common';
scope.eval = str => eval(str);
//#region dependencies
const parseAdvanced: typeof IParseAdvanced.default = require('../methods/parseAdvanced').default;
const stringifyAdvanced: typeof IStringifyAdvanced.default = require('../methods/stringifyAdvanced').default;
//#endregion

export { parseAdvanced, stringifyAdvanced };
