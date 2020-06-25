
import * as IBenchmarker from '../methods/benchmarker';
import * as ICursor from '../methods/cursor';
import * as IOrderedList from '../methods/orderedList';
import * as IQueue from '../methods/queue';
import * as ISet from '../methods/set';

//#region dependencies
const Benchmarker: typeof IBenchmarker.default = require('../methods/benchmarker');
const Cursor: typeof ICursor.default = require('../methods/cursor');
const OrderedList: typeof IOrderedList.default = require('../methods/orderedList');
const Queue: typeof IQueue.default = require('../methods/queue');
const Set: typeof ISet.default = require('../methods/set');
//#endregion

export { Benchmarker, Cursor, OrderedList, Queue, Set };