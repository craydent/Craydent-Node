import _getSession from '../../modules/protected/_getSession';
jest.mock('../../modules/protected/_sessionFileCreateAndRetrieve', () => {
    return {
        "default": (path: any, sync: any, f: Function) => {
            if (sync) {
                return { data: 1 };
            } else {
                f({ data: 1 });
            }
        }
    }
});

declare var __GLOBALSESSION: any;
describe('_getSession', () => {
    let session: any;
    let ctx: any;
    beforeAll(() => {
        session = (global as any).__GLOBALSESSION;
        (global as any).__GLOBALSESSION = { "unique-id": {} };
    });
    afterAll(() => {
        (global as any).__GLOBALSESSION = session;
    });
    it('should retrieve session when tehre is data in the context', () => {
        const data = { data: 1 };
        expect(_getSession({ session: data } as any, 'unique-id')).toBe(data);
        expect(__GLOBALSESSION['unique-id']).toBe(data);
    });
    it('should retrieve session when there is no data in the context', () => {
        const data = { data: 1 };
        __GLOBALSESSION['unique-id'] = data;
        const ctx: any = { sessionid: 'unique-id' };
        expect(_getSession(ctx, 'unique-id')).toBe(data);
        expect(__GLOBALSESSION['unique-id']).toEqual(data);
        expect(ctx.session).toEqual(data);
    });
    it('should retrieve session via callback', () => {
        const data = { data: 1 };
        _getSession({ session: data } as any, 'unique-id', (d) => {
            expect(d).toBe(data);
        });
        expect(__GLOBALSESSION['unique-id']).toEqual(data);
    });
    it('should retrieve session from cookie', () => {
        const data = { data: 1 };
        __GLOBALSESSION['unique-id'] = data;
        const ctx: any = { request: { headers: { cookie: 'NODEJSSESSION=unique-id' } } };

        const rtn = _getSession(ctx, 'unique-id');
        expect(rtn).toBe(data);
        expect(ctx.sessionid).toBe('unique-id');
    });
    it('should retrieve session from cookie with callback', () => {
        const data = { data: 1 };
        __GLOBALSESSION['unique-id'] = data;
        const ctx: any = { request: { headers: { cookie: 'NODEJSSESSION=unique-id' } } };

        const rtn = _getSession(ctx, 'unique-id', (d) => d);
        expect(rtn).toBe(data);
        expect(ctx.sessionid).toBe('unique-id');
    });
    it('should retrieve new session', () => {
        const data = { data: 1 };
        const ctx: any = { request: { headers: { cookie: '' } } };

        _getSession(ctx, 'unique-id');
        expect(ctx.sessionid).not.toBeUndefined();
    });
    it('should retrieve new session via callback', () => {
        const data = { data: 1 };
        const ctx: any = { request: { headers: { cookie: '' } } };
        __GLOBALSESSION.length = 1000001;

        _getSession(ctx, null as any, (d) => { return d; });
        expect(ctx.sessionid).not.toBeUndefined();
        expect(__GLOBALSESSION[ctx.sessionid]).toEqual(data);
        expect(ctx.session).toEqual(data);
    });
    it('should retrieve new session without callback', () => {
        const data = { data: 1 };
        const ctx: any = { request: { headers: { cookie: '' } } };
        __GLOBALSESSION.length = 1000001;

        _getSession(ctx, null as any);
        expect(ctx.sessionid).not.toBeUndefined();
        expect(__GLOBALSESSION[ctx.sessionid]).toEqual(data);
        expect(ctx.session).toEqual(data);
    });

});