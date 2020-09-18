import isBetween from '../methods/isBetween';

export default function aboutEqualTo(num: number, compare: number, giveOrTake: number): boolean {
    /*|{
        "info": "Number class extension to check if values are approximately equal",
        "category": "Number",
        "parameters":[
            {"compare": "(Number) Number to compare"},
            {"giveOrTake": "(Number) Plus/minus value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#number.aboutEqualTo",
        "returnType": "(Bool)"
    }|*/
    return isBetween(num, compare - giveOrTake, compare + giveOrTake, true);
}