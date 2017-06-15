
var $c = $c || {};

function removeAt (obj, index) {
    try {
        if(obj[index] === undefined) { return false; }
        return obj.splice(index, 1)[0];
    } catch (e) {
        $c.error && $c.error("Array.removeAt", e);
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.removeAt = removeAt;
}
init.removeAt = removeAt;
module.exports = init;
