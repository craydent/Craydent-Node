import * as IParseAdvanced from '../methods/parseAdvanced';
import * as IStringifyAdvanced from '../methods/stringifyAdvanced';

//#region dependencies
const parseAdvanced: typeof IParseAdvanced.default = require('../methods/parseAdvanced').default;
const stringifyAdvanced: typeof IStringifyAdvanced.default = require('../methods/stringifyAdvanced').default;
//#endregion

export { parseAdvanced, stringifyAdvanced };
