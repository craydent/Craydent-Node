import * as IEquals from '../methods/equals';
import * as IFormat from '../methods/format';
import * as IGetDayOfYear from '../methods/getDayOfYear';
import * as IGetGMTOffset from '../methods/getGMTOffset';
import * as IGetValue from '../methods/getValue';
import * as IGetWeek from '../methods/getWeek';
import * as IIsValidDate from '../methods/isValidDate';
import * as INow from '../methods/now';

import { scope } from '../private/__common';
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
    return format(this, formatStr, options);
}

export function _getDayOfYear(this: Date): number {
    return getDayOfYear(this);
}

export function _getGMTOffset(this: Date): number {
    return getGMTOffset(this);
}

export function _getValue(this: Date, args?: any[], dflt?: any): any {
    return getValue(this as any, args, dflt);
}

export function _getWeek(this: Date): number {
    return getWeek(this)
}
export function _isValidDate(this: Date): boolean {
    return isValidDate(this);
}

export { now };