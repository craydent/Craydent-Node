import echo from '../../modules/methods/echo';
describe('echo', () => {
    afterAll(() => {
        delete (echo as any).out;
    })
    it('should store output internally', () => {
        echo('hello');
        echo(' ');
        echo('world');
        expect((echo as any).out).toBe('hello world');
    })
});
