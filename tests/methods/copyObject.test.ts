import copyObject from '../../compiled/transformedMinor/craydent.copyobject';
jest.mock('../../compiled/transformedMinor/craydent.copyobject/protected/_duplicate', () => {
    return {
        "default": (...args) => _duplicate.apply(this, args)
    }
});
let _duplicate = () => { }

describe('copyObject', () => {
    beforeEach(() => {
        _duplicate = () => { }
    });

    it('should process null', () => {
        _duplicate = jest.fn().mockImplementationOnce(() => "value");
        expect(copyObject(null)).toBe("value");
        expect(_duplicate).toHaveBeenCalledWith({}, null, true);
    });
    it('should copy object', () => {
        const obj = { key: 'value' };
        _duplicate = jest.fn().mockImplementationOnce(() => obj);
        expect(copyObject(obj)).toBe(obj);
        expect(_duplicate).toHaveBeenCalledWith({}, obj, true);

    });
});
