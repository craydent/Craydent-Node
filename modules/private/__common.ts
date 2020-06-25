/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
// import error from '../methods/error';
import globalize from '../methods/globalize';
import __isNewer from '../private/__isNewer';
global.$g = global;

var info = require('../package.json'),
    _craydent_version = info.version,
    scope = { eval },
    $c = $g.$c;

($g as any).navigator = ($g as any).navigator || {};

if (!$g.$c || __isNewer($g.$c.VERSION.split('.'), _craydent_version.split('.'))) {
    $g.$c = $c = $g.$c || {} as Craydent;

    $c.VERSION = _craydent_version;
    $c.MODULES_LOADED && delete $c.MODULES_LOADED[info.name];

    $c.DEBUG_MODE = $c.DEBUG_MODE || false;
    $c.MODULES_LOADED = $c.MODULES_LOADED || {};
    $c.CONSOLE_COLORS = $c.CONSOLE_COLORS || {
        RED: '\x1b[31m%s\x1b[0m',
        GREEN: '\x1b[32m%s\x1b[0m',
        YELLOW: '\x1b[33m%s\x1b[0m'
    };
    $c.globalize = globalize;

    try {
        // retrieve public and local IP Addresses
        var nics = require('os').networkInterfaces();
        for (var nic in nics) {
            if (!nics.hasOwnProperty(nic)) {
                continue;
            }
            // filter for address that is IPv4
            var iface = nics[nic].filter(function (ic) {
                return ic.family == 'IPv4';
            })[0];
            if (iface) {
                if (nic.startsWith('lo')) {
                    $c.LOCAL_IP = iface.address;
                } else if (nic.startsWith('eth') || nic.startsWith('en')) {
                    $c.PUBLIC_IP = iface.address
                }
            }
            // break if local and public ips are found
            if ($c.LOCAL_IP && $c.PUBLIC_IP) {
                break
            }
        }
    } catch (e) { }
}

export { _craydent_version, $c, scope, info/*, error*/ }
