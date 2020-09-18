import error from '../methods/error';
import isArray from '../methods/isArray';

export default function capitalize(str: string, pos?: number | number[], everyWord?: boolean): string {
    /*|{
        "info": "String class extension to capitalize parts of the string",
        "category": "String",
        "parameters":[
            {"pos": "(Int|Int[]) Index of the string to capitalize"},
            {"everyWord": "(Bool) Flag to capital every word"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
        "returnType": "(String)"
    }|*/
    try {
        pos = pos || [0];
        !isArray(pos) && (pos = [pos] as number[]);
        let wordArray = everyWord ? str.split(' ') : ([str]);
        for (let i = 0; i < (pos as number[]).length; i++) {
            for (let j = 0; j < wordArray.length; j++) {
                wordArray[j] = wordArray[j].substring(0, pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
            }
        }
        return wordArray.join(' ');
    } catch (e) /* istanbul ignore next */ {
        error && error("String.capitalize", e);
        return "";
    }
}