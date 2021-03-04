import getSessionSync from '../../compiled/transformedMinor/craydent.getsessionsync';
jest.mock('../../compiled/transformedMinor/craydent.getsessionsync/protected/_getSession', () => {
    return {
        "default": (...args) => _getSession.apply(this, args)
    }
});
let _getSession = (ctx, sid) => { }
describe('getSession', () => {
    beforeEach(() => {
        _getSession = (ctx, sid) => { }
    });
    it('should retrieve session', () => {
        const sessionObject = { res: true };
        _getSession = jest.fn((ctx, sid) => sessionObject);

        expect(getSessionSync('sid')).toEqual(sessionObject);
        expect(_getSession).toHaveBeenCalled();
    });
});