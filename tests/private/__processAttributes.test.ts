

import __processAttributes from '../../modules/private/__processAttributes';

describe('__processAttributes', () => {
    it('should parse attributes', () => {
        const attributes = __processAttributes('<node attr="attribute1"  attr2="attribute2"></node>', {});
        expect(attributes).toEqual({ '@attributes': { attr: "attribute1", attr2: "attribute2" } });
    })
    it('should parse attributes when no attributes are present', () => {
        const attributes = __processAttributes('<node>text</node>', {});
        expect(attributes).toEqual({ "#text": 'text' });
    })
    it('should parse attributes when no attributes are present and is self closing', () => {
        const attributes = __processAttributes('<node />', {});
        expect(attributes).toEqual({});
    })
    it('should parse attribute without quotes', () => {
        const attributes = __processAttributes('<node attr=val />', {});
        expect(attributes).toEqual({ '@attributes': { attr: "val" } });
    })
});
