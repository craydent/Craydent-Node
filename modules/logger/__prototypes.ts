
import * as ILogger from '../methods/logger';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const logger: typeof ILogger.default = require('../methods/logger').default;
//#endregion

export { logger };