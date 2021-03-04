import singularize from '../../compiled/transformedMinor/craydent.singularize';
describe('singularize', () => {
    it('should singularize string', () => {
        expect(singularize("addenda")).toBe("addendum");
        expect(singularize("biases")).toBe("bias");
        expect(singularize("heroes")).toBe("hero");
        expect(singularize("duplexes")).toBe("duplex");
        expect(singularize("matches")).toBe("match");
        expect(singularize("dishes")).toBe("dish");
        expect(singularize("geneses")).toBe("genesis");
        expect(singularize("analyses")).toBe("analysis");
        expect(singularize("trusses")).toBe("truss");
        expect(singularize("potatoes")).toBe("potato");
        expect(singularize("phenomena")).toBe("phenomenon");
        expect(singularize("criteria")).toBe("criterion");
        expect(singularize("cacti")).toBe("cactus");
        expect(singularize("foci")).toBe("focus");
        expect(singularize("lives")).toBe("life");
        expect(singularize("wolves")).toBe("wolf");
        expect(singularize("cities")).toBe("city");
        expect(singularize("rays")).toBe("ray");
        expect(singularize("conditions")).toBe("condition");
        expect(singularize("criteria")).toBe("criterion");
        expect(singularize("cats")).toBe("cat");
    })
});
