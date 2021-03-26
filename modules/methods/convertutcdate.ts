import error from '../methods/error';

export default function convertUTCDate(dateAsString: string, delimiter?: string): string {
    /*|{
        "info": "String class extension to convert date string to UTC format",
        "category": "String",
        "parameters":[
            {"delimiter?": "(String) Character that delimits the date string. Default is '-'"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.convertUTCDate",
        "returnType": "(String)"
    }|*/
    try {
        delimiter = delimiter || '-';
        if (dateAsString.substring(dateAsString.length - 2) == ".0") {
            dateAsString = dateAsString.substring(0, dateAsString.length - 2);
        }
        let pattern = new RegExp(`(\\d{4})${delimiter}(\\d{2})${delimiter}(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})`);
        let parts = dateAsString.match(pattern);

        return parts ? `${parts[2]}/${parts[3]}/${parts[1]} ${parts[4]}:${parts[5]}:${parts[6]}` : dateAsString;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.convertUTCDate', e);
        return null as any;
    }
}