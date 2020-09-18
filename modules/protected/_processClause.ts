import error from '../methods/error';
import indexOfAlt from '../methods/indexOfAlt';
import tryEval from '../methods/tryEval';
import replaceAll from '../methods/replaceAll';
import _generalTrim from '../protected/_generalTrim';

export default function _processClause(clause: string): any {
    try {
        let index = indexOfAlt(clause, /between/i);
        if (~index) { // contains between predicate
            //replace AND in the between to prevent confusion for AND clause separator
            clause = clause.replace(/between( .*? )and( .*?)( |$)/gi, 'between$1&and$2$3');
        }

        let ORs = clause.split(/ or /i), query = { "$or": [] }, i = 0, or;
        while (or = ORs[i++]) {
            let ANDs = or.split(/ and /i),
                aquery = { '$and': [] }, j = 0, and;
            while (and = ANDs[j++]) {
                let predicateClause = and,
                    cond = {};

                //=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
                switch (true) {
                    case !!~(index = predicateClause.indexOf('<>')):
                        cond[predicateClause.substring(0, index).trim()] = { '$ne': tryEval(predicateClause.substring(index + 2).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$gte': tryEval(predicateClause.substring(index + 2).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>')):
                        cond[predicateClause.substring(0, index).trim()] = { '$gt': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$lte': tryEval(predicateClause.substring(index + 2).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<')):
                        cond[predicateClause.substring(0, index).trim()] = { '$lt': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$equals': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case indexOfAlt(predicateClause, /between/i) == 0:
                        let nums = predicateClause.replace(/between (.*?) &and (.*?)( |$)/i, '$1,$2').split(',');
                        aquery['$and'].push({ '$gte': tryEval(nums[0]) });
                        aquery['$and'].push({ '$lte': tryEval(nums[1]) });
                        break;
                    case !!~(index = indexOfAlt(predicateClause, / in /i)):
                        let _in = tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/, '[$1]'));
                        /* istanbul ignore if */
                        if (!_in) {
                            throw "Invalid syntax near 'in'";
                        }
                        cond[predicateClause.substring(0, index).trim()] = { '$in': _in };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = indexOfAlt(predicateClause, /is null/i)):
                        cond[predicateClause.substring(0, index).trim()] = { '$equals': null };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = indexOfAlt(predicateClause, /is not null/i)):
                        cond[predicateClause.substring(0, index).trim()] = { '$ne': null };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = indexOfAlt(predicateClause, / like /i)):
                        let likeVal = `^${replaceAll(_generalTrim(predicateClause.substring(index + 6), null, [' ', "'", '"']), "%", ".*?")}$`;
                        cond[predicateClause.substring(0, index).trim()] = { '$regex': new RegExp(likeVal, 'i') };
                        aquery['$and'].push(cond);
                        break;
                }
            }
            query['$or'].push(aquery);
        }

        return query;
    } catch (e) /* istanbul ignore next */ {
        error && error('where.processClause', e);
    }
}