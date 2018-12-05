/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s._ext,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    $s.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $s.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    require($s.dir + 'fillTemplate')($s);
    $c.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $c.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    ext(String, 'fillTemplate', function (arr_objs, offset, max, newlineToHtml, preserve_nonmatching) {
        /*|{
            "info": "Function for templetizing",
            "category": "Template",
            "featured": true,
            "parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"options": "(FillTemplateOptions) Options to use: max,offset,newlineToHtml,preserve_nonmatching"}],

            "overloads":[
                {"parameters":[
                    {"htmlTemplate": "(String) Template to be used"},
                    {"objs": "(Object[]) Objects to fill the template variables"},
                    {"max": "(Int) The maximum number of records to process"}]},

                {"parameters":[
                    {"htmlTemplate": "(String) Template to be used"},
                    {"objs": "(Object[]) Objects to fill the template variables"},
                    {"offset": "(Int) The start index of the Object array"},
                    {"max": "(Int) The maximum number of records to process"}]},

                {"parameters":[
                    {"htmlTemplate": "(String) Template to be used"},
                    {"objs": "(Object[]) Objects to fill the template variables"},
                    {"offset": "(Int) The start index of the Object array"},
                    {"max": "(Int) The maximum number of records to process"},
                    {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."}]},

                {"parameters":[
                    {"htmlTemplate": "(String) Template to be used"},
                    {"objs": "(Object[]) Objects to fill the template variables"},
                    {"offset": "(Int) The start index of the Object array"},
                    {"max": "(Int) The maximum number of records to process"},
                    {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."},
                    {"preserve_nonmatching":"(Boolean) Flag to used to leave template variables that were not replaced."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
            "returnType": "(String)"
        }|*/
        try {
            return $s.fillTemplate(this, arr_objs, offset, max, newlineToHtml, preserve_nonmatching);
        } catch (e) {
            error('String.fillTemplate', e);
        }
    });

    $c.TEMPLATE_VARS = $s.TEMPLATE_VARS;
    $c.TEMPLATE_TAG_CONFIG = $s.TEMPLATE_TAG_CONFIG;
    module.exports = $c;
}