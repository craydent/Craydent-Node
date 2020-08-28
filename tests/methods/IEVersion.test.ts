import IEVersion from '../../modules/methods/IEVersion';
describe('IEVersion', () => {
    it('should retrieve the IE vsersion', () => {
        const dis = {
            navigator: {
                appName: "Microsoft Internet Explorer",
                userAgent: "MSIE 6.11"
            }
        };
        expect(IEVersion.call(dis)).toBe(6.11);
    });
    it('should retrieve the IE version if Edge', () => {
        const dis = {
            navigator: {
                appName: "Netscape",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 14) Edge/18.18"
            }
        };
        expect(IEVersion.call(dis)).toBe(18.18);
    });
    it('should retrieve the IE version if 11', () => {
        const dis = {
            navigator: {
                appName: "Netscape",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 14) rv:11.0"
            }
        };
        expect(IEVersion.call(dis)).toBe(11);
    });
});
