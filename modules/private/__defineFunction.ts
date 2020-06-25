/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import _generalTrim from '../protected/_generalTrim';
import _getFuncArgs from '../protected/_getFuncArgs';
import error from '../methods/error';
import { scope } from './__common';

export default function __defineFunction(name: string, func: Function, override?: boolean): Function {
    try {
        const args = _getFuncArgs(func),
            fstr = func.toString().replace(/this/g, 'craydent_ctx'),

            // extra code to account for when this == global
            extra_code = "if(arguments.length == 0 && this == $c){return;}",
            fnew = args.length === 0 || (args.length === 1 && !_generalTrim(args[0])) ?
                fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (craydent_ctx){' + extra_code) :
                "(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(craydent_ctx,$1){' + extra_code) + ")";

        //        if (!override && scope.eval("typeof("+name+")") !== "undefined") {
        //            return scope.eval("$c."+name+" = "+fnew);
        //        }
        if ($g && $g.$c && !$g.$c.hasOwnProperty(name)) {
            return scope.eval("$g.$c." + name + " = $c." + name + " = " + fnew);
        }
        return scope.eval("$c." + name + " = " + fnew);
    } catch (ex) {
        error && error("__defineFunction", ex);
        return null;
    }
}