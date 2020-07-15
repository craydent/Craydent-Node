import {
    _containsMatches,
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../../modules/protected/_containsComparisons';

describe('_containsComparisons', () => {
    describe('_containsMatches', () => {
        it('should return true when matching', () => {
            _containsMatches(["has value"], /value/);
        });
        it('should return false when not matching', () => {
            _containsMatches(["has val"], /value/);
        });
    });
    describe('_containsLessThan', () => {
        it('should return true when less than', () => {
            _containsLessThan(["zebra"], "value");
            _containsLessThan([1], 0);
        });
        it('should return false when not less than', () => {
            _containsLessThan(["apple"], "value");
            _containsLessThan([1], 2);
            _containsLessThan(["zebra"], "zebra");
            _containsLessThan([1], 1);
        });
    });
    describe('_containsLessThanEqual', () => {
        it('should return true when less than equal', () => {
            _containsLessThanEqual(["zebra"], "value");
            _containsLessThanEqual([1], 0);
            _containsLessThanEqual(["zebra"], "zebra");
            _containsLessThanEqual([1], 1);
        });
        it('should return false when not less than equal', () => {
            _containsLessThanEqual(["apple"], "value");
            _containsLessThanEqual([1], 2);
        });
    });
    describe('_containsGreaterThan', () => {
        it('should return true when greater than', () => {
            _containsGreaterThan(["value"], "zebra");
            _containsGreaterThan([0], 1);
        });
        it('should return false when not greater than', () => {
            _containsGreaterThan(["value"], "apple");
            _containsGreaterThan([2], 1);
            _containsGreaterThanEqual(["zebra"], "zebra");
            _containsGreaterThanEqual([1], 1);
        });
    });
    describe('_containsGreaterThanEqual', () => {
        it('should return true when greater than equal', () => {
            _containsGreaterThanEqual(["value"], "zebra");
            _containsGreaterThanEqual([0], 1);
            _containsGreaterThanEqual(["zebra"], "zebra");
            _containsGreaterThanEqual([1], 1);
        });
        it('should return false when not greater than equal', () => {
            _containsGreaterThanEqual(["value"], "apple");
            _containsGreaterThanEqual([2], 1);
        });
    });
    describe('_containsMod', () => {
        it('should return true when mod [modValue,remainder]', () => {
            _containsMod([3], [2, 1]);

        });
        it('should return false when not mod [modValue,remainder]', () => {
            _containsMod([3], [2, 2]);
        });
    });
    describe('_containsType', () => {
        it('should return true when is of type', () => {
            _containsType([3], Number);

        });
        it('should return false when not is of type', () => {
            _containsType([3], String);
        });
    });

});
