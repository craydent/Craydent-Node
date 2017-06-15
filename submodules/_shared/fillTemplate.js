
var $c = $c || {};

function clearCache (module) {
    /*|{
        "info": "Clear a module from the require cache.",
        "category": "Global",
        "parameters":[
            {"module": "(String) Single module to remove."}],

        "overloads":[
            {"parameters":[]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#clearCache",
        "returnType": "(Boolean)"
    }|*/
    try {
        if (module) {
            delete require.cache[require.resolve(module)];
            return true;
        }
        for (var prop in require.cache) {
            if (!require.cache.hasOwnProperty(prop)) {
                continue;
            }
            delete require.cache[prop];
        }
        return true;
    } catch (e) {
        error('clearCache', e);
        return false;
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.clearCache = clearCache;
}
init.clearCache = clearCache;
module.exports = init;
