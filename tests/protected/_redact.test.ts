import _redact from '../../modules/protected/_redact';

jest.mock('../../modules/private/__whereParsers', () => {
    return {
        "__parseCond": (...args) => __parseCond.apply(this, args)
    }
});
let __parseCond = () => { }
describe('add', () => {
    beforeEach(() => {
        __parseCond = () => { }
    });
    it('should process $$KEEP', () => {
        __parseCond = jest.fn(() => '$$KEEP');
        expect(_redact([{}], '')).toEqual([{}]);
    });
    it('should process $$DESCEND', () => {
        __parseCond = jest.fn(() => '$$DESCEND');
        expect(_redact([{ name: [], value: 1, childre: {} }], '')).toEqual([{ name: [], value: 1, childre: [{}] }]);
    });
    it('should process $$DESCEND and $$PRUNE', () => {
        __parseCond = jest.fn()
            .mockImplementationOnce(() => '$$DESCEND')
            .mockImplementationOnce(() => '$$PRUNE');
        expect(_redact([{ name: [], value: 1, childre: {} }], '')).toEqual([{ name: [], value: 1 }]);
    });
    it('should process $$PRUNE', () => {
        __parseCond = jest.fn(() => '$$PRUNE');
        expect(_redact([{}], '')).toEqual(undefined);

    });
});