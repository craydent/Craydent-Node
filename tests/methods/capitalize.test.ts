import capitalize from '../../compiled/transformedMinor/craydent.capitalize';
describe('capitalize', () => {
    it('should capitalize based on options', () => {
        expect(capitalize("word of the day")).toBe("Word of the day");
        expect(capitalize("word of the day", 1)).toBe("wOrd of the day");
        expect(capitalize("word of the day", 0, true)).toBe("Word Of The Day");
        expect(capitalize("word of the day", 1, true)).toBe("wOrd oF tHe dAy");
    })
});
