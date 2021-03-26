import $c from '../../compiled/transformedMajor/date/global';
$c;
describe('No Conflict Date', function () {
    var date = new Date('1/8/2016 13:00:00');
    it('format - generic', function () {
        expect(date.format('m/d/Y')).toBe("01/08/2016");
    });
    it('format - day', function () {
        // Day
        expect(date.format('d')).toBe('08');
        expect(date.format('%d')).toBe('08');
        expect(date.format('D')).toBe('Fri');
        expect(date.format('j')).toBe('8');
        expect(date.format('l')).toBe('Friday');
        expect(date.format('N')).toBe('5');
        expect(date.format('S')).toBe('th');
        expect(date.format('w')).toBe('5');
        expect(date.format('%w')).toBe('6');
        expect(date.format('z')).toBe('7');
        expect(date.format('%j')).toBe('8');
    });
    it('format - week', function () {
        // Week
        expect(date.format('W')).toBe('1');
        expect(date.format('%U')).toBe('01');
    });
    it('format - month', function () {
        // Month
        expect(date.format('F')).toBe('January');
        expect(date.format('m')).toBe('01');
        expect(date.format('%m')).toBe('01');
        expect(date.format('M')).toBe('Jan');
        expect(date.format('%M')).toBe('Jan');
        expect(date.format('n')).toBe('1');
        expect(date.format('t')).toBe('31');
    });
    it('format - year', function () {
        // Year
        expect(date.format('L')).toBe('1');
        expect(date.format('o')).toBe('2016');
        expect(date.format('Y')).toBe('2016');
        expect(date.format('%Y')).toBe('2016');
        expect(date.format('y')).toBe('16');
    });
    it('format - time', function () {
        // Time
        expect(date.format('a')).toBe('pm');
        expect(date.format('A')).toBe('PM');
        expect(date.format('B')).toBe('916');
        expect(date.format('g')).toBe('1');
        expect(date.format('G')).toBe('13');
        expect(date.format('h')).toBe('01');
        expect(date.format('H')).toBe('13');
        expect(date.format('i')).toBe('00');
        expect(date.format('s')).toBe('00');
        expect(date.format('u')).toBe((date.getTime() * 1000).toString());
        expect(date.format('%L')).toBe((date.getTime()).toString());
    });
    it('format - timezone', function () {
        // Timezone
        expect($c.format(new Date(), 'e')).toBe((/\((.*)\)/.exec(new Date().toString()) as any)[1]);
        expect(date.format('I')).toBe('1');
        expect(date.format('O')).toBe('-0800');
        expect(date.format('P')).toBe('-08:00');
        expect(date.format('T')).toBe('PST');
        expect(date.format('Z')).toBe('480');
    });
    it('format - other', function () {
        // Other
        expect(date.format('c')).toBe('2016-01-08T21:00:00.000Z');
        expect(date.format('r')).toBe('Fri, 08 Jan 2016 13:00:00 -0800');
        expect(date.format('U')).toBe('1452286800');

        expect(date.format('yymmdd')).toBe('161601010808');
    });
    it('getDayOfYear', function () {
        expect(new Date('1/1/2016').getDayOfYear()).toBe(1);
        expect(new Date('3/1/2016').getDayOfYear()).toBe(61);
    });
    it('getWeek', function () {
        expect(new Date('1/1/2016').getWeek()).toBe(1);
        expect(new Date('1/8/2016').getWeek()).toBe(2);
        expect(new Date('2/1/2016').getWeek()).toBe(6);
        expect(new Date('2/7/2016').getWeek()).toBe(7);
        expect(new Date('12/31/2016').getWeek()).toBe(53);
    });
    it('isValidDate', function () {
        var ndate = new Date('adsfaf');
        expect(ndate.isValidDate()).toBe(false);
        expect(new Date().isValidDate()).toBe(true);
    });
});
