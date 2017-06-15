
var $c = $c || {},
    relativePathFinder = require('./relativePathFinder').relativePathFinder,
    startsWithAny = require('./startsWithAny').startsWithAny;

function include(path, refresh){
    /*|{
        "info": "Require without erroring when module does not exist.",
        "category": "Global",
        "parameters":[
            {"path": "(String) Module or Path to module."}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Module or Path to module."},
                {"refresh": "(Boolean) Flag to clear cache for the specific include."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#include",
        "returnType": "(Mixed)"
    }|*/
    try {
        if (refresh) { clearCache(path); }
        if ( startsWithAny(path, ['/','.'])) {
            return require(relativePathFinder(path));
        }
        return require(path);
    } catch (e) {
        try {
            return require(relativePathFinder(path));
        } catch (err) {
            return false;
        }
    }
}

function init (ctx) {
    $c = $c || ctx;
    ctx.include = include;
}
init.include = include;
module.exports = init;
