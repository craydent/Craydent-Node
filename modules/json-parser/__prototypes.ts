import * as IParseAdvanced from '../methods/parseadvanced';
import * as IStringifyAdvanced from '../methods/stringifyadvanced';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const parseAdvanced: typeof IParseAdvanced.default = require('../methods/parseadvanced').default;
const stringifyAdvanced: typeof IStringifyAdvanced.default = require('../methods/stringifyadvanced').default;
//#endregion

export { parseAdvanced, stringifyAdvanced };
