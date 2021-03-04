import error from '../methods/error';
import { DateTimeOptions } from '../models/DateTimeOptions';
import isString from '../methods/isstring';
import isNull from '../methods/isnull';
import getGMTOffset from '../methods/getgmtoffset';
import format from '../methods/format';

export default function toDateTime(strDatetime: string, options?: DateTimeOptions): Date | string {
    /*|{
        "info": "String class extension to convert string to datetime",
        "category": "String",
        "parameters":[
            {"options?": "(DateTimeOptions) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.toDateTime",
        "returnType": "(Date|String)"
    }|*/
    try {
        /*
        *  options properties:
        *  gmt:true - convert to GMT
        *  offset:offset from GMT
        *  format:format used in Datetime.format
        **/
        options = options || {};
        let dt = new Date(strDatetime);
        if (/\d\d\d\d-\d\d-\d\d$/.test(strDatetime)) {
            dt = new Date(strDatetime.replace("-", "/").replace("-", "/"));
        }
        if (!dt.getDate() && isString(strDatetime)) {
            dt = new Date(strDatetime.replace(/(am|pm)/i, ' $1'));
        }
        if (!dt.getDate()) {
            let parts = [],
                dtstring = strDatetime[0] == "(" ? strDatetime.substring(1, strDatetime.length - 1) : strDatetime,
                chars = ["\\.", "\\/", "-", "\\s*?"], c, i = 0;

            while ((c = chars[i++]) && !dt.getDate()) {
                // using format m(m).d(d).yy(yy) or d(d).m(m).yy(yy) or yy(yy).m(m).d(d) or yy(yy).d(d).m(m)
                // using format m(m)/d(d)/yy(yy) or d(d)/m(m)/yy(yy) or yy(yy)/m(m)/d(d) or yy(yy)/d(d)/m(m)
                // using format m(m)-d(d)-yy(yy) or d(d)-m(m)-yy(yy) or yy(yy)-m(m)-d(d) or yy(yy)-d(d)-m(m)
                let regex = new RegExp(`(\\d{1,4})${c}\\s*?(\\d{1,2})${c}\\s*?(\\d{2,4})(.*)`);
                if ((parts = dtstring.match(regex)) && parts.length > 1) {
                    let year = parts[3],
                        month = parts[1],
                        day = parts[2],
                        rest = parts[4];
                    // assume year is first
                    if (parts[1].length == 4) {
                        year = parts[1];
                        month = parts[2];
                        day = parts[3];
                    }
                    // assume month is first
                    if (parseInt(month) >= 1 && parseInt(month) <= 12) {
                        dt = new Date(`${month}/${day}/${year}${rest}`);
                    } else { // day is first
                        const tmp = day;
                        day = month;
                        month = tmp;
                        dt = new Date(`${month}/${day}/${year}${rest}`);
                    }
                    // assume the year was first and 2 digits
                    if (!dt.getDate()) {
                        year = parts[1];
                        month = parts[2];
                        day = parts[3];
                        // month was is first
                        dt = new Date(`${month}/${day}/${year}${rest}`);
                        // day was is first
                        if (!dt.getDate()) {
                            const tmp = day;
                            day = month;
                            month = tmp;
                            dt = new Date(`${month}/${day}/${year}${rest}`)
                        }
                    }
                }
                if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})(.*)/)) && parts.length > 1) {
                    dt = new Date(`${parts[2]}/${parts[1]}/${parts[3]}${parts[4]}`);
                } else if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})-([a-zA-Z]{3,9})-(\d{2,4})(.*)/)) && parts.length > 1) {
                    dt = new Date(dtstring.replace("-", " "));
                }
            }
        }
        if (options.gmt) {
            /* istanbul ignore next */
            let offset = isNull(options.offset, getGMTOffset(!dt.getDate() ? new Date() : dt));
            dt = new Date(dt.valueOf() - offset * 60 * 60000);
        }
        return options.format ? format(dt, options.format) : dt;
    } catch (e) /* istanbul ignore next */ {
        error && error("String.toDateTime", e);
    }
}