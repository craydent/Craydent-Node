import ServerManager from "../../modules/methods/ServerManager";
import { $c } from '../../modules/private/__common';
//#region imports
import echo from '../../modules/methods/echo';
import end from '../../modules/methods/end';
import getSessionID from '../../modules/methods/getSessionID';
import getSession from '../../modules/methods/getSession';
import getSessionSync from '../../modules/methods/getSessionSync';
import header from '../../modules/methods/header';
import send from '../../modules/methods/send';
import writeSession from '../../modules/methods/writeSession';
import _getSession from '../../modules/protected/_getSession';
import varDump from '../../modules/methods/varDump';
import $COOKIE from '../../modules/methods/$COOKIE';
import $DELETE from '../../modules/methods/$DELETE';
import $GET from '../../modules/methods/$GET';
import $HEADER from '../../modules/methods/$HEADER';
import $PAYLOAD from '../../modules/methods/$PAYLOAD';
import $POST from '../../modules/methods/$POST';
import $PUT from '../../modules/methods/$PUT';
//#endregion
describe('ServerManager', () => {
    it('should create server manager instance', () => {
        const req = {
            headers: {
                host: 'www.example.com',
                cookie: '',
                method: 'get',
                'user-agent': '',
                platform: '',
                referer: '',
                origin: '',
                pragma: '',
                'accept-encoding': '',
                'accept-language': '',
                'x-forwarded-for': ''
            },
            url: '/path',
            connection: {
                encrypted: true,
                remoteAddress: ''
            }
        };
        const res = {};
        const sm = new ServerManager(req as any, res as any);
        expect(sm.sessionid).toBe(null);
        expect(sm.session).toBe(null);
        expect(sm.request).toBe(req);
        expect(sm.response).toBe(res);
        expect(sm.$l).toEqual({
            hash: '',
            host: 'www.example.com',
            hostname: 'www.example.com',
            href: 'https://www.example.com/path',
            method: 'get',
            origin: 'https://www.example.com',
            pathname: '/path',
            port: 443,
            protocol: 'https',
            search: ''
        });
        expect(sm.location).toBe(sm.$l);
        expect(sm.navigator).toEqual({ userAgent: '', platform: '' });

        expect(sm.getSessionID).toBe(getSessionID);
        expect(sm.getSession).toBe(getSession);
        expect(sm.getSessionSync).toBe(getSessionSync);
        expect(sm.end).toBe(end);
        expect(sm.writeSession).toBe(writeSession);
        expect(sm.header).toBe(header);
        expect(sm.echo).toBe(echo);
        expect(sm.send).toBe(send);
        expect(sm.varDump).toBe(varDump);

        expect(sm.$COOKIE).toBe($COOKIE);
        expect(sm.$GET).toBe($GET);
        expect(sm.$HEADER).toBe($HEADER);
        expect(sm.$DELETE).toBe($DELETE);
        expect(sm.$PAYLOAD).toBe($PAYLOAD);
        expect(sm.$POST).toBe($POST);
        expect(sm.$PUT).toBe($PUT);

        expect(sm.isIE6).toEqual(expect.any(Function));
        expect(sm.isIE).toEqual(expect.any(Function));
        expect(sm.IEVersion).toEqual(expect.any(Function));
        expect(sm.isChrome).toEqual(expect.any(Function));
        expect(sm.isSafari).toEqual(expect.any(Function));
        expect(sm.isOpera).toEqual(expect.any(Function));
        expect(sm.isFirefox).toEqual(expect.any(Function));

        expect(sm.ChromeVersion).toEqual(expect.any(Function));
        expect(sm.SafariVersion).toEqual(expect.any(Function));
        expect(sm.OperaVersion).toEqual(expect.any(Function));
        expect(sm.FirefoxVersion).toEqual(expect.any(Function));

        expect(sm.isIPhone).toEqual(expect.any(Function));
        expect(sm.isIPod).toEqual(expect.any(Function));
        expect(sm.isIPad).toEqual(expect.any(Function));
        expect(sm.isAndroid).toEqual(expect.any(Function));
        expect(sm.isWindowsMobile).toEqual(expect.any(Function));
        expect(sm.isBlackBerry).toEqual(expect.any(Function));
        expect(sm.isPalmOS).toEqual(expect.any(Function));
        expect(sm.isSymbian).toEqual(expect.any(Function));
        expect(sm.isMobile).toEqual(expect.any(Function));
        expect(sm.isWebkit).toEqual(expect.any(Function));
        expect(sm.isAmaya).toEqual(expect.any(Function));
        expect(sm.isGecko).toEqual(expect.any(Function));
        expect(sm.isKHTML).toEqual(expect.any(Function));
        expect(sm.isPresto).toEqual(expect.any(Function));
        expect(sm.isPrince).toEqual(expect.any(Function));
        expect(sm.isTrident).toEqual(expect.any(Function));
        expect(sm.isWindows).toEqual(expect.any(Function));
        expect(sm.isMac).toEqual(expect.any(Function));
        expect(sm.isLinux).toEqual(expect.any(Function));


        expect(sm.PROTOCOL).toBe('https');
        expect(sm.SERVER).toBe('www.example.com');
        expect(sm.SERVER_PATH).toBe('/path');
        expect(sm.REFERER).toBe('');
        expect(sm.ORIGIN).toBe('');
        expect(sm.PRAGMA).toBe('');
        expect(sm.ACCEPT_ENCODING).toBe('');
        expect(sm.ACCEPT_LANGUAGE).toBe('');
        expect(sm.REFERER_IP).toBe('');
        expect(sm.PUBLIC_IP).toBe($c.PUBLIC_IP);
        expect(sm.LOCAL_IP).toBe($c.LOCAL_IP);
        expect(sm.BROWSER).toEqual({
            CURRENT: 0,
            CURRENT_VERSION: 0,
            IE: false,
            IE_VERSION: -1,
            IE6: false,
            IE7: false,
            IE8: false,
            CHROME: false,
            CHROME_VERSION: -1,
            FIREFOX: false,
            FIREFOX_VERSION: -1,
            OPERA: false,
            OPERA_VERSION: -1,
            SAFARI: false,
            SAFARI_VERSION: -1
        });

        expect(sm.CLIENT).toEqual({
            BROWSER: 0,
            CORES_SUPPORT: true,
            DEVICE: false,
            ENGINE: false,
            OS: false,
        });
        expect(sm.ENGINE).toEqual({
            CURRENT: false,
            AMAYA: false,
            GEKKO: false,
            KHTML: false,
            PRESTO: false,
            PRINCE: false,
            TRIDENT: false,
            WEBKIT: false,
        });
        expect(sm.OS).toEqual({
            CURRENT: false,
            ANDROID: false,
            BLACKBERRY: false,
            LINUX: false,
            IOS: false,
            MAC: false,
            PALM: false,
            SYMBIAN: false,
            WINDOWS: false,
            WINDOWS_MOBILE: false
        });
        expect(sm.DEVICE).toEqual({
            CURRENT: false,
            ANDROID: false,
            BLACKBERRY: false,
            IPAD: false,
            IPHONE: false,
            IPOD: false,
            LINUX: false,
            MAC: false,
            PALM: false,
            SYMBIAN: false,
            WINDOWS: false,
            WINDOWS_MOBILE: false
        });
        expect(sm.ANDROID).toBe(false);
        expect(sm.AMAYA).toBe(false);
        expect(sm.BLACKBERRY).toBe(false);
        expect(sm.CHROME).toBe(false);
        expect(sm.CHROME_VERSION).toBe(-1);
        expect(sm.CORES_SUPPORT).toBe(true);
        expect(sm.DEBUG_MODE).toBe($c.DEBUG_MODE);
        expect(sm.EXPOSE_ROUTE_API).toBe($c.EXPOSE_ROUTE_API);
        expect(sm.FIREFOX).toBe(false);
        expect(sm.FIREFOX_VERSION).toBe(-1);
        expect(sm.GEKKO).toBe(false);
        expect(sm.IE).toBe(false);
        expect(sm.IE_VERSION).toBe(-1);
        expect(sm.IE6).toBe(false);
        expect(sm.IE7).toBe(false);
        expect(sm.IE8).toBe(false);
        expect(sm.IPAD).toBe(false);
        expect(sm.IPHONE).toBe(false);
        expect(sm.IPOD).toBe(false);
        expect(sm.KHTML).toBe(false);
        expect(sm.LINUX).toBe(false);
        expect(sm.MAC).toBe(false);
        expect(sm.OPERA).toBe(false);
        expect(sm.OPERA_VERSION).toBe(-1);
        expect(sm.PAGE_NAME).toBe('index.html');
        expect(sm.PAGE_NAME_RAW).toBe('index.html');
        expect(sm.PALM).toBe(false);
        expect(sm.PRESTO).toBe(false);
        expect(sm.PRINCE).toBe(false);
        expect(sm.PROTOCOL).toBe(sm.$l.protocol);
        expect(sm.RESPONSES).toBe($c.RESPONSES);
        expect(sm.SAFARI).toBe(false);
        expect(sm.SAFARI_VERSION).toBe(-1);
        expect(sm.SYMBIAN).toBe(false);
        expect(sm.TEMPLATE_VARS).toBe($c.TEMPLATE_VARS);
        expect(sm.TEMPLATE_TAG_CONFIG).toBe($c.TEMPLATE_TAG_CONFIG);
        expect(sm.TRIDENT).toBe(false);
        expect(sm.VERBOSE_LOGS).toBe($c.VERBOSE_LOGS);
        expect(sm.VERSION).toBe($c.VERSION);
        expect(sm.WEBKIT).toBe(false);
        expect(sm.WINDOWS).toBe(false);
        expect(sm.WINDOWS_MOBILE).toBe(false);
    });
    it('should create altered server manager instance', () => {
        const req = {
            headers: {
                host: 'www.example.com',
                cookie: 'CRAYDENTHASH=cookie',
                method: 'get',
                'user-agent': '',
                platform: '',
                referer: '',
                origin: '',
                pragma: '',
                'accept-encoding': '',
                'accept-language': '',
                'x-forwarded-for': ''
            },
            url: '/path.html?a=10&b=20',
            connection: {
                encrypted: false,
                remoteAddress: ''
            }
        };
        const res = {};
        const sm = new ServerManager(req as any, res as any);

        expect(sm.$l).toEqual({
            hash: 'cookie',
            host: 'www.example.com',
            hostname: 'www.example.com',
            href: 'http://www.example.com/path.html?a=10&b=20#cookie',
            method: 'get',
            origin: 'http://www.example.com',
            pathname: '/path.html?a=10&b=20',
            port: 80,
            protocol: 'http',
            search: 'a=10&b=20'
        });
        expect(sm.navigator).toEqual({ userAgent: '', platform: '' });


        expect(sm.PROTOCOL).toBe('http');
        expect(sm.SERVER).toBe('www.example.com');
        expect(sm.SERVER_PATH).toBe('/path.html?a=10&b=20');
        expect(sm.PAGE_NAME).toBe('path.html');
        expect(sm.PAGE_NAME_RAW).toBe('path.html');
    });
});