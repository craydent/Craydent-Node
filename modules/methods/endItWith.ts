import error from './error';

export default function endItWith(str: string, ending: string): string {
    /*|{
     "info": "String class extension to guarantee the original string ends with the passed string",
     "category": "String",
     "parameters":[
         {"ending": "(String) String to end with"}],

     "overloads":[],

     "url": "http://www.craydent.com/library/1.9.3/docs#string.endItWith",
     "returnType": "(String)"
 }|*/
    try {
        if (str.slice(-(ending.length)) == ending) { return str; }
        return str + ending;
    } catch (e) {
        error('String.endItWith', e);
    }
}