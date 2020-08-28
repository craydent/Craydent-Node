import endsWith from '../../modules/methods/endsWith';
describe('endsWith', () => {
    it.each`
    str         | searchString  | length    | result
    ${'path/'}  | ${'/'}        | ${0}      | ${true}
    ${'path/'}  | ${'/'}        | ${1}      | ${false}
    ${''}       | ${'/'}        | ${1}      | ${false}
    `
        ('should return true if string ends with the given searchString', ({ str, searchString, result, length }) => {
            expect(endsWith(str, searchString, length)).toBe(result);
        })
});
