var pre = "@craydent/";
delete global.$c;
delete global.__craydentNoConflict;
delete global.navigator;

try { require.cache[require.resolve('../../../common.js')] && delete require.cache[require.resolve('../../../common.js')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-array')] && delete require.cache[require.resolve(pre + 'craydent-array')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class')] && delete require.cache[require.resolve(pre + 'craydent-class')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli')] && delete require.cache[require.resolve(pre + 'craydent-cli')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow')] && delete require.cache[require.resolve(pre + 'craydent-control-flow')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date')] && delete require.cache[require.resolve(pre + 'craydent-date')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs')] && delete require.cache[require.resolve(pre + 'craydent-fs')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function')] && delete require.cache[require.resolve(pre + 'craydent-function')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http')] && delete require.cache[require.resolve(pre + 'craydent-http')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser')] && delete require.cache[require.resolve(pre + 'craydent-json-parser')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number')] && delete require.cache[require.resolve(pre + 'craydent-number')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object')] && delete require.cache[require.resolve(pre + 'craydent-object')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp')] && delete require.cache[require.resolve(pre + 'craydent-regexp')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string')] && delete require.cache[require.resolve(pre + 'craydent-string')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template')] && delete require.cache[require.resolve(pre + 'craydent-template')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof')] && delete require.cache[require.resolve(pre + 'craydent-typeof')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility')] && delete require.cache[require.resolve(pre + 'craydent-utility')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json')]; }catch(e){}

try { require.cache[require.resolve(pre + 'craydent-array/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-array/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-class/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-class/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-cli/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-cli/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-control-flow/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-date/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-date/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-fs/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-fs/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-function/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-function/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-http/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-http/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-json-parser/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-number/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-number/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-object/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-object/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-regexp/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-regexp/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-string/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-string/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-template/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-template/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-typeof/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-typeof/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-utility/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-utility/noConflict')]; }catch(e){}
try { require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')] && delete require.cache[require.resolve(pre + 'craydent-xml-to-json/noConflict')]; }catch(e){}


try { require.cache[require.resolve('../../../noConflict.js')] && delete require.cache[require.resolve('../../../noConflict.js')]; }catch(e){}
try { require.cache[require.resolve('../../../global.js')] && delete require.cache[require.resolve('../../../global.js')]; }catch(e){}
try { require.cache[require.resolve('../../../craydent.js')] && delete require.cache[require.resolve('../../../craydent.js')]; }catch(e){}
var $c = require(pre + 'craydent-http');
$c.DEBUG_MODE = true;
// TODO: Global http methods
describe ('Global http methods', function () {
    // TODO $COOKIE
    it('$COOKIE',function(){

    });
    // TODO $DELETE
    it('$DELETE',function(){

    });
    // TODO $GET
    it('$GET',function(){

    });
    // TODO $HEADER
    it('$HEADER',function(){

    });
    // TODO $PAYLOAD
    it('$PAYLOAD',function(){

    });
    // TODO $POST
    it('$POST',function(){

    });
    // TODO $PUT
    it('$PUT',function(){

    });
    // TODO echo
    it('echo',function(){

    });
    // TODO end
    it('end',function(){

    });
    // TODO send
    it('send',function(){

    });
    // TODO getSessionID
    it('getSessionID',function(){

    });
    // TODO getSession
    it('getSession',function(){

    });
    // TODO getSessionSync
    it('getSessionSync',function(){

    });
    // TODO header
    it('header',function(){

    });
    // TODO var_dump
    it('var_dump',function(){

    });
    // TODO writeSession
    it('writeSession',function(){

    });

    // TODO ChromVersion
    it('ChromVersion',function(){

    });
    // TODO FireFoxVersion
    it('FireFoxVersion',function(){

    });
    // TODO IEVersion
    it('IEVersion',function(){

    });
    // TODO OperaVersion
    it('OperaVersion',function(){

    });
    // TODO SafariVersion
    it('SafariVersion',function(){

    });
    // TODO isAmaya
    it('isAmaya',function(){

    });
    // TODO isAndroid
    it('isAndroid',function(){

    });
    // TODO isBlackBerry
    it('isBlackBerry',function(){

    });
    // TODO isChrome
    it('isChrome',function(){

    });
    // TODO isFirefox
    it('isFirefox',function(){

    });
    // TODO isGecko
    it('isGecko',function(){

    });
    // TODO isIE6
    it('isIE6',function(){

    });
    // TODO isIE
    it('isIE',function(){

    });
    // TODO isIPad
    it('isIPad',function(){

    });
    // TODO isIPhone
    it('isIPhone',function(){

    });
    // TODO isIPod
    it('isIPod',function(){

    });
    // TODO isKHTML
    it('isKHTML',function(){

    });
    // TODO isLinux
    it('isLinux',function(){

    });
    // TODO isMac
    it('isMac',function(){

    });
    // TODO isMobile
    it('isMobile',function(){

    });
    // TODO isOpera
    it('isOpera',function(){

    });
    // TODO isPalmOS
    it('isPalmOS',function(){

    });
    // TODO isPresto
    it('isPresto',function(){

    });
    // TODO isPrince
    it('isPrince',function(){

    });
    // TODO isSafari
    it('isSafari',function(){

    });
    // TODO isSymbian
    it('isSymbian',function(){

    });
    // TODO isTrident
    it('isTrident',function(){

    });
    // TODO isWebkit
    it('isWebkit',function(){

    });
    // TODO isWindows
    it('isWindows',function(){

    });
    // TODO isWindowsMobile
    it('isWindowsMobile',function(){

    });

});