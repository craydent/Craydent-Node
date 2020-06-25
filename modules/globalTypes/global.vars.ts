///<reference path="./global.base.ts" />
declare module NodeJS {
    interface Global {
        $g: Global
        $c: Craydent
        __craydentNoConflict: boolean
        navigator: any
    }
}
interface Window {
    $g: Window
    $c: Craydent
    __craydentNoConflict: boolean
}

declare var $g: Window | NodeJS.Global;
declare var $c: Craydent;