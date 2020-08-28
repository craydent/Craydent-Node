import $COOKIE from '../../modules/methods/$COOKIE';

describe('$COOKIE', () => {
    const RealDate = Date;
    beforeEach(() => {
        (global as any).Date = jest.fn(() => new RealDate('2019-04-22T10:20:30Z'));
    });

    afterEach(() => {
        global.Date = RealDate;
    });
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        it('should return {} when there are no cookies', () => {
            const dis = { request: { headers: { cookie: '' } } };
            expect($COOKIE.call(dis)).toEqual({});
        });
        it('should get all cookies', () => {
            const dis = { request: { headers: { cookie: 'key=value' } } };
            expect($COOKIE.call(dis)).toEqual({ key: 'value' });
        });
        it('should not fail with invalid cookie string', () => {
            const dis = { request: { headers: { cookie: ';' } } };
            expect($COOKIE.call(dis)).toEqual({ "": null });
        });
        it('should get cookie', () => {
            const dis = { request: { headers: { cookie: 'key=value' } } };
            expect($COOKIE.call(dis, 'key')).toBe('value');
        });
        it('should not get cookie', () => {
            const dis = { request: { headers: { cookie: 'key=value' } } };
            expect($COOKIE.call(dis, 'keys')).toBe(false);
        });
        it('should get cookie from option', () => {
            const dis = { request: { headers: { cookie: 'key=value' } } };
            expect($COOKIE.call(dis, 'key', { cookie: 'key=thevalue' })).toBe('thevalue');
        });
        it('should set cookie when given a value', () => {
            const dis = {
                request: { headers: { cookie: 'key=value' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, 'key', 'value')).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith('Set-Cookie', ['key=value']);
        });
        it('should set cookie when given a value and expiration option', () => {
            const dis = {
                request: { headers: { cookie: 'key=value' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, 'key', 'value', { expiration: 10 })).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith("Set-Cookie", [`key=value;expires=Thu, 02 May 2019 10:20:30 GMT`]);
        });
        it('should set cookie when given a key/value as object', () => {
            const dis = {
                request: { headers: { cookie: 'key=value' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, { 'key': 'value' })).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith('Set-Cookie', ['key=value']);
        });
        it('should set cookie when given a key/value as object where value is nonstring', () => {
            const dis = {
                request: { headers: { cookie: 'key=0' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, { 'key': 0 })).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith('Set-Cookie', ['key=0']);
        });
        it('should set cookie when given an option as object with no value', () => {
            const dis = {
                request: { headers: { cookie: 'key=value' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, 'key', { path: '/', domain: 'example', 'delete': true })).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith('Set-Cookie', ['key=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=example;']);
        });
        it('should set cookie when given an option', () => {
            const dis = {
                request: { headers: { cookie: 'key=value' } },
                response: {
                    setHeader: jest.fn()
                }
            };
            expect($COOKIE.call(dis, 'key', null, { path: '/', domain: 'example', 'delete': true })).toBe(true);
            expect(dis.response.setHeader).toHaveBeenCalledWith('Set-Cookie', ['key=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=example;']);
        });
    });
    describe('JS', () => {
        let doc = window.document;
        beforeEach(() => {
            delete (window as any).document;
            (window as any).document = { cookie: '' } as any;
        });
        afterAll(() => {
            doc && ((window as any).document = doc);
        })
        it('should return {} when there are no cookies', () => {
            expect($COOKIE()).toEqual({});
        });
        it('should get all cookies', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE()).toEqual({ key: 'value' });
        });
        it('should not fail with invalid cookie string', () => {
            window.document.cookie = ';'
            expect($COOKIE()).toEqual({ "": null });
        });
        it('should get cookie', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key')).toBe('value');
        });
        it('should get cookie from option', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key', { cookie: 'key=thevalue' })).toBe('thevalue');
        });
        it('should not get cookie', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('keys')).toBe(false);
        });
        it('should set cookie when given a value', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key', 'value')).toBe(true);
            expect(window.document.cookie).toBe('key=value;');
        });
        it('should set cookie when given a value and expiration option', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key', 'value', { expiration: 10 })).toBe(true);
            expect(window.document.cookie).toBe(`key=value;expires=Thu, 02 May 2019 10:20:30 GMT`);
        });
        it('should set cookie when given a key/value as object', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE({ 'key': 'value' })).toBe(true);
            expect(window.document.cookie).toBe('key=value;');
        });
        it('should set cookie when given a key/value as object where value is nonstring', () => {
            window.document.cookie = 'key=0';
            expect($COOKIE({ 'key': 0 })).toBe(true);
            expect(window.document.cookie).toBe('key=0;');
        });
        it('should set cookie when given an option as object with no value', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key', { path: '/', domain: 'example', 'delete': true })).toBe(true);
            expect(window.document.cookie).toBe('key=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=example;');
        });
        it('should set cookie when given an option', () => {
            window.document.cookie = 'key=value';
            expect($COOKIE('key', null, { path: '/', domain: 'example', 'delete': true })).toBe(true);
            expect(window.document.cookie).toBe('key=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=example;');
        });
    })
});