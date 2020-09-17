
import * as IAjax from '../methods/ajax';
import * as INoop from '../methods/noop';
import * as ICatchAll from '../methods/catchAll';
import * as IClusterit from '../methods/clusterit';
import * as ICuid from '../methods/cuid';
import * as IExclude from '../methods/exclude';
import * as IMd5 from '../methods/md5';
import * as IWait from '../methods/wait';
import * as IJSZip from '../methods/JSZip';
import * as IZipit from '../methods/zipit';
import * as IClearCache from '../methods/clearCache';
import * as ICout from '../methods/cout';
import * as IFoo from '../methods/foo';
import * as ILogit from '../methods/logit';
import * as IInclude from '../methods/include';
import * as IMkdirRecursive from '../methods/mkdirRecursive';
import * as INamespace from '../methods/namespace';
import * as INow from '../methods/now';
import * as IParseBoolean from '../methods/parseBoolean';
import * as IParseRaw from '../methods/parseRaw';
import * as IRand from '../methods/rand';
import * as IRequireDirectory from '../methods/requireDirectory';
import * as ISuid from '../methods/suid';
import * as ISyncroit from '../methods/syncroit';
import * as ITryEval from '../methods/tryEval';

import { scope } from '../private/__common';
scope.eval = str => eval(str);
//#region dependencies
const ajax: typeof IAjax.default = require('../methods/ajax').default;
const noop: typeof INoop.default = require('../methods/noop').default;
const catchAll: typeof ICatchAll.default = require('../methods/catchAll').default;
const clusterit: typeof IClusterit.default = require('../methods/clusterit').default;
const cuid: typeof ICuid.default = require('../methods/cuid').default;
const exclude: typeof IExclude.default = require('../methods/exclude').default;
const md5: typeof IMd5.default = require('../methods/md5').default;
const wait: typeof IWait.default = require('../methods/wait').default;
const JSZip: typeof IJSZip.default = require('../methods/JSZip').default;
const zipit: typeof IZipit.default = require('../methods/zipit').default;
const clearCache: typeof IClearCache.default = require('../methods/clearCache').default;
const cout: typeof ICout.default = require('../methods/cout').default;
const foo: typeof IFoo.default = require('../methods/foo').default;
const logit: typeof ILogit.default = require('../methods/logit').default;
const include: typeof IInclude.default = require('../methods/include').default;
const mkdirRecursive: typeof IMkdirRecursive.default = require('../methods/mkdirRecursive').default;
const namespace: typeof INamespace.default = require('../methods/namespace').default;
const now: typeof INow.default = require('../methods/now').default;
const parseBoolean: typeof IParseBoolean.default = require('../methods/parseBoolean').default;
const parseRaw: typeof IParseRaw.default = require('../methods/parseRaw').default;
const rand: typeof IRand.default = require('../methods/rand').default;
const requireDirectory: typeof IRequireDirectory.default = require('../methods/requireDirectory').default;
const suid: typeof ISuid.default = require('../methods/suid').default;
const syncroit: typeof ISyncroit.default = require('../methods/syncroit').default;
const tryEval: typeof ITryEval.default = require('../methods/tryEval').default;
//#endregion

export {
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
    suid,
    syncroit,
    tryEval
};