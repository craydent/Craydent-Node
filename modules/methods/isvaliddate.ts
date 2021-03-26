import error from '../methods/error';

export default function isValidDate(date: Date): boolean {
    /*|{
        "info": "Date class extension to check if the date is valid",
        "category": "Date",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.isValidDate",
        "returnType": "(Bool)"
    }|*/
    try {
        return !isNaN(date.getTime());
    } catch (e) /* istanbul ignore next */ {
        error && error("Date.isValidDate", e);
        return null as any;
    }
}