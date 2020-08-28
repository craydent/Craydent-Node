import pluralize from '../../modules/methods/pluralize';
describe('pluralize', () => {
    it('should pluralize string', () => {
        expect(pluralize("addendum")).toBe("addenda");
        expect(pluralize("bias")).toBe("biases");
        expect(pluralize("hero")).toBe("heroes");
        expect(pluralize("duplex")).toBe("duplexes");
        expect(pluralize("match")).toBe("matches");
        expect(pluralize("dish")).toBe("dishes");
        expect(pluralize("genesis")).toBe("geneses");
        expect(pluralize("analysis")).toBe("analyses");
        expect(pluralize("truss")).toBe("trusses");
        expect(pluralize("potato")).toBe("potatoes");
        expect(pluralize("phenomenon")).toBe("phenomena");
        expect(pluralize("criterion")).toBe("criteria");
        expect(pluralize("cactus")).toBe("cacti");
        expect(pluralize("focus")).toBe("foci");
        expect(pluralize("life")).toBe("lives");
        expect(pluralize("wolf")).toBe("wolves");
        expect(pluralize("city")).toBe("cities");
        expect(pluralize("ray")).toBe("rays");
        expect(pluralize("condition")).toBe("conditions");
        expect(pluralize("criterion")).toBe("criteria");
        expect(pluralize("cat")).toBe("cats");
    })
});
