import header from '../../compiled/transformedMinor/craydent.set-header';
describe('header', () => {
    beforeEach(() => {
        delete (header as any).headers;
        delete (header as any).code;
    })
    afterAll(() => {
        delete (header as any).headers;
        delete (header as any).code;
    })
    it('should store headers and status code internally', () => {
        header('http/400', 200);
        header('type:json');
        expect((header as any).headers).toEqual({ 'Content-Type': 'text/html', type: 'json' });
        expect((header as any).code).toEqual(400);
    })
    it('should store headers internally and pull status code from header', () => {
        header('http/400');
        header({ type: 'json' }, 200);
        expect((header as any).headers).toEqual({ 'Content-Type': 'text/html', type: 'json' });
        expect((header as any).code).toEqual(200);
    })
});
