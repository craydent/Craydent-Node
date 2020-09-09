import {
    __processAccumulator,
    __processExpression,
    __processGroup,
    __parseArithmeticExpr,
    __parseArrayExpr,
    __parseBooleanExpr,
    __parseComparisonExpr,
    __parseCond,
    __parseConditionalExpr,
    __parseDateExpr,
    __parseSetExpr,
    __parseStringExpr,
    __parseVariableExpr
} from '../../modules/private/__whereParsers';
describe('__whereParsers', () => {
    let arr = [
        { _id: 1, group: 1, quizzes: [5, 6, 7], quizzes1: [5, 6, 6, 7], dt: new Date('02/02/2020'), str: 'Abc' },
        { _id: 2, group: 1, quizzes: [], quizzes1: [5, 6, 7] },
        { _id: 3, group: 2, quizzes: [3, 8, 9], quizzes1: [3, 8, 10] },
        { _id: 4, group: 3, quizzes: [3, 8, 9, 11], quizzes1: [3, 8, 10] }
    ];
    beforeEach(() => {
        arr = [
            { _id: 1, group: 1, quizzes: [5, 6, 7], quizzes1: [5, 6, 6, 7], dt: new Date('02/02/2020'), str: 'Abc' },
            { _id: 2, group: 1, quizzes: [], quizzes1: [5, 6, 7] },
            { _id: 3, group: 2, quizzes: [3, 8, 9], quizzes1: [3, 8, 10] },
            { _id: 4, group: 3, quizzes: [3, 8, 9, 11], quizzes1: [3, 8, 10] }
        ];
    });
    describe('__processAccumulator', () => {
        it('should process $sum', () => {
            expect(__processAccumulator(arr[0], { $sum: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $sum: '$group' }, 2, { index: 0, length: 4, sample: [] })).toBe(3);
        })
        it('should process $avg', () => {
            expect(__processAccumulator(arr[0], { $avg: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $avg: '$groups' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([]);
            expect(__processAccumulator(arr[0], { $avg: '$group' }, [1], { index: 3, length: 4, sample: [] })).toBe(1);
        })
        it('should process $first', () => {
            expect(__processAccumulator(arr[0], { $first: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $first: '$group' }, 2, { index: 0, length: 4, sample: [] })).toBe(2);
        })
        it('should process $last', () => {
            expect(__processAccumulator(arr[0], { $last: '$group' }, 2, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $last: '$groups' }, 2, { index: 0, length: 4, sample: [] })).toBe(2);
        })
        it('should process $max', () => {
            expect(__processAccumulator(arr[0], { $max: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $max: '$group' }, 2, { index: 0, length: 4, sample: [] })).toBe(2);
            expect(__processAccumulator(arr[0], { $max: '$groups' }, 2, { index: 0, length: 4, sample: [] })).toBe(2);
            expect(__processAccumulator(arr[0], { $max: -9007199254740991 }, undefined, { index: 3, length: 4, sample: [] })).toBe(undefined);
        })
        it('should process $min', () => {
            expect(__processAccumulator(arr[0], { $min: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $min: '$group' }, 2, { index: 0, length: 4, sample: [] })).toBe(1);
            expect(__processAccumulator(arr[0], { $min: '$groups' }, 2, { index: 0, length: 4, sample: [] })).toBe(2);
            expect(__processAccumulator(arr[0], { $min: 9007199254740991 }, undefined, { index: 3, length: 4, sample: [] })).toBe(undefined);
        })
        it('should process $push', () => {
            expect(__processAccumulator(arr[0], { $push: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $push: '$groups' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([]);
        })
        it('should process $addToSet', () => {
            expect(__processAccumulator(arr[0], { $addToSet: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $addToSet: '$group' }, [1], { index: 0, length: 4, sample: [] })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $addToSet: '$groups' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([]);
        })
        it('should process $stdDevSamp', () => {
            expect(__processAccumulator(arr[0], { $stdDevSamp: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toEqual(null);
            expect(__processAccumulator(arr[0], { $stdDevSamp: '$group' }, undefined, { index: 0, length: 4, sample: arr })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $stdDevSamp: '$groups' }, undefined, { index: 0, length: 4, sample: arr })).toEqual(null);
            expect(__processAccumulator(arr[0], { $stdDevSamp: '$group' }, [1, 2], { index: 3, length: 4, sample: arr })).toEqual(0.4714045207910317);
        })
        it('should process $stdDevPop', () => {
            expect(__processAccumulator(arr[0], { $stdDevPop: '$group' }, undefined, { index: 0, length: 4, sample: [] })).toEqual([1]);
            expect(__processAccumulator(arr[0], { $stdDevPop: '$groups' }, undefined, { index: 0, length: 4, sample: [] })).toEqual(null);
            expect(__processAccumulator(arr[0], { $stdDevPop: '$group' }, [1, 2], { index: 3, length: 4, sample: arr })).toEqual(0.4714045207910317);
        })
    });
    describe('__processExpression', () => {
        it('should process string', () => {
            expect(__processExpression(arr[0], '$_id')).toBe(1);
            expect(__processExpression(arr[0], '_id')).toBe(1);
        })
        it('should process non object', () => {
            expect(__processExpression(arr[0], 2 as any)).toBe(2);
        })
        it('should process nested expression', () => {
            expect(__processExpression(arr[0], { value: 1 })).toBe(1);
        })

        it('should process literalKeys', () => {
            expect(__processExpression(arr[0], { $literal: 1 })).toBe(1);
        })
        it('should process boolKeys', () => {
            expect(__processExpression(arr[0], { $and: [{ $gt: ["$_id", 0] }, { $lt: ["$quizzes.length", 10] }] })).toBe(true);
            expect(__processExpression(arr[0], { $and: [{ $gt: ["$_id", 1] }, { $lt: ["$quizzes.length", 10] }] })).toBe(false);
        })
        it('should process setKeys', () => {
            expect(__processExpression(arr[0], { $setEquals: ["$quizzes", "$quizzes1"] })).toBe(true);
            expect(__processExpression(arr[1], { $setEquals: ["$quizzes", "$quizzes1"] })).toBe(false);
        })
        it('should process compareKeys', () => {
            expect(__processExpression(arr[0], { $eq: ["$quizzes[1]", "$quizzes1[2]"] })).toBe(true);
            expect(__processExpression(arr[0], { $eq: ["$quizzes.length", "$quizzes1.length"] })).toBe(false);
        })
        it('should process arithmeticKeys', () => {
            expect(__processExpression(arr[0], { $add: ["$quizzes[1]", "$quizzes1[2]"] })).toBe(12);
        })
        it('should process stringKeys', () => {
            expect(__processExpression(arr[0], { $concat: ["$quizzes[1]", "$quizzes1[2]"] })).toBe('66');
        })
        it('should process arrayKeys', () => {
            expect(__processExpression(arr[0], { $size: "$quizzes" })).toBe(3);
        })
        it('should process variableKeys', () => {
            expect(__processExpression(arr[0], {
                $let: {
                    vars: { low: 1, high: "$$low" },
                    in: { $gt: ["$$low", "$$high"] }
                }
            })).toBe(false);
            expect(__processExpression(arr[0], {
                $let: {
                    vars: { low: 1, high: "0" },
                    in: { $gt: ["$$low", "$$high"] }
                }
            })).toBe(true);
        })
        it('should process dateKeys', () => {
            expect(__processExpression(arr[0], { $year: "dt" })).toBe(2020);
        })
        it('should process conditionalKeys', () => {
            expect(__processExpression(arr[0], { $cond: { if: { $gte: ["$_id", 1] }, then: 30, else: 20 } })).toBe(30);
            expect(__processExpression(arr[0], { $cond: { if: { $gte: ["$_id", 2] }, then: 30, else: 20 } })).toBe(20);
        })
    });

    describe('__processGroup', () => {
        it('should process group', () => {
            expect(__processGroup(arr, { _id: '$group' })).toEqual([{ _id: 1 }, { _id: 2 }, { _id: 3 }]);
            const expected = [{ _id: { group: 1 }, count: 2 }, { _id: { group: 2 }, count: 1 }, { _id: { group: 3 }, count: 1 }]
            expect(__processGroup(arr, { _id: { group: '$group' }, count: { $sum: 1 } })).toEqual(expected);
        })
        it('should process group without _id', () => {
            expect(__processGroup(arr, { count: { $sum: 1 } })).toEqual([{ _id: null, count: 4 }]);
        })

    });
    describe('__parseArithmeticExpr', () => {
        it('should process $add', () => {
            expect(__parseArithmeticExpr(arr[0], { $add: [0, 1, 2] }, '$add')).toBe(3);
        })
        it('should process $subtract', () => {
            expect(__parseArithmeticExpr(arr[0], { $subtract: [0, 1, 2] }, '$subtract')).toBe(-3);
        })
        it('should process $multiply', () => {
            expect(__parseArithmeticExpr(arr[0], { $multiply: [0, 1, 2] }, '$multiply')).toBe(0);
            expect(__parseArithmeticExpr(arr[0], { $multiply: [1, 2] }, '$multiply')).toBe(2);
        })
        it('should process $divide', () => {
            expect(__parseArithmeticExpr(arr[0], { $divide: [2, 2] }, '$divide')).toBe(1);
        })
        it('should process $mod', () => {
            expect(__parseArithmeticExpr(arr[0], { $mod: [2, 2] }, '$mod')).toBe(0);
            expect(__parseArithmeticExpr(arr[0], { $mod: [1, 2] }, '$mod')).toBe(1);
        })
    });
    describe('__parseArrayExpr', () => {
        it('should process $size', () => {
            expect(__parseArrayExpr(arr[0], { $size: null }, '$size')).toBe(0);
            expect(__parseArrayExpr(arr[0], { $size: [false, true] }, '$size')).toBe(2);
        })
    });
    describe('__parseBooleanExpr', () => {
        it('should process $and', () => {
            expect(__parseBooleanExpr(arr[0], { $and: [true, true] }, '$and')).toBe(true);
            expect(__parseBooleanExpr(arr[0], { $and: [false, true] }, '$and')).toBe(false);
            expect(__parseBooleanExpr(arr[0], { $and: [true, false] }, '$and')).toBe(false);
            expect(__parseBooleanExpr(arr[0], { $and: [false, false] }, '$and')).toBe(false);
        })
        it('should process $or', () => {
            expect(__parseBooleanExpr(arr[0], { $or: [true, true] }, '$or')).toBe(true);
            expect(__parseBooleanExpr(arr[0], { $or: [true, false] }, '$or')).toBe(true);
            expect(__parseBooleanExpr(arr[0], { $or: [false, true] }, '$or')).toBe(true);
            expect(__parseBooleanExpr(arr[0], { $or: [false, false] }, '$or')).toBe(false);
        })
        it('should process $not', () => {
            expect(__parseBooleanExpr(arr[0], { $not: [false] }, '$not')).toBe(true);
            expect(__parseBooleanExpr(arr[0], { $not: [true] }, '$not')).toBe(false);
        })
    });
    describe('__parseComparisonExpr', () => {
        it('should process $cmp', () => {
            expect(__parseComparisonExpr(arr[0], { $cmp: [1, 1] }, '$cmp')).toBe(0);
            expect(__parseComparisonExpr(arr[0], { $cmp: [1, 2] }, '$cmp')).toBe(-1);
            expect(__parseComparisonExpr(arr[0], { $cmp: [2, 1] }, '$cmp')).toBe(1);
        })
        it('should process $eq', () => {
            expect(__parseComparisonExpr(arr[0], { $eq: [1, 1] }, '$eq')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $eq: [1, 2] }, '$eq')).toBe(false);
        })
        it('should process $gt', () => {
            expect(__parseComparisonExpr(arr[0], { $gt: [1, 1] }, '$gt')).toBe(false);
            expect(__parseComparisonExpr(arr[0], { $gt: [1, 2] }, '$gt')).toBe(false);
            expect(__parseComparisonExpr(arr[0], { $gt: [2, 1] }, '$gt')).toBe(true);
        })
        it('should process $gte', () => {
            expect(__parseComparisonExpr(arr[0], { $gte: [1, 1] }, '$gte')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $gte: [1, 2] }, '$gte')).toBe(false);
            expect(__parseComparisonExpr(arr[0], { $gte: [2, 1] }, '$gte')).toBe(true);
        })
        it('should process $lt', () => {
            expect(__parseComparisonExpr(arr[0], { $lt: [1, 1] }, '$lt')).toBe(false);
            expect(__parseComparisonExpr(arr[0], { $lt: [1, 2] }, '$lt')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $lt: [2, 1] }, '$lt')).toBe(false);
        })
        it('should process $lte', () => {
            expect(__parseComparisonExpr(arr[0], { $lte: [1, 1] }, '$lte')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $lte: [1, 2] }, '$lte')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $lte: [2, 1] }, '$lte')).toBe(false);
        })
        it('should process $ne', () => {
            expect(__parseComparisonExpr(arr[0], { $ne: [1, 1] }, '$ne')).toBe(false);
            expect(__parseComparisonExpr(arr[0], { $ne: [1, 2] }, '$ne')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $ne: [undefined, 2] }, '$ne')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $ne: [2, undefined] }, '$ne')).toBe(true);
            expect(__parseComparisonExpr(arr[0], { $ne: [undefined, undefined] }, '$ne')).toBe(false);
        })
    });
    describe('__parseCond', () => {
        it('should process non object', () => {
            expect(__parseCond(arr[0], 1)).toBe(1);
        })
        it('should process array', () => {
            expect(__parseCond(arr[0], { $cond: [true, 'true', 'false'] })).toBe('true');
            expect(__parseCond(arr[0], { $cond: [false, 'true', 'false'] })).toBe('false');
        })
        it('should process conditional', () => {
            expect(__parseCond(arr[0], { $cond: { if: true, then: 'true', else: 'false' } })).toBe('true');
            expect(__parseCond(arr[0], { $cond: { if: false, then: 'true', else: 'false' } })).toBe('false');
        })
    });
    describe('__parseConditionalExpr', () => {
        it('should process $cond', () => {
            expect(__parseConditionalExpr(arr[0], { $cond: { if: true, then: 'true', else: 'false' } }, '$cond')).toBe('true');
        })
        it('should process $ifNull', () => {
            expect(__parseConditionalExpr(arr[0], { $ifNull: ["$str2", '$str'] }, '$ifNull')).toBe('Abc');
        })
    });
    describe('__parseDateExpr', () => {
        it('should process $dayOfYear', () => {
            expect(__parseDateExpr(arr[0], { $dayOfYear: '$dt' }, '$dayOfYear')).toBe(33);
        })
        it('should process $dayOfMonth', () => {
            expect(__parseDateExpr(arr[0], { $dayOfMonth: '$dt' }, '$dayOfMonth')).toBe(2);
        })
        it('should process $dayOfWeek', () => {
            expect(__parseDateExpr(arr[0], { $dayOfWeek: '$dt' }, '$dayOfWeek')).toBe(1);
        })
        it('should process $year', () => {
            expect(__parseDateExpr(arr[0], { $year: '$dt' }, '$year')).toBe(2020);
        })
        it('should process $month', () => {
            expect(__parseDateExpr(arr[0], { $month: '$dt' }, '$month')).toBe(2);
        })
        it('should process $week', () => {
            expect(__parseDateExpr(arr[0], { $week: '$dt' }, '$week')).toBe(6);
        })
        it('should process $hour', () => {
            expect(__parseDateExpr(arr[0], { $hour: '$dt' }, '$hour')).toBe(0);
        })
        it('should process $minute', () => {
            expect(__parseDateExpr(arr[0], { $minute: '$dt' }, '$minute')).toBe(0);
        })
        it('should process $second', () => {
            expect(__parseDateExpr(arr[0], { $second: '$dt' }, '$second')).toBe(0);
        })
        it('should process $millisecond', () => {
            expect(__parseDateExpr(arr[0], { $millisecond: '$dt' }, '$millisecond')).toBe(0);
        })
        it('should process $dateToString', () => {
            expect(__parseDateExpr(arr[0], { $dateToString: { format: 'm-d-Y', date: '$dt' } }, '$dateToString')).toBe('02-02-2020');
        })
    });
    describe('__parseSetExpr', () => {
        it('should process $setEquals', () => {
            expect(__parseSetExpr(arr[0], { $setEquals: ['$quizzes', '$quizzes1'] }, '$setEquals')).toBe(true);
            expect(__parseSetExpr(arr[1], { $setEquals: ['$quizzes', '$quizzes1'] }, '$setEquals')).toBe(false);
            expect(__parseSetExpr(arr[2], { $setEquals: ['$quizzes', '$quizzes1'] }, '$setEquals')).toBe(false);
        })
        it('should process $setIntersection', () => {
            expect(__parseSetExpr(arr[0], { $setIntersection: ['$quizzes', '$quizzes1'] }, '$setIntersection')).toEqual([5, 6, 7]);
            expect(__parseSetExpr(arr[1], { $setIntersection: ['$quizzes', '$quizzes1'] }, '$setIntersection')).toEqual([]);
            expect(__parseSetExpr(arr[2], { $setIntersection: ['$quizzes', '$quizzes1'] }, '$setIntersection')).toEqual([3, 8]);
            expect(__parseSetExpr(arr[3], { $setIntersection: ['$quizzes', '$quizzes1'] }, '$setIntersection')).toEqual([3, 8]);
        })
        it('should process $setUnion', () => {
            expect(__parseSetExpr(arr[0], { $setUnion: ['$quizzes', '$quizzes1'] }, '$setUnion')).toEqual([5, 6, 7]);
            expect(__parseSetExpr(arr[1], { $setUnion: ['$quizzes', '$quizzes1'] }, '$setUnion')).toEqual([5, 6, 7]);
            expect(__parseSetExpr(arr[2], { $setUnion: ['$quizzes', '$quizzes1'] }, '$setUnion')).toEqual([3, 8, 9, 10]);
        })
        it('should process $setDifference', () => {
            expect(__parseSetExpr(arr[0], { $setDifference: ['$quizzes', '$quizzes1'] }, '$setDifference')).toEqual([]);
            expect(__parseSetExpr(arr[1], { $setDifference: ['$quizzes', '$quizzes1'] }, '$setDifference')).toEqual([5, 6, 7]);
            expect(__parseSetExpr(arr[2], { $setDifference: ['$quizzes', '$quizzes1'] }, '$setDifference')).toEqual([9, 10]);
        })
        it('should process $setIsSubset', () => {
            expect(__parseSetExpr(arr[0], { $setIsSubset: ['$quizzes', '$quizzes1'] }, '$setIsSubset')).toBe(true);
            expect(__parseSetExpr(arr[1], { $setIsSubset: ['$quizzes', '$quizzes1'] }, '$setIsSubset')).toBe(true);
            expect(__parseSetExpr(arr[2], { $setIsSubset: ['$quizzes', '$quizzes1'] }, '$setIsSubset')).toBe(false);
        })
        it('should process $anyElementTrue', () => {
            expect(__parseSetExpr(arr[0], { $anyElementTrue: ['$quizzes'] }, '$anyElementTrue')).toBe(true);
            expect(__parseSetExpr(arr[1], { $anyElementTrue: ['$quizzes'] }, '$anyElementTrue')).toBe(false);
            expect(__parseSetExpr({ ...arr[2], quizzes: [0, 1] }, { $anyElementTrue: ['$quizzes'] }, '$anyElementTrue')).toBe(true);
        })
        it('should process $allElementsTrue', () => {
            expect(__parseSetExpr(arr[0], { $allElementsTrue: ['$quizzes', '$quizzes1'] }, '$allElementsTrue')).toBe(true);
            expect(__parseSetExpr(arr[1], { $allElementsTrue: ['$quizzes', '$quizzes1'] }, '$allElementsTrue')).toBe(true);
            expect(__parseSetExpr(arr[2], { $allElementsTrue: ['$quizzes', '$quizzes1'] }, '$allElementsTrue')).toBe(true);
            expect(__parseSetExpr({ ...arr[2], quizzes: [0] }, { $allElementsTrue: ['$quizzes', '$quizzes1'] }, '$allElementsTrue')).toBe(false);
        })

    });
    describe('__parseStringExpr', () => {
        it('should process $concat', () => {
            expect(__parseStringExpr(arr[0], { $concat: ['id', ':', '$_id'] }, '$concat')).toBe('id:1');
        })
        it('should process $substr', () => {
            expect(__parseStringExpr(arr[0], { $substr: ["$str", 0, 2] }, '$substr')).toBe('Ab');
            expect(__parseStringExpr(arr[0], { $substr: ["$str", 1] }, '$substr')).toBe('bc');
            expect(__parseStringExpr(arr[0], { $substr: ["$str", 0, -1] }, '$substr')).toBe('Abc');
        })
        it('should process $toLower', () => {
            expect(__parseStringExpr(arr[0], { $toLower: '$str' }, '$toLower')).toBe('abc');
        })
        it('should process $toUpper', () => {
            expect(__parseStringExpr(arr[0], { $toUpper: '$str' }, '$toUpper')).toBe('ABC');
        })
        it('should process $strcasecmp', () => {
            expect(__parseStringExpr(arr[0], { $strcasecmp: ["$str", 'abc'] }, '$strcasecmp')).toBe(0);
            expect(__parseStringExpr(arr[0], { $strcasecmp: ["$str", 'zbc'] }, '$strcasecmp')).toBe(-1);
            expect(__parseStringExpr(arr[0], { $strcasecmp: ["$str", 'aaa'] }, '$strcasecmp')).toBe(1);
        })
    });
    describe('__parseVariableExpr', () => {
        it('should process $map', () => {
            expect(__parseVariableExpr(arr[0], {
                $map: {
                    input: "$quizzes",
                    as: "grade",
                    in: { $add: ["$$grade", 2] }
                }
            }, '$map')).toEqual([7, 8, 9]);
        })
        it('should process $let', () => {
            expect(__parseVariableExpr(arr, { $let: { vars: { v: 1 }, in: { $v: { $eq: 1 } } } }, '$let')).toBe(true);
        })
    });
});
