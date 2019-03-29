import * as $c from '@craydent/craydent-class/noConflict';


interface AbcObject {
    a: number;
    b: string;
    c: boolean;
}
let abc: AbcObject = {a:1, b:"", c:true};
let acursor = new $c.Cursor([abc,abc]);
let ocursor = new $c.Cursor(abc);
let olist = new $c.OrderedList([abc,abc], function(a,b){
    if (a.a < b.a) { return -1; }
    if (a.a > b.a) {return 1;}
    return 0;
});
let queue = new $c.Queue([abc,abc]);
let set = new $c.Set([abc,abc]);


// $c.Cursor
{
    // array
    acursor.current; // $ExpectType number
    acursor.size(); // $ExpectType number
    acursor.hasNext(); // $ExpectType boolean
    acursor.setNextIndex(0); // $ExpectType void
    acursor.reset(); // $ExpectType void
    acursor.next(); // $ExpectType AbcObject

    // object
    ocursor.current; // $ExpectType number
    ocursor.size(); // $ExpectType number
    ocursor.hasNext(); // $ExpectType boolean
    ocursor.setNextIndex(0); // $ExpectType void
    ocursor.reset(); // $ExpectType void
    ocursor.next(); // $ExpectType AbcObject
}

// $c.OrderedList
{
    // array
    olist.hasNext(); // $ExpectType boolean
    olist.next(); // $ExpectType AbcObject
    olist.add(abc); // $ExpectType AbcObject[]
    olist.size(); // $ExpectType number
}

// $c.Queue
{
    queue.hasNext(); // $ExpectType boolean
    queue.enqueue(abc); // $ExpectType void
    queue.dequeue(); // $ExpectType AbcObject
    queue.size(); // $ExpectType number
}

// $c.Set
{

    set.hasNext(); // $ExpectType boolean
    set.add(abc); // $ExpectType boolean
    set.clean(); // $ExpectType void
    set.next(); // $ExpectType AbcObject
    set.clear(); // $ExpectType void
    set.size(); // $ExpectType number
}