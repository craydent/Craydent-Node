import getSessionID from '../../modules/methods/getSessionID';
describe('getSessionID', () => {
    it('should retrieve the session id on this', () => {
        const context = { sessionid: "12345" };
        expect(getSessionID.call(context)).toBe("12345");
    })
});
