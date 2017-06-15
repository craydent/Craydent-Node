
var $c = $c || {};

function isValidDate (obj) {
    try {
        return !isNaN(obj.getTime());
    } catch (e) {
        $c.error && $c.error && $c.error("Date.isValidDate", e);
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.isValidDate = isValidDate;
}
init.isValidDate = isValidDate;

module.exports = init;
