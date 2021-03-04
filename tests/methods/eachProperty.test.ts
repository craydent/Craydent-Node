import eachProperty from '../../compiled/transformedMinor/craydent.eachproperty';
describe('eachProperty', () => {
    it('should loop through each property', () => {
        const cb = jest.fn();
        const obj = { id: 1, id2: 2 };
        eachProperty(obj, cb);
        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenNthCalledWith(1, 1, 'id');
        expect(cb).toHaveBeenNthCalledWith(2, 2, 'id2');
    })
    it('should short circuit', () => {
        const cb = jest.fn(() => true);
        const obj = { id: 1, id2: 2 };
        eachProperty(obj, cb);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenNthCalledWith(1, 1, 'id');
    })
});
