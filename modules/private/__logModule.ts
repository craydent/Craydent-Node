declare var $c: any;

export default function __logModule(name: string) {
    $c.MODULES_LOADED[name] = $c.VERSION;
}