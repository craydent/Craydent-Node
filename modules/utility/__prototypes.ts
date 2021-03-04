
import * as IAbsolutePath from '../methods/absolutepath';
import * as IAjax from '../methods/ajax';
import * as INoop from '../methods/noop';
import * as ICatchAll from '../methods/catchall';
import * as IClusterit from '../methods/clusterit';
import * as ICuid from '../methods/cuid';
import * as IExclude from '../methods/exclude';
import * as IMd5 from '../methods/md5';
import * as IWait from '../methods/wait';
import * as IJSZip from '../methods/jszip';
import * as IZipit from '../methods/zipit';
import * as IClearCache from '../methods/clearcache';
import * as ICout from '../methods/cout';
import * as IFoo from '../methods/foo';
import * as ILogit from '../methods/logit';
import * as IInclude from '../methods/include';
import * as IMkdirRecursive from '../methods/mkdirrecursive';
import * as INamespace from '../methods/namespace';
import * as INow from '../methods/now';
import * as IParseBoolean from '../methods/parseboolean';
import * as IParseRaw from '../methods/parseraw';
import * as IRand from '../methods/rand';
import * as IRequireDirectory from '../methods/requiredirectory';
import * as IRunFuncArray from '../methods/runfuncarray';
import * as ISuid from '../methods/suid';
import * as ISyncroit from '../methods/syncroit';
import * as ITryEval from '../methods/tryeval';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const absolutePath: typeof IAbsolutePath.default = require('../methods/absolutepath').default;
const ajax: typeof IAjax.default = require('../methods/ajax').default;
const noop: typeof INoop.default = require('../methods/noop').default;
const catchAll: typeof ICatchAll.default = require('../methods/catchall').default;
const clusterit: typeof IClusterit.default = require('../methods/clusterit').default;
const cuid: typeof ICuid.default = require('../methods/cuid').default;
const exclude: typeof IExclude.default = require('../methods/exclude').default;
const md5: typeof IMd5.default = require('../methods/md5').default;
const wait: typeof IWait.default = require('../methods/wait').default;
const JSZip: typeof IJSZip.default = require('../methods/jszip').default;
const zipit: typeof IZipit.default = require('../methods/zipit').default;
const clearCache: typeof IClearCache.default = require('../methods/clearcache').default;
const cout: typeof ICout.default = require('../methods/cout').default;
const foo: typeof IFoo.default = require('../methods/foo').default;
const logit: typeof ILogit.default = require('../methods/logit').default;
const include: typeof IInclude.default = require('../methods/include').default;
const mkdirRecursive: typeof IMkdirRecursive.default = require('../methods/mkdirrecursive').default;
const namespace: typeof INamespace.default = require('../methods/namespace').default;
const now: typeof INow.default = require('../methods/now').default;
const parseBoolean: typeof IParseBoolean.default = require('../methods/parseboolean').default;
const parseRaw: typeof IParseRaw.default = require('../methods/parseraw').default;
const rand: typeof IRand.default = require('../methods/rand').default;
const requireDirectory: typeof IRequireDirectory.default = require('../methods/requiredirectory').default;
const runFuncArray: typeof IRunFuncArray.default = require('../methods/runfuncarray').default;
const suid: typeof ISuid.default = require('../methods/suid').default;
const syncroit: typeof ISyncroit.default = require('../methods/syncroit').default;
const tryEval: typeof ITryEval.default = require('../methods/tryeval').default;
//#endregion

export {
    absolutePath,
    ajax,
    noop,
    catchAll,
    clusterit,
    cuid,
    exclude,
    md5,
    wait,
    JSZip,
    zipit,
    clearCache,
    cout,
    foo,
    logit,
    include,
    mkdirRecursive,
    namespace,
    now,
    parseBoolean,
    parseRaw,
    rand,
    requireDirectory,
    runFuncArray,
    suid,
    syncroit,
    tryEval
};