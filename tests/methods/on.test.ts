import on from '../../modules/methods/on';
describe('on', () => {
    let func = () => { };
    beforeEach(() => {
        func = () => { };
    });
    it('should add listeners', () => {
        const cb = () => { };
        expect(on(func, 'event', cb)).toBe(func);
        expect(func['_event']).toEqual([cb]);
        expect(on(func, 'event', cb)).toBe(func);
        expect(func['_event']).toEqual([cb, cb]);
    })
});
