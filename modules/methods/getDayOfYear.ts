import error from '../methods/error';

export default function getDayOfYear(date: Date): number {
    /*|{
        "info": "Date class extension to retrieve the day of the year",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.getDayOfYear",
        "returnType": "(Int)"
    }|*/
    try {
        return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    } catch (e) /* istanbul ignore next */ {
        error && error("Date.getDayOfYear", e);
        return NaN;
    }
}