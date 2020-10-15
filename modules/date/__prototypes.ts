import * as IEquals from '../methods/equals';
import * as IFormat from '../methods/format';
import * as IGetDayOfYear from '../methods/getDayOfYear';
import * as IGetGMTOffset from '../methods/getGMTOffset';
import * as IGetValue from '../methods/getValue';
import * as IGetWeek from '../methods/getWeek';
import * as IIsValidDate from '../methods/isValidDate';
import * as INow from '../methods/now';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined'){
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const equals: typeof IEquals.default = require('../methods/equals').default;
const format: typeof IFormat.default = require('../methods/format').default;
const getDayOfYear: typeof IGetDayOfYear.default = require('../methods/getDayOfYear').default;
const getGMTOffset: typeof IGetGMTOffset.default = require('../methods/getGMTOffset').default;
const getValue: typeof IGetValue.default = require('../methods/getValue').default;
const getWeek: typeof IGetWeek.default = require('../methods/getWeek').default;
const isValidDate: typeof IIsValidDate.default = require('../methods/isValidDate').default;
const now: typeof INow.default = require('../methods/now').default;
//#endregion

export function _equals(this: Date, compare: any, props?: string[]): boolean;
export function _equals(this: Date, compare: any): boolean;
export function _equals(compare, props?): boolean {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    return equals(this, compare, props);
}

export function _format(this: Date, formatStr: string, options?: IFormat.DateOptions): string {
    /*|{
        "info": "Date class extension to convert to formatted string",
        "category": "Date",
        "featured": true,
        "parameters":[
            {"format": "(String) Format syntax to use to to format date"}],

        "overloads":[
            {"parameters":[
                {"format": "(String) Format syntax to use to to format date"},
                {"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset"}]}],

        "description":"<h2>Format syntax is as follows:</h2><br /><h3>Day Options</h3><p>d or %d: 2 digit day leading 0<br />D: textual representation of a day, three letters<br />j: day without leading 0<br />l (lower case L): full textual representation of the day of the week<br />N: ISO-8601 numeric representation of the day of the week<br />S: English ordinal suffix for the day of the month, 2 characters<br />w: Numeric representation of the day of the week (starting from 1)<br />%w: Numeric representation of the day of the week (starting from 0)<br />z: The day of the year (starting from 0)<br />%j: day of the year (starting from 1)</p><h3>Week Options</h3><p>W: ISO-8601 week number of the year, weeks starting on Monday<br />U: ISO-8601 week number of the year, weeks starting on Monday with leading 0<br /></p><h3>Month Options</h3><p>F: full textual representation of a month, such as January or March<br />m or %m: Numeric representation of a month, with leading zeros<br />M or %M: short textual representation of a month, three letters<br />n: Numeric representation of a month, without leading zeros<br />t: Number of days in the given month<br /></p><h3>Year Options</h3><p>L: 0 or 1 indicating whether it's a leap year<br />o: full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.<br />Y or %Y: full numeric representation of a year, 4 digits<br />y: two digit representation of a year<br /></p><h3>Time Options</h3><p>a: Lowercase Ante Meridiem and Post Meridiem<br />A: Uppercase Ante Meridiem and Post Meridiem<br />B: Swatch Internet time<br />g: 12-hour format of an hour without leading zeros<br />G: 24-hour format of an hour without leading zeros<br />h: 12-hour format of an hour with leading zeros<br />H or %H: 24-hour format of an hour with leading zeros<br />i: Minutes with leading zeros<br />s or %S: Seconds, with leading zeros<br />u: Microseconds<br />%L: Milliseconds<br /></p><h3>Timezone Options</h3><p>e: Timezone identifier<br />I: 0 or 1 indicating whether or not the date is in daylight saving time<br />O: Difference to Greenwich time (GMT) in hours<br />P: Difference to Greenwich time (GMT) with colon between hours and minutes<br />T: Timezone abbreviation<br />Z: Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive<br /></p><h3>Other Options</h3><p>c: ISO 8601 date<br />r: RFC 2822 formatted date<br />U: Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</p>",
        "url": "http://www.craydent.com/library/1.9.3/docs#date.format",
        "returnType": "(String)"
    }|*/
    return format(this, formatStr, options);
}

export function _getDayOfYear(this: Date): number {
    /*|{
        "info": "Date class extension to retrieve the day of the year",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.getDayOfYear",
        "returnType": "(Int)"
    }|*/
    return getDayOfYear(this);
}

export function _getGMTOffset(this: Date): number {
    /*|{
        "info": "Date class extension to get the GMT Offset",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#date.getGMTOffset",
        "returnType": "(Number)"
    }|*/
    return getGMTOffset(this);
}

export function _getValue(this: Date, args?: any[], dflt?: any): any {
    /*|{
        "info": "Object class extension to retrieve value of an object property",
        "category": "Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"dflt": "(Mixed) Default value to return if context is not a function"}]},

            {"parameters":[
                {"args": "(Mixed[]) An array of arguments to pass to context when it is a function"},
                {"dflt": "(Mixed) Default value to return if context is not a function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
        "returnType": "(Mixed)"
    }|*/
    return getValue(this as any, args, dflt);
}

export function _getWeek(this: Date): number {
    /*|{
        "info": "Date class extension to retrieve the week number in the year",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.getWeek",
        "returnType": "(Int)"
    }|*/
    return getWeek(this)
}
export function _isValidDate(this: Date): boolean {
    /*|{
        "info": "Date class extension to check if the date is valid",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.isValidDate",
        "returnType": "(Bool)"
    }|*/
    return isValidDate(this);
}

export { now };