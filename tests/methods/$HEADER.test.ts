import $HEADER from '../../compiled/transformedMinor/craydent.http.header';

describe('$HEADER', () => {
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        it('should return {} when there are no headers', () => {
            const dis: any = { request: {} };
            expect($HEADER.call(dis)).toEqual({});
        });
        it('should get all headers', () => {
            const dis: any = { request: { headers: { cookie: 'key=value' } } };
            expect($HEADER.call(dis)).toEqual({ cookie: 'key=value' });
        });
        it('should get header', () => {
            const dis: any = { request: { headers: { cookie: 'key=value' } } };
            expect($HEADER.call(dis, 'cookie')).toBe('key=value');
        });
        it('should not get header when it does not exist', () => {
            const dis: any = { request: { headers: { cookie: 'key=value' } } };
            expect($HEADER.call(dis, 'keys')).toBe(false);
            expect($HEADER.call(dis, 'keys', 'i')).toBe(false);
            expect($HEADER.call(dis, 'keys', {})).toBe(false);
        });
        it('should get header and ignore case', () => {
            const dis: any = {
                request: { headers: { COOKIE: 'key=value' } },
            };
            expect($HEADER.call(dis, 'cookie', { ignoreCase: true })).toBe('key=value');
            expect($HEADER.call(dis, 'cookie', 'i')).toBe('key=value');
            expect($HEADER.call(dis, 'cookie', 'ignoreCase')).toBe('key=value');
        });
    });
    describe('JS', () => {
        it('should not execute when using browser', () => {
            expect($HEADER()).toBe(null);
        });
    })
});
