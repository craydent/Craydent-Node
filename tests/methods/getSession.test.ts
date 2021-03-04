import getSession from '../../compiled/transformedMinor/craydent.getsession';
jest.mock('../../compiled/transformedMinor/craydent.getsession/protected/_getSession', () => {
    return {
        "default": (...args) => _getSession.apply(this, args)
    }
});
let _getSession = (ctx, sid, cb) => { }
describe('getSession', () => {
    beforeEach(() => {
        _getSession = (ctx, sid, cb) => { }
    });
    it('should retrieve session', async () => {
        const sessionObject = { res: true };
        _getSession = jest.fn((ctx, sid, cb) => cb(sessionObject));

        expect(await getSession('sid')).toEqual(sessionObject);
        expect(_getSession).toHaveBeenCalled();
    });
    it('should retrieve session and callback when provided', async () => {
        const sessionObject = { res: true };
        _getSession = jest.fn((ctx, sid, cb) => cb(sessionObject));
        const callback = jest.fn();

        expect(await getSession('sid', callback)).toEqual(sessionObject);
        expect(_getSession).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledWith(sessionObject);
    });
});