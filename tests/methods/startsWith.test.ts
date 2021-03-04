import startsWith from '../../compiled/transformedMinor/craydent.startswith';
describe('startsWith', () => {
    it.each`
    str         | searchString  | length    | result
    ${'/path'}  | ${'/'}        | ${0}      | ${true}
    ${'/path'}  | ${'/'}        | ${1}      | ${false}
    ${''}       | ${'/'}        | ${1}      | ${false}
    `
        ('should return true if string starts with the given searchString', ({ str, searchString, result, length }) => {
            expect(startsWith(str, searchString, length)).toBe(result);
        })
});
