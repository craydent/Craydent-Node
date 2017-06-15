
var $c = $c || {};

function getKeys (obj) {
    try {
        if(Object.keys(foo)) {
            return  Object.keys(obj);
        }
        var arr = [];
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    } catch (e) {
        $c.error && $c.error('Object.getKeys', e);
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.getKeys = getKeys;
}
init.getKeys = getKeys;
module.exports = init;
