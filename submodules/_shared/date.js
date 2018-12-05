/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var timezones = {
    'Afghanistan Time':'AFT',
    'AIX specific equivalent of Central European Time':'DFT',
    'Alaska Daylight Time':'AKDT',
    'Alaska Standard Time':'AKST',
    'Arab Standard Time (Kuwait, Riyadh)':'AST',
    'Arab Standard Time':'AST',
    'Arabian Standard Time (Abu Dhabi, Muscat)':'AST',
    'Arabian Standard Time':'AST',
    'Arabic Standard Time (Baghdad)':'AST',
    'Arabic Standard Time':'AST',
    'Argentina Time':'ART',
    'Armenia Summer Time':'AMST',
    'Armenia Time':'AMT',
    'ASEAN Common Time':'ACT',
    'Atlantic Daylight Time':'ADT',
    'Atlantic Standard Time':'AST',
    'Australian Central Daylight Time':'ACDT',
    'Australian Central Standard Time':'ACST',
    'Australian Eastern Daylight Time':'AEDT',
    'Australian Eastern Standard Time':'AEST',
    'Australian Western Daylight Time':'AWDT',
    'Australian Western Standard Time':'AWST',
    'Azerbaijan Time':'AZT',
    'Azores Standard Time':'AZOST',
    'Baker Island Time':'BIT',
    'Bangladesh Standard Time':'BST',
    'Bhutan Time':'BTT',
    'Bolivia Time':'BOT',
    'Brasilia Time':'BRT',
    'British Indian Ocean Time':'BIOT',
    'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)':'BST',
    'British Summer Time':'BST',
    'Brunei Time':'BDT',
    'Cape Verde Time':'CVT',
    'Central Africa Time':'CAT',
    'Central Daylight Time (North America)':'CDT',
    'Central Daylight Time':'CDT',
    'Central European Daylight Time':'CEDT',
    'Central European Summer Time (Cf. HAEC)':'CEST',
    'Central European Summer Time':'CEST',
    'Central European Time':'CET',
    'Central Standard Time (Australia)':'ACST',
    'Central Standard Time':'CST',
    'Central Standard Time (North America)':'CST',
    'Chamorro Standard Time':'CHST',
    'Chatham Daylight Time':'CHADT',
    'Chatham Standard Time':'CHAST',
    'Chile Standard Time':'CLT',
    'Chile Summer Time':'CLST',
    'China Standard Time':'CST',
    'China Time':'CT',
    'Christmas Island Time':'CXT',
    'Clipperton Island Standard Time':'CIST',
    'Cocos Islands Time':'CCT',
    'Colombia Summer Time':'COST',
    'Colombia Time':'COT',
    'Cook Island Time':'CKT',
    'Coordinated Universal Time':'UTC',
    'East Africa Time':'EAT',
    'Easter Island Standard Time':'EAST',
    'Eastern Caribbean Time (does not recognise DST)':'ECT',
    'Eastern Caribbean Time':'ECT',
    'Eastern Daylight Time (North America)':'EDT',
    'Eastern Daylight Time':'EDT',
    'Eastern European Daylight Time':'EEDT',
    'Eastern European Summer Time':'EEST',
    'Eastern European Time':'EET',
    'Eastern Standard Time (North America)':'EST',
    'Eastern Standard Time':'EST',
    'Ecuador Time':'ECT',
    'Falkland Islands Summer Time':'FKST',
    'Falkland Islands Time':'FKT',
    'Fiji Time':'FJT',
    'French Guiana Time':'GFT',
    'Further-eastern_European_Time':'FET',
    'Galapagos Time':'GALT',
    'Gambier Island Time':'GIT',
    'Georgia Standard Time':'GET',
    'Gilbert Island Time':'GILT',
    'Greenwich Mean Time':'GMT',
    'Gulf Standard Time':'GST',
    'Guyana Time':'GYT',
    'Hawaii Standard Time':'HST',
    'Hawaii-Aleutian Daylight Time':'HADT',
    'Hawaii-Aleutian Standard Time':'HAST',
    'Heard and McDonald Islands Time':'HMT',
    'Heure Avancée d\'Europe Centrale francised name for CEST':'HAEC',
    'Hong Kong Time':'HKT',
    'Indian Standard Time':'IST',
    'Indochina Time':'ICT',
    'Iran Standard Time':'IRST',
    'Irish Summer Time':'IST',
    'Irkutsk Time':'IRKT',
    'Israel Standard Time':'IST',
    'Israeli Daylight Time':'IDT',
    'Japan Standard Time':'JST',
    'Kamchatka Time':'PETT',
    'Korea Standard Time':'KST',
    'Krasnoyarsk Time':'KRAT',
    'Line Islands Time':'LINT',
    'Lord Howe Standard Time':'LHST',
    'Magadan Time':'MAGT',
    'Malaysia Time':'MYT',
    'Malaysian Standard Time':'MST',
    'Marquesas Islands Time':'MIT',
    'Mauritius Time':'MUT',
    'Middle European Saving Time Same zone as CEST':'MEST',
    'Middle European Time Same zone as CET':'MET',
    'Moscow Standard Time':'MSK',
    'Moscow Summer Time':'MSD',
    'Mountain Daylight Time (North America)':'MDT',
    'Mountain Daylight Time':'MDT',
    'Mountain Standard Time (North America)':'MST',
    'Mountain Standard Time':'MST',
    'Myanmar Standard Time':'MST',
    'Nepal Time':'NPT',
    'New Zealand Daylight Time':'NZDT',
    'New Zealand Standard Time':'NZST',
    'Newfoundland Daylight Time':'NDT',
    'Newfoundland Standard Time':'NST',
    'Newfoundland Time':'NT',
    'Norfolk Time':'NFT',
    'Omsk Time':'OMST',
    'Pacific Daylight Time (North America)':'PDT',
    'Pacific Daylight Time':'PDT',
    'Pacific Standard Time (North America)':'PST',
    'Pacific Standard Time':'PST',
    'Pakistan Standard Time':'PKT',
    'Philippine Standard Time':'PST',
    'Phoenix Island Time':'PHOT',
    'Reunion Time':'RET',
    'Samara Time':'SAMT',
    'Samoa Standard Time':'SST',
    'Seychelles Time':'SCT',
    'Singapore Standard Time':'SST',
    'Singapore Time':'SGT',
    'Solomon Islands Time':'SBT',
    'South African Standard Time':'SAST',
    'South Georgia and the South Sandwich Islands':'GST',
    'Sri Lanka Time':'SLT',
    'Tahiti Time':'TAHT',
    'Thailand Standard Time':'THA',
    'Uruguay Standard Time':'UYT',
    'Uruguay Summer Time':'UYST',
    'Venezuelan Standard Time':'VET',
    'Vladivostok Time':'VLAT',
    'West Africa Time':'WAT',
    'Western European Daylight Time':'WEDT',
    'Western European Summer Time':'WEST',
    'Western European Time':'WET',
    'Western Standard Time':'WST',
    'Yakutsk Time':'YAKT',
    'Yekaterinburg Time':'YEKT'
},
    _isInt, _error, _isValidDate, _keyOf;


function format (obj, format, options) {
    try {
        if(!_isValidDate(obj)) { return; }
        options = options || { offset : 0 };
        /*
         *  options properties:
         *  gmt:true - convert to GMT
         *  offset:offset from GMT
         **/
        var localTimeZoneOffset = getGMTOffset(obj),
            datetime = options.offset ? new Date(obj.valueOf() - (options.offset + (options.offset ? -1 : 1) * localTimeZoneOffset)*60*60000) : obj;


        if (options.gmt) {
            datetime = new Date(datetime.valueOf() - localTimeZoneOffset*60*60000);
            currentTimezone = "\\G\\M\\T";
            GMTDiff = 0;
        }

        var hour = datetime.getHours(),
            uhour = datetime.getUTCHours(),
            minute = datetime.getMinutes(),
            second = datetime.getSeconds(),
            GMTDiff = options.offset || hour - (hour > uhour ? 24 : 0) - uhour,
            epoch = datetime.getTime(),
            ct = datetime.toTimeString().replace(/.*?\((.*?)\).*?/, '$1'),
            ctkey = _keyOf(timezones,ct),
            currentTimezone = "\\"+(!ctkey ? (timezones[ct] || "") : ct).split('').join("\\"),
            currentTimezoneLong = "\\"+(ctkey || ct).split('').join("\\"),
            minuteWithZero = (minute < 10 ? "0" + minute : minute),
            secondsWithZero = (second < 10 ? "0" + second : second),
            date = datetime.getDate(),
            day = datetime.getDay(),
            month = datetime.getMonth() + 1,
            year = datetime.getFullYear(),
            firstMonday = new Date((new Date('1/6/' + year)).getTime() + (1-(new Date('1/6/' + year)).getDay())*(24*60*60*1000)),
            week = getWeek(datetime) - 1,
            dayOfYear = getDayOfYear(datetime),
            dayOfYearFrom1 = dayOfYear - 1,
            dayOfYearWithZero = (dayOfYearFrom1 < 10 ? "00" + dayOfYearFrom1 : (dayOfYearFrom1 < 100 ? "0" + dayOfYearFrom1 : dayOfYearFrom1)),

            dateWithZero = (date < 10 ? "0" + date : date),
            threeLetterDay = ['\\S\\u\\n','\\M\\o\\n','\\T\\u\\e\\s','\\W\\e\\d','\\T\\h\\u','\\F\\r\\i', '\\S\\a\\t'][day],
            threeLetterMonth = ['\\J\\a\\n','\\F\\e\\b','\\M\\a\\r','\\A\\p\\r','\\M\\a\\y','\\J\\u\\n','\\J\\u\\l','\\A\\u\\g','\\S\\e\\p','\\O\\c\\t','\\N\\o\\v','\\D\\e\\c'][month - 1],
            hour24 = (hour < 10 ? "0" + hour : hour),
            GMTDiffFormatted = (GMTDiff > 0 ? "+" : "-") + (Math.abs(GMTDiff) < 10 ? "0" : "") + Math.abs(GMTDiff) + "00",
            hr = hour < 10 ? "0" + hour : (hour > 12 && hour - 12 < 10) ? "0" + (hour - 12) : hour - 12;

        hr = hr == 0 ? 12: hr;

        // Double replace is used to fix concecutive character bug
        return format.
        // replace all d's with the 2 digit day leading 0
        /*option d or %d*/replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).
        // replace all D's with A textual representation of a day, three letters
        /*option D*/replace(/([^\\])D|^D/g, '$1' + threeLetterDay).replace(/([^\\])D|^D/g, '$1' + threeLetterDay).
        // replace all j's with the day without leading 0
        /*option j*/replace(/([^\\%])j|^j/g, '$1' + date).replace(/([^\\%])j|^j/g, '$1' + date).
        // replace all l's (lower case L) with A full textual representation of the day of the week
        /*option l*/replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y','\\M\\o\\n\\d\\a\\y','\\T\\u\\e\\s\\d\\a\\y','\\W\\e\\d\\n\\e\\s\\d\\a\\y','\\T\\h\\u\\r\\s\\d\\a\\y','\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).
        // replace all N's with ISO-8601 numeric representation of the day of the week
        /*option N*/replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).
        // replace all S's with English ordinal suffix for the day of the month, 2 characters
        /*option S*/replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).
        // replace all %w's with Numeric representation of the day of the week (starting from 0)
        /*option %w*/replace(/([^\\])%w|^%w/g, day + 1).replace(/([^\\])%w|^%w/g, day + 1).
        // replace all w's with Numeric representation of the day of the week (starting from 1)
        /*option w*/replace(/([^\\])w|^w/g, '$1' + day).replace(/([^\\])w|^w/g, '$1' + day).
        // replace all z's with The day of the year (starting from 0)
        /*option z*/replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).
        // replace all %j's with The day of the year (starting from 1)
        /*option %j*/replace(/([^\\])%j|^%j/g, dayOfYear).replace(/([^\\])%j|^%j/g, dayOfYear).

        // replace all W's with ISO-8601 week number of the year, weeks starting on Monday
        /*option W*/replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).
        // replace all %U's with ISO-8601 week number of the year, weeks starting on Monday with leading 0
        /*option W*/replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).

        // replace all F's with A full textual representation of a month, such as January or March
        /*option F*/replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y','\\F\\e\\b\\r\\u\\a\\r\\y','\\M\\a\\r\\c\\h','\\A\\p\\r\\i\\l','\\M\\a\\y','\\J\\u\\n\\e','\\J\\u\\l\\y','\\A\\u\\g\\u\\s\\t','\\S\\e\\p\\t\\e\\m\\b\\e\\r','\\O\\c\\t\\o\\b\\e\\r','\\N\\o\\v\\e\\m\\b\\e\\r','\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).
        // replace all m's with Numeric representation of a month, with leading zeros
        /*option m* or %m*/replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).
        // replace all M's with A short textual representation of a month, three letters
        /*option M or %M*/replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).
        // replace all n's with Numeric representation of a month, without leading zeros
        /*option n*/replace(/([^\\])n|^n/g, '$1' + month).replace(/([^\\])n|^n/g, '$1' + month).
        // replace all t's with Number of days in the given month
        /*option t*/replace(/([^\\])t|^t/g, '$1' + (month == 2 && _isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).replace(/([^\\])t|^t/g, '$1' + (month == 2 && _isInt(year/4) ? 29 :[31,28,31,30,31,30,31,31,30,31,30,31][month - 1])).

        //replace all L's with Whether it's a leap year
        /*option L*/replace(/([^\\%])L|^L/g, '$1' + _isInt(year%4) ? 1 : 0).replace(/([^\\%])L|^L/g, '$1' + _isInt(year%4) ? 1 : 0).
        //replace all o's with A full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.
        /*option o*/replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).
        //replace all Y's with A full numeric representation of a year, 4 digits
        /*option Y or %Y*/replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).
        //replace all t's with A two digit representation of a year
        /*option y*/replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).

        //replace all a's with Lowercase Ante Meridiem and Post Meridiem
        /*option a*/replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).
        //replace all A's with Uppercase Ante Meridiem and Post Meridiem
        /*option A*/replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).
        //replace all B's with Swatch Internet time
        /*option B*/replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1)%24) + datetime.getUTCMinutes()/60 + datetime.getUTCSeconds()/3600)*1000/24)).replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1)%24) + datetime.getUTCMinutes()/60 + datetime.getUTCSeconds()/3600)*1000/24)).
        //replace all g's with 12-hour format of an hour without leading zeros
        /*option g*/replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).
        //replace all G's with 24-hour format of an hour without leading zeros
        /*option G*/replace(/([^\\])G|^G/g, '$1' + hour).replace(/([^\\])G|^G/g, '$1' + hour).
        //replace all h's with 12-hour format of an hour with leading zeros
        /*option h*/replace(/([^\\])h|^h/g, '$1' + hr).replace(/([^\\])h|^h/g, '$1' + hr).
        //replace all H's with 24-hour format of an hour with leading zeros
        /*option H or %H*/replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).
        //replace all i's with Minutes with leading zeros
        /*option i*/replace(/([^\\])i|^i/g, '$1' + minuteWithZero).replace(/([^\\])i|^i/g, '$1' + minuteWithZero).
        //replace all s's with Seconds, with leading zeros
        /*option s or %S*/replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).
        //replace all u's with Microseconds
        /*option u*/replace(/([^\\])u|^u/g, '$1' + epoch*1000).replace(/([^\\])u|^u/g, '$1' + epoch*1000).
        //replace all L's with Milliseconds
        /*option %L*/replace(/([^\\])%L|^%L/g, epoch).replace(/([^\\])%L|^%L/g, epoch).

        //replace all e's with Timezone identifier
        /*option e*/replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).
        //replace all I's with Whether or not the date is in daylight saving time
        /*option I*/replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).

        //replace all O's with Difference to Greenwich time (GMT) in hours
        /*option O*/replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).
        //replace all P's with Difference to Greenwich time (GMT) with colon between hours and minutes
        /*option P*/replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3,2)).
        //replace all T's with Timezone abbreviation
        /*option T*/replace(/([^\\])T|^T/g, '$1' + currentTimezone).replace(/([^\\])T|^T/g, '$1' + currentTimezone).
        //replace all Z's with Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
        /*option Z*/replace(/([^\\])Z|^Z/g, '$1' + (-1 * GMTDiff * 60)).replace(/([^\\])T|^T/g, '$1' + currentTimezone).

        //replace all c's with ISO 8601 date
        /*option c*/replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).
        //replace all r's with RFC 2822 formatted date
        /*option r*/replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year  + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).
        //replace all U's with Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
        /*option U*/replace(/([^\\])U|^U/g, '$1' + epoch / 1000).replace(/([^\\])U|^U/g, '$1' + epoch / 1000).
        replace(/\\/gi, "");
    } catch (e) {
        _error && _error("Date.format", e);
    }
}
function getDayOfYear (obj) {
    try {
        return Math.floor((obj - new Date(obj.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    } catch (e) {
        _error && _error("Date.getDayOfYear", e);
    }
}
function getGMTOffset (dt) {
    try {
        var diff = dt.getHours() - dt.getUTCHours();
        return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24:0):0):24);
    } catch (e) {
        _error && _error('getGMTOffset', e);
    }
}
function getWeek (obj) {
    try {
        var d = new Date(obj);
        d.setHours(0, 0, 0);
        var fdate = new Date(d.getFullYear(), 0, 1);
        return Math.ceil((((d - fdate) / 8.64e7) + 1 +fdate.getDay()) / 7);
    } catch (e) {
        _error && _error("Date.getWeek", e);
    }
}
function now (fmt) {
    /*|{
        "info": "Get the DateTime of now",
        "category": "Utility",
        "parameters":[
            {"format?": "(String) Format syntax to return formatted string of now"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#now",
        "returnType":"(Date|String)"
    }|*/
    try {
        return fmt ? format((new Date()), fmt) : new Date();
    } catch (e) {
        _error && _error('now', e);
    }
}

function init (ctx) {
    require('./isValidDate')(ctx);
    require('./keyOf')(ctx);

    _isValidDate = ctx.isValidDate;
    _keyOf = ctx.keyOf;
    _isInt = ctx.isInt;
    _error = ctx.error;

    ctx.format = format;
    ctx.getDayOfYear = getDayOfYear;
    ctx.getGMTOffset = getGMTOffset;
    ctx.getWeek = getWeek;
    ctx.now = now;
}

module.exports = init;
