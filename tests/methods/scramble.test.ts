import scramble from '../../compiled/transformedMinor/craydent.scramble';

jest.mock('../../compiled/transformedMinor/craydent.rand', () => {
    return {
        "default": (...args: any[]) => rand.apply(this, args as any)
    }
});
let rand = () => { }
describe('scramble', () => {
    beforeEach(() => {
        rand = () => { }
    });
    it('should add to the array and index', () => {
        rand = jest.fn()
            .mockImplementationOnce(() => -1)
            .mockImplementationOnce(() => -1)
            .mockImplementationOnce(() => 0)
            .mockImplementationOnce(() => 1);
        const arr = [1, 2, 3, 4];
        expect(scramble(arr)).toEqual([3, 2, 1, 4])

    });
});