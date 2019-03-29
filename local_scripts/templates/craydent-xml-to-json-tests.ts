import * as $c from '@craydent/craydent-xml-to-json/noConflict';
var fs = require('fs');
var data = fs.readFileSync('./test/test.xml');

// $c.xmlToJson
{
$c.xmlToJson(data.toString()); // $ExpectType object
}

