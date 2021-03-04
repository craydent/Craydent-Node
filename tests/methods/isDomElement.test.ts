import isDomElement from '../../compiled/transformedMinor/craydent.isdomelement';
describe('isDomElement', () => {
    it('should check if value is a dom element', () => {
        expect(isDomElement(null)).toBe(false);
        // emulate dome element
        expect(isDomElement({ nodeType: 1 })).toBe(true);
        expect(isDomElement({ nodeType: 2 })).toBe(false);
    })
});
