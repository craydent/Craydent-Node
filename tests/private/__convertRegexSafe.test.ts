import __convertRegexSafe from '../../modules/private/__convertRegexSafe';

describe('__defineFunction', () => {
    it('should convert string to regex safe', () => {
        const regexSafeString = __convertRegexSafe('/^[ab]{0,1}a*.+|a?!=(b)\n$');
        expect(regexSafeString).toBe('\\/\\^\\[ab\\]\\{0,1\\}a\\*\\.\\+\\|a\\?\\!=\\(b\\)\\n\\$');
    })
});
