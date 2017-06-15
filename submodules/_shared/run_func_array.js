
var $c = $c || {};

function on (obj, ev, func){
    try {
        obj["_"+ev] = obj["_"+ev] || [];
        obj["_"+ev].push(func);
    } catch (e) {
        $c.error && $c.error("Function.on", e);
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.on = on;
}
init.on = on;
module.exports = init;
