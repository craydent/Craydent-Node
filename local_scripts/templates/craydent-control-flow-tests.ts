import * as $c from '@craydent/craydent-control-flow/noConflict';

// $c.syncroit
{
    $c.syncroit(function *():any { return; }); // $ExpectType Promise<any>
    $c.syncroit(async function () { return; }); // $ExpectType Promise<any>
}
// $c.yieldable
{
    $c.yieldable(function ():any { return; }); // $ExpectType Promise<any>
    $c.yieldable(new Promise(function (res, req) { return res(); })); // $ExpectType Promise<any>
    $c.yieldable(function *():any { return; }); // $ExpectType Promise<any>
    $c.yieldable(async function () { return; }); // $ExpectType Promise<any>
}
// $c.parallelEach
{
    $c.parallelEach([async function () { return; }]); // $ExpectType Promise<any[]>
}