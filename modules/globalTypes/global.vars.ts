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
    $w: Window
    $c: Craydent
    $d: Document
    __craydentNoConflict: boolean
}

declare var $g: Window | NodeJS.Global;
declare var $w: Window;
declare var $c: Craydent;