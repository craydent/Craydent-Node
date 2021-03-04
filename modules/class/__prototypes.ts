
import * as IBenchmarker from '../methods/benchmarker';
import * as ICursor from '../methods/cursor';
import * as IOrderedList from '../methods/orderedlist';
import * as IQueue from '../methods/queue';
import * as ISet from '../methods/set';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const Benchmarker: typeof IBenchmarker.default = require('../methods/benchmarker').default;
const Cursor: typeof ICursor.default = require('../methods/cursor').default;
const OrderedList: typeof IOrderedList.default = require('../methods/orderedlist').default;
const Queue: typeof IQueue.default = require('../methods/queue').default;
const Set: typeof ISet.default = require('../methods/set').default;
//#endregion

export { Benchmarker, Cursor, OrderedList, Queue, Set };