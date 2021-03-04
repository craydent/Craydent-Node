import getSessionID from '../../compiled/transformedMinor/craydent.getsessionid';
describe('getSessionID', () => {
    it('should retrieve the session id on this', () => {
        const context = { sessionid: "12345" };
        expect(getSessionID.call(context)).toBe("12345");
    })
});
