
var $c = $c || {};

function toSet(obj) {
    try {
        for (var i = 0, len = obj.length; i < len; i++) {
            var item = obj[i];
            for (var j = i + 1; j < len; j++) {
                var citem = obj[j];
                if ($c.equals(item,citem)) {
                    $c.removeAt(obj,j--);
                    len--;
                }
            }
        }
    } catch (e) {
        error("Array.toSet", e);
        return false;
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.toSet = toSet;
}
init.toSet = toSet;
module.exports = init;
