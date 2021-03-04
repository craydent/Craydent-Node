import $c from '../../compiled/transformedMajor/date/noConflict';

describe('No Conflict Date', function () {
    var date = new Date('1/8/2016 13:00:00');
    it('format - generic', function () {
        expect($c.format(date, 'm/d/Y')).toBe("01/08/2016");
    });
    it('format - day', function () {
        // Day
        expect($c.format(date, 'd')).toBe('08');
        expect($c.format(date, '%d')).toBe('08');
        expect($c.format(date, 'D')).toBe('Fri');
        expect($c.format(date, 'j')).toBe('8');
        expect($c.format(date, 'l')).toBe('Friday');
        expect($c.format(date, 'N')).toBe('5');
        expect($c.format(date, 'S')).toBe('th');
        expect($c.format(date, 'w')).toBe('5');
        expect($c.format(date, '%w')).toBe('6');
        expect($c.format(date, 'z')).toBe('7');
        expect($c.format(date, '%j')).toBe('8');
    });
    it('format - week', function () {
        // Week
        expect($c.format(date, 'W')).toBe('1');
        expect($c.format(date, '%U')).toBe('01');
    });
    it('format - month', function () {
        // Month
        expect($c.format(date, 'F')).toBe('January');
        expect($c.format(date, 'm')).toBe('01');
        expect($c.format(date, '%m')).toBe('01');
        expect($c.format(date, 'M')).toBe('Jan');
        expect($c.format(date, '%M')).toBe('Jan');
        expect($c.format(date, 'n')).toBe('1');
        expect($c.format(date, 't')).toBe('31');
    });
    it('format - year', function () {
        // Year
        expect($c.format(date, 'L')).toBe('1');
        expect($c.format(date, 'o')).toBe('2016');
        expect($c.format(date, 'Y')).toBe('2016');
        expect($c.format(date, '%Y')).toBe('2016');
        expect($c.format(date, 'y')).toBe('16');
    });
    it('format - time', function () {
        // Time
        expect($c.format(date, 'a')).toBe('pm');
        expect($c.format(date, 'A')).toBe('PM');
        expect($c.format(date, 'B')).toBe('916');
        expect($c.format(date, 'g')).toBe('1');
        expect($c.format(date, 'G')).toBe('13');
        expect($c.format(date, 'h')).toBe('01');
        expect($c.format(date, 'H')).toBe('13');
        expect($c.format(date, 'i')).toBe('00');
        expect($c.format(date, 's')).toBe('00');
        expect($c.format(date, 'u')).toBe((date.getTime() * 1000).toString());
        expect($c.format(date, '%L')).toBe((date.getTime()).toString());
    });
    it('format - timezone', function () {
        // Timezone
        expect($c.format(new Date(), 'e')).toBe(/\((.*)\)/.exec(new Date().toString())[1]);
        expect($c.format(date, 'I')).toBe('1');
        expect($c.format(date, 'O')).toBe('-0800');
        expect($c.format(date, 'P')).toBe('-08:00');
        expect($c.format(date, 'T')).toBe('PST');
        expect($c.format(date, 'Z')).toBe('480');
    });
    it('format - other', function () {
        // Other
        expect($c.format(date, 'c')).toBe('2016-01-08T21:00:00.000Z');
        expect($c.format(date, 'r')).toBe('Fri, 08 Jan 2016 13:00:00 -0800');
        expect($c.format(date, 'U')).toBe('1452286800');

        expect($c.format(date, 'yymmdd')).toBe('161601010808');
    });
    it('getDayOfYear', function () {
        expect($c.getDayOfYear(new Date('1/1/2016'))).toBe(1);
        expect($c.getDayOfYear(new Date('3/1/2016'))).toBe(61);
    });
    it('getWeek', function () {
        expect($c.getWeek(new Date('1/1/2016'))).toBe(1);
        expect($c.getWeek(new Date('1/8/2016'))).toBe(2);
        expect($c.getWeek(new Date('2/1/2016'))).toBe(6);
        expect($c.getWeek(new Date('2/7/2016'))).toBe(7);
        expect($c.getWeek(new Date('12/31/2016'))).toBe(53);
    });
    it('isValidDate', function () {
        var ndate = new Date('adsfaf');
        expect($c.isValidDate(ndate)).toBe(false);
        expect($c.isValidDate(new Date())).toBe(true);
    });
});
