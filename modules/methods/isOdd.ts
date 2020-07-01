import _even from '../protected/_even';

export default function isOdd(num: number): boolean {
    /*|{
            "info": "Number class extension to check if number is odd",
            "category": "Number",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#number.isOdd",
            "returnType": "(Bool)"
        }|*/
    return !_even(num);
}