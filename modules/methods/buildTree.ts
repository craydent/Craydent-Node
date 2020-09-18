import error from '../methods/error';
import isFunction from '../methods/isFunction';
import { TreeParentFinder, TreeChildFinder, TreeOptions } from '../models/Arrays';
import { __processStage } from '../methods/where';

export default function buildTree<T, TResult>(arr: T[], parentFinder: TreeParentFinder<T>, childFinder: string | TreeChildFinder<T>, options?: TreeOptions): TResult[] {
    try {
        options = options || {};
        let rtnArr = [];
        let i = 0, objt, cats = [], catDict = {}, tmp = {}, singles = {};
        let cprop = options.childProperty || "children";
        while (objt = arr[i++]) {
            let cat = isFunction(childFinder) ? (childFinder as TreeChildFinder<T>)(objt) : objt[childFinder as string],
                rootFound = ~cats.indexOf(cat);

            objt[cprop] = objt[cprop] || [];
            if (parentFinder(objt)) {
                delete singles[cat];

                if (!rootFound && tmp[cat]) {
                    objt[cprop] = tmp[cat];
                }
                tmp[cat] = objt[cprop];

                cats.push(cat);
                catDict[cat] = objt;
                rtnArr.push(objt);
                continue;
            }

            if (!rootFound) {
                singles[cat] = singles[cat] || [];
                singles[cat].push(objt);
                tmp[cat] = tmp[cat] || [];
                tmp[cat].push(objt);
            } else {
                catDict[cat][cprop].push(objt);
            }
        }
        for (let prop in singles) {
            /* istanbul ignore next */
            if (!singles.hasOwnProperty(prop)) { continue; }
            let j = 0, single;
            while (single = singles[prop][j++]) {
                single[cprop] = [];
            }
            rtnArr = rtnArr.concat(singles[prop]);
        }
        return rtnArr;
    } catch (e) /* istanbul ignore next */ {
        error && error('Array.buildTree', e);
        return [];
    }
}