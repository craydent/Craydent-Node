import toPromise from '../../compiled/transformedMinor/craydent.topromise';

jest.mock('../../compiled/transformedMinor/craydent.syncroit', () => {
    return {
        "default": (...args) => syncroit.apply(this, args)
    }
});
let syncroit = () => { }
describe('toPromise', () => {
    beforeEach(() => {
        syncroit = () => { }
    });
    it('should convert generator to function', () => {
        syncroit = jest.fn();
        const gen = function* () { } as GeneratorFunction;
        toPromise(gen)
        expect(syncroit).toHaveBeenCalledWith(gen);
    });
});