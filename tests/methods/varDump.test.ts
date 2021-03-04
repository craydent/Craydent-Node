import varDump from '../../compiled/transformedMinor/craydent.vardump';

function echo() { }
jest.mock('../../compiled/transformedMinor/craydent.echo', () => {
    return {
        "default": echo
    }
});
describe('varDump', () => {
    beforeEach(() => {
        (echo as any).out = '';
    });
    it('should store data as echo', () => {
        varDump(null, '', [], new Date('02/02/2020'), 1, true, {})
        expect((echo as any).out).toBe('null String (0) "" Array (0) [] Date ("2020-02-02T08:00:00.000Z") Number (1) Boolean (true) Object {}');
    });

});