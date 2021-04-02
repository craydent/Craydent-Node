import error from '../methods/error';
import cout from '../methods/cout';
import { $c } from '../private/__common';

const _reset: string = "\x1b[0m";

const STYLES: { [key: string]: string } = {
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m"
}
const COLORS: { [key: string]: string } = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m"
}
function logit(this: any, ...args: any[]): void {
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Utility",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#logit",
        "returnType": "(void)"
    }|*/
    try {
        let path = "", err = new Error();

        $c.VERBOSE_LOGS && err.stack && (path = `\t\t\t\t    ${err.stack.split('\n')[2]}`);
        // for (let i = 0, len = args.length; i < len; i++) { args.push(args[i]); }
        if ($c.VERBOSE_LOGS && path) { args.push(path); }
        cout.apply(this, args);
    } catch (e) /* istanbul ignore next */ {
        error && error('logit', e);
    }
}

logit.black = (...args: any[]): void => logit.apply(undefined, [COLORS.black].concat(args, _reset));
logit.red = (...args: any[]): void => logit.apply(undefined, [COLORS.red].concat(args, _reset));
logit.green = (...args: any[]): void => logit.apply(undefined, [COLORS.green].concat(args, _reset));
logit.yellow = (...args: any[]): void => logit.apply(undefined, [COLORS.yellow].concat(args, _reset));
logit.blue = (...args: any[]): void => logit.apply(undefined, [COLORS.blue].concat(args, _reset));
logit.magenta = (...args: any[]): void => logit.apply(undefined, [COLORS.magenta].concat(args, _reset));
logit.cyan = (...args: any[]): void => logit.apply(undefined, [COLORS.cyan].concat(args, _reset));
logit.white = (...args: any[]): void => logit.apply(undefined, [COLORS.white].concat(args, _reset));

logit.bgBlack = (...args: any[]): void => logit.apply(undefined, [COLORS.bgblack].concat(args, _reset));
logit.bgRed = (...args: any[]): void => logit.apply(undefined, [COLORS.bgred].concat(args, _reset));
logit.bgGreen = (...args: any[]): void => logit.apply(undefined, [COLORS.bggreen].concat(args, _reset));
logit.bgYellow = (...args: any[]): void => logit.apply(undefined, [COLORS.bgyellow].concat(args, _reset));
logit.bgBlue = (...args: any[]): void => logit.apply(undefined, [COLORS.bgblue].concat(args, _reset));
logit.bgMagenta = (...args: any[]): void => logit.apply(undefined, [COLORS.bgmagenta].concat(args, _reset));
logit.bgCyan = (...args: any[]): void => logit.apply(undefined, [COLORS.bgcyan].concat(args, _reset));
logit.bgWhite = (...args: any[]): void => logit.apply(undefined, [COLORS.bgwhite].concat(args, _reset));

type Color = {
    fgColor?: "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white",
    bgColor?: "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white",
    style?: "bright" | "dim" | "underscore" | "blink" | "reverse" | "hidden"
};
logit.custom = (value: Color, ...args: any[]): void => {
    let colors = [], fgColor = "", bgColor = "", style = "";
    if (value.fgColor && COLORS[fgColor = value.fgColor.toLowerCase()]) {
        colors.push(COLORS[fgColor]);
    }
    if (value.bgColor && COLORS[bgColor = `bg${value.bgColor.toLowerCase()}`]) {
        colors.push(COLORS[bgColor]);
    }
    if (value.style && STYLES[style = value.style.toLowerCase()]) {
        colors.push(STYLES[style]);
    }
    logit.apply(undefined, colors.concat(args, _reset));
}
declare namespace logit {
    //     // @ts-ignore
    //     export { _black as black };
    //     // @ts-ignore
    //     export { _red as red };
    //     // @ts-ignore
    //     export { _green as green };
    //     // @ts-ignore
    //     export { _yellow as yellow };
    //     // @ts-ignore
    //     export { _blue as blue };
    //     // @ts-ignore
    //     export { _magenta as magenta };
    //     // @ts-ignore
    //     export { _cyan as cyan };
    //     // @ts-ignore
    //     export { _white as white };

    //     // @ts-ignore
    //     export { _bgBlack as bgBlack };
    //     // @ts-ignore
    //     export { _bgRed as bgRed };
    //     // @ts-ignore
    //     export { _bgGreen as bgGreen };
    //     // @ts-ignore
    //     export { _bgYellow as bgYellow };
    //     // @ts-ignore
    //     export { _bgBlue as bgBlue };
    //     // @ts-ignore
    //     export { _bgMagenta as bgMagenta };
    //     // @ts-ignore
    //     export { _bgCyan as bgCyan };
    //     // @ts-ignore
    //     export { _bgWhite as bgWhite };

    // @ts-ignore
    export { black, red, green, yellow, blue, magenta, cyan, white, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, custom };
}
export default logit;