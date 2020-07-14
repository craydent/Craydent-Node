declare var $c: any;

export default function __logModule(name) {
    $c.MODULES_LOADED[name] = $c.VERSION;
}