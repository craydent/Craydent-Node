import _even from '../protected/_even';

export default function isEven(num: number): boolean {
    /*|{
        "info": "Number class extension to check if number is even",
        "category": "Number",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#number.isEven",
        "returnType": "(Bool)"
    }|*/
    return _even(num);
}