import format from '../../compiled/transformedMinor/craydent.format';
describe('format', () => {
    let date = new Date('1/1/2020 00:00:00');
    let dateWith0 = new Date('2/2/2020 01:01:02');
    let dateWithout = new Date('11/11/2020 13:11:12:13');
    const timezones = [
        'Afghanistan Time',
        'AIX specific equivalent of Central European Time',
        'Alaska Daylight Time',
        'Alaska Standard Time',
        'Arab Standard Time (Kuwait, Riyadh)',
        'Arab Standard Time',
        'Arabian Standard Time (Abu Dhabi, Muscat)',
        'Arabian Standard Time',
        'Arabic Standard Time (Baghdad)',
        'Arabic Standard Time',
        'Argentina Time',
        'Armenia Summer Time',
        'Armenia Time',
        'ASEAN Common Time',
        'Atlantic Daylight Time',
        'Atlantic Standard Time',
        'Australian Central Daylight Time',
        'Australian Central Standard Time',
        'Australian Eastern Daylight Time',
        'Australian Eastern Standard Time',
        'Australian Western Daylight Time',
        'Australian Western Standard Time',
        'Azerbaijan Time',
        'Azores Standard Time',
        'Baker Island Time',
        'Bangladesh Standard Time',
        'Bhutan Time',
        'Bolivia Time',
        'Brasilia Time',
        'British Indian Ocean Time',
        'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)',
        'British Summer Time',
        'Brunei Time',
        'Cape Verde Time',
        'Central Africa Time',
        'Central Daylight Time (North America)',
        'Central Daylight Time',
        'Central European Daylight Time',
        'Central European Summer Time (Cf. HAEC)',
        'Central European Summer Time',
        'Central European Time',
        'Central Standard Time (Australia)',
        'Central Standard Time',
        'Central Standard Time (North America)',
        'Chamorro Standard Time',
        'Chatham Daylight Time',
        'Chatham Standard Time',
        'Chile Standard Time',
        'Chile Summer Time',
        'China Standard Time',
        'China Time',
        'Christmas Island Time',
        'Clipperton Island Standard Time',
        'Cocos Islands Time',
        'Colombia Summer Time',
        'Colombia Time',
        'Cook Island Time',
        'Coordinated Universal Time',
        'East Africa Time',
        'Easter Island Standard Time',
        'Eastern Caribbean Time (does not recognise DST)',
        'Eastern Caribbean Time',
        'Eastern Daylight Time (North America)',
        'Eastern Daylight Time',
        'Eastern European Daylight Time',
        'Eastern European Summer Time',
        'Eastern European Time',
        'Eastern Standard Time (North America)',
        'Eastern Standard Time',
        'Ecuador Time',
        'Falkland Islands Summer Time',
        'Falkland Islands Time',
        'Fiji Time',
        'French Guiana Time',
        'Further-eastern_European_Time',
        'Galapagos Time',
        'Gambier Island Time',
        'Georgia Standard Time',
        'Gilbert Island Time',
        'Greenwich Mean Time',
        'Gulf Standard Time',
        'Guyana Time',
        'Hawaii Standard Time',
        'Hawaii-Aleutian Daylight Time',
        'Hawaii-Aleutian Standard Time',
        'Heard and McDonald Islands Time',
        'Heure Avancée d\'Europe Centrale francised name for CEST',
        'Hong Kong Time',
        'Indian Standard Time',
        'Indochina Time',
        'Iran Standard Time',
        'Irish Summer Time',
        'Irkutsk Time',
        'Israel Standard Time',
        'Israeli Daylight Time',
        'Japan Standard Time',
        'Kamchatka Time',
        'Korea Standard Time',
        'Krasnoyarsk Time',
        'Line Islands Time',
        'Lord Howe Standard Time',
        'Magadan Time',
        'Malaysia Time',
        'Malaysian Standard Time',
        'Marquesas Islands Time',
        'Mauritius Time',
        'Middle European Saving Time Same zone as CEST',
        'Middle European Time Same zone as CET',
        'Moscow Standard Time',
        'Moscow Summer Time',
        'Mountain Daylight Time (North America)',
        'Mountain Daylight Time',
        'Mountain Standard Time (North America)',
        'Mountain Standard Time',
        'Myanmar Standard Time',
        'Nepal Time',
        'New Zealand Daylight Time',
        'New Zealand Standard Time',
        'Newfoundland Daylight Time',
        'Newfoundland Standard Time',
        'Newfoundland Time',
        'Norfolk Time',
        'Omsk Time',
        'Pacific Daylight Time (North America)',
        'Pacific Daylight Time',
        'Pacific Standard Time (North America)',
        'Pacific Standard Time',
        'Pakistan Standard Time',
        'Philippine Standard Time',
        'Phoenix Island Time',
        'Reunion Time',
        'Samara Time',
        'Samoa Standard Time',
        'Seychelles Time',
        'Singapore Standard Time',
        'Singapore Time',
        'Solomon Islands Time',
        'South African Standard Time',
        'South Georgia and the South Sandwich Islands',
        'Sri Lanka Time',
        'Tahiti Time',
        'Thailand Standard Time',
        'Uruguay Standard Time',
        'Uruguay Summer Time',
        'Venezuelan Standard Time',
        'Vladivostok Time',
        'West Africa Time',
        'Western European Daylight Time',
        'Western European Summer Time',
        'Western European Time',
        'Western Standard Time',
        'Yakutsk Time',
        'Yekaterinburg Time'
    ];
    const timezonesShort = [
        'ACDT',
        'ACST',
        'ACT',
        'ADT',
        'AEDT',
        'AEST',
        'AFT',
        'AKDT',
        'AKST',
        'AMST',
        'AMT',
        'ART',
        'AST',
        'AWDT',
        'AWST',
        'AZOST',
        'AZT',
        'BDT',
        'BIOT',
        'BIT',
        'BOT',
        'BRT',
        'BST',
        'BTT',
        'CAT',
        'CCT',
        'CDT',
        'CEDT',
        'CEST',
        'CET',
        'CHADT',
        'CHAST',
        'CHST',
        'CIST',
        'CKT',
        'CLST',
        'CLT',
        'COST',
        'COT',
        'CST',
        'CT',
        'CVT',
        'CXT',
        'DFT',
        'EAST',
        'EAT',
        'ECT',
        'EDT',
        'EEDT',
        'EEST',
        'EET',
        'EST',
        'FET',
        'FJT',
        'FKST',
        'FKT',
        'GALT',
        'GET',
        'GFT',
        'GILT',
        'GIT',
        'GMT',
        'GST',
        'GYT',
        'HADT',
        'HAEC',
        'HAST',
        'HKT',
        'HMT',
        'HST',
        'ICT',
        'IDT',
        'IRKT',
        'IRST',
        'IST',
        'JST',
        'KRAT',
        'KST',
        'LHST',
        'LINT',
        'MAGT',
        'MDT',
        'MEST',
        'MET',
        'MIT',
        'MSD',
        'MSK',
        'MST',
        'MUT',
        'MYT',
        'NDT',
        'NFT',
        'NPT',
        'NST',
        'NT',
        'NZDT',
        'NZST',
        'OMST',
        'PDT',
        'PETT',
        'PHOT',
        'PKT',
        'PST',
        'RET',
        'SAMT',
        'SAST',
        'SBT',
        'SCT',
        'SGT',
        'SLT',
        'SST',
        'TAHT',
        'THA',
        'UTC',
        'UYST',
        'UYT',
        'VET',
        'VLAT',
        'WAT',
        'WEDT',
        'WEST',
        'WET',
        'WST',
        'YAKT',
        'YEKT'
    ];
    const timezonesRange = [
        '-1100',
        '-1000',
        '-0900',
        '-0800',
        '-0700',
        '-0600',
        '-0500',
        '-0400',
        '-0300',
        '-0200',
        '-0100',
        '0000',
        '0100',
        '0200',
        '0300',
        '0400',
        '0500',
        '0600',
        '0700',
        '0800',
        '0900',
        '1000',
        '1100',
        '1200',
        '1300',
        '1400'
    ];
    const timeRange = [
        '-11:00',
        '-10:00',
        '-09:00',
        '-08:00',
        '-07:00',
        '-06:00',
        '-05:00',
        '-04:00',
        '-03:00',
        '-02:00',
        '-01:00',
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00'
    ];
    const timeRangeInSeconds = [
        '140',
        '130',
        '120',
        '660',
        '600',
        '540',
        '480',
        '420',
        '360',
        '300',
        '240',
        '180',
        '120',
        '60',
        '0',
        '-60',
        '-120',
        '-180',
        '-240',
        '-300',
        '-360',
        '-420',
        '-480',
        '-540',
        '-600',
        '-660'
    ]
    it('should return blank string with invalid date', () => {
        expect(format(new Date('invalid'), 'mm dd YY')).toBe('');
    });
    it('should format based on options', () => {

        expect(format(dateWith0, 'm d Y')).toBe('02 02 2020');
        expect(format(dateWith0, '%m %d %Y')).toBe('02 02 2020');

        expect(format(dateWithout, 'm d Y')).toBe('11 11 2020');
        expect(format(dateWithout, '%m %d %Y')).toBe('11 11 2020');
        expect(format(dateWithout, '\\m\\o\\n\\d\\a\\y')).toBe('monday');
    });
    it('should format with day options', () => {
        expect(format(dateWith0, 'd')).toBe('02');
        expect(format(dateWith0, '%d')).toBe('02');
        expect(format(dateWith0, 'D')).toBe('Sun');
        expect(format(dateWith0, 'j')).toBe('2');
        expect(format(dateWith0, 'l')).toBe('Sunday');
        expect(format(dateWith0, 'N')).toBe('7');
        expect(format(dateWith0, 'S')).toBe('nd');
        debugger;
        expect(format(dateWith0, 'jS')).toBe('2nd');
        expect(format(dateWith0, '%w')).toBe('1');
        expect(format(dateWith0, 'w')).toBe('0');
        expect(format(dateWith0, 'z')).toBe('32');
        expect(format(dateWith0, '%j')).toBe('33');

        expect(format(dateWithout, 'd')).toBe('11');
        expect(format(dateWithout, '%d')).toBe('11');
        expect(format(dateWithout, 'D')).toBe('Wed');
        expect(format(dateWithout, 'j')).toBe('11');
        expect(format(dateWithout, 'l')).toBe('Wednesday');
        expect(format(dateWithout, 'N')).toBe('3');
        expect(format(dateWithout, 'S')).toBe('th');
        expect(format(dateWithout, '%w')).toBe('4');
        expect(format(dateWithout, 'w')).toBe('3');
        expect(format(dateWithout, 'z')).toBe('315');
        expect(format(dateWithout, '%j')).toBe('316');
    })
    it('should format with Week options', () => {
        expect(format(dateWith0, 'W')).toBe('5');
        expect(format(dateWith0, '%U')).toBe('05');

        expect(format(dateWithout, 'W')).toBe('45');
        expect(format(dateWithout, '%U')).toBe('45');
    })
    it('should format with Month options', () => {
        expect(format(dateWith0, 'm')).toBe('02');
        expect(format(dateWith0, '%m')).toBe('02');
        expect(format(dateWith0, 'M')).toBe('Feb');
        expect(format(dateWith0, '%M')).toBe('Feb');
        expect(format(dateWith0, 'n')).toBe('2');
        expect(format(dateWith0, 't')).toBe('29');

        expect(format(dateWithout, 'm')).toBe('11');
        expect(format(dateWithout, '%m')).toBe('11');
        expect(format(dateWithout, 'M')).toBe('Nov');
        expect(format(dateWithout, '%M')).toBe('Nov');
        expect(format(dateWithout, 'n')).toBe('11');
        expect(format(dateWithout, 't')).toBe('30');
    })
    it('should format with Year options', () => {
        expect(format(dateWith0, 'L')).toBe('1');
        expect(format(dateWith0, 'o')).toBe('2020');
        expect(format(dateWith0, 'Y')).toBe('2020');
        expect(format(dateWith0, '%Y')).toBe('2020');
        expect(format(dateWith0, 'y')).toBe('20');

        expect(format(dateWithout, 'L')).toBe('1');
        expect(format(dateWithout, 'o')).toBe('2020');
        expect(format(dateWithout, 'Y')).toBe('2020');
        expect(format(dateWithout, '%Y')).toBe('2020');
        expect(format(dateWithout, 'y')).toBe('20');
    })
    it('should format with Meridiem options', () => {
        expect(format(dateWith0, 'a')).toBe('am');
        expect(format(dateWith0, 'A')).toBe('AM');
        expect(format(dateWith0, 'B')).toBe('417');

        expect(format(dateWithout, 'a')).toBe('pm');
        expect(format(dateWithout, 'A')).toBe('PM');
        expect(format(dateWithout, 'B')).toBe('924');
    })
    it('should format with Hour options', () => {
        expect(format(date, 'h', { offset: 7 })).toBe('09');
        expect(format(date, 'h', { offset: 0 })).toBe('08');

        expect(format(dateWith0, 'g')).toBe('1');
        expect(format(dateWith0, 'G')).toBe('1');
        expect(format(dateWith0, 'h')).toBe('01');
        expect(format(dateWith0, 'H')).toBe('01');
        expect(format(dateWith0, '%H')).toBe('01');


        expect(format(dateWithout, 'g')).toBe('1');
        expect(format(dateWithout, 'G')).toBe('13');
        expect(format(dateWithout, 'h')).toBe('01');
        expect(format(dateWithout, 'H')).toBe('13');
        expect(format(dateWithout, '%H')).toBe('13');
    })
    it('should format with Minute options', () => {
        expect(format(dateWith0, 'i')).toBe('01');

        expect(format(dateWithout, 'i')).toBe('11');
    })
    it('should format with Seconds options', () => {
        expect(format(dateWith0, 's')).toBe('02');
        expect(format(dateWith0, '%S')).toBe('02');

        expect(format(dateWithout, 's')).toBe('12');
        expect(format(dateWithout, '%S')).toBe('12');
    })
    it('should format with Micro/Milliseconds options', () => {
        expect(format(dateWith0, 'u')).toBe('1580634062000000');
        expect(format(dateWith0, '%L')).toBe('1580634062000');

        expect(format(dateWithout, 'u')).toBe('1605129072013000');
        expect(format(dateWithout, '%L')).toBe('1605129072013');
    })
    it('should format with Timezone options', () => {
        expect(timezones).toContain(format(dateWith0, 'e'));
        expect(format(dateWith0, 'I')).toBe('1');
        expect(timezonesRange).toContain(format(dateWith0, 'O'));
        expect(timeRange).toContain(format(dateWith0, 'P'));
        expect(timezonesShort).toContain(format(dateWith0, 'T'));
        expect(timeRangeInSeconds).toContain(format(dateWith0, 'Z'));

        expect(timezones).toContain(format(dateWithout, 'e'));
        expect(format(dateWithout, 'I')).toBe('1');
        expect(timezonesRange).toContain(format(dateWithout, 'O'));
        expect(timeRange).toContain(format(dateWithout, 'P'));
        expect(timezonesShort).toContain(format(dateWithout, 'T'));
        expect(timeRangeInSeconds).toContain(format(dateWithout, 'Z'));
    })
    it('should format with other options', () => {
        expect(format(dateWith0, 'c', { gmt: true })).toBe('2020-02-02T17:01:02.000Z');
        expect(format(dateWith0, 'r', { gmt: true })).toBe('Sun, 02 Feb 2020 09:01:02 -0000');
        expect(format(dateWith0, 'U', { gmt: true })).toBe('1580662862');

        expect(format(dateWithout, 'c', { gmt: true })).toBe('2020-11-12T05:11:12.013Z');
        expect(format(dateWithout, 'r', { gmt: true })).toBe('Wed, 11 Nov 2020 21:11:12 -0000');
        expect(format(dateWithout, 'U', { gmt: true })).toBe('1605157872.013');
    })
});
