import getSessionSync from '../../compiled/transformedMinor/craydent.getsessionsync';
jest.mock('../../compiled/transformedMinor/craydent.getsessionsync/protected/_getSession', () => {
    return {
        "default": (...args: any[]) => _getSession.apply(this, args as any)
    }
});
let _getSession = (ctx: any, sid: any) => { }
describe('getSession', () => {
    beforeEach(() => {
        _getSession = (ctx: any, sid: any) => { }
    });
    it('should retrieve session', () => {
        const sessionObject = { res: true };
        _getSession = jest.fn((ctx: any, sid: any) => sessionObject);

        expect(getSessionSync('sid')).toEqual(sessionObject);
        expect(_getSession).toHaveBeenCalled();
    });
});