import * as $c from '@craydent/craydent-json-parser/noConflict';


// $c.parseAdvanced
{
$c.parseAdvanced({"routes": {"${domain}":"${bb}"}},null,{domain:"property",bb:"baby"}); // $ExpectType object	
$c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"/test/test.json"}}}); // $ExpectType object	
$c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"./test.json"}}}); // $ExpectType object	
$c.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"test.json"}}}); // $ExpectType object
}

// JSON.stringify
{
JSON.stringify($c.parseAdvanced({"routes": {"Function.${bb.b}":"function(${domain}){}","${domain}":"${bb.b}"}},null,{domain:"property",bb:{b:"baby"}})); // $ExpectType string
}

