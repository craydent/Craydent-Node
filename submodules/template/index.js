/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s._ext;

if ($c.MODULES_LOADED[$s.info.name]) { return; }
$s.__log_module();
$s.scope.eval = function (str) { return eval(str); };

require($s.dir + 'fillTemplate')($s);

ext(String, 'fillTemplate', function (arr_objs, offset, max, bound) {
    /*|{
        "info": "String class extension to fill template based on template syntax",
        "category": "String|Template",
        "featured": true,
        "parameters":[
            {"objs": "(Objects[]) Objects to fill the template variables"}],

        "overloads":[
            {"parameters":[
                {"objs": "(Objects[]) Objects to fill the template variables"},
                {"offset": "(Int) The start index of the Object array"},
                {"max": "(Int) The maximum number of records to process"}]},

            {"parameters":[
                {"objs": "(Objects[]) Objects to fill the template variables"},
                {"max": "(Int) The maximum number of records to process"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.fillTemplate",
        "returnType": "(String)"
    }|*/
    try {
        return $s.fillTemplate(this, arr_objs, offset, max, bound);
    } catch (e) {
        error('String.fillTemplate', e);
    }
});

$c.TEMPLATE_VARS = $s.TEMPLATE_VARS;
$c.TEMPLATE_TAG_CONFIG = $s.TEMPLATE_TAG_CONFIG;
module.exports = $c;