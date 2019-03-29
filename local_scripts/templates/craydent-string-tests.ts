import * as $c from '@craydent/craydent-string/noConflict';
var c = $c.cuid();

// $c.capitalize
{
$c.capitalize("word of the day"); // $ExpectType string	
$c.capitalize("word of the day",1); // $ExpectType string	
$c.capitalize("word of the day",0,true); // $ExpectType string	
$c.capitalize("word of the day",1,true); // $ExpectType string
}

// $c.convertUTCDate
{
$c.convertUTCDate("2016/12/13 10:01:33", "/"); // $ExpectType string	
$c.convertUTCDate("2016.12.13 10:01:33", "."); // $ExpectType string	
$c.convertUTCDate("2016-12-13 10:01:33", "-"); // $ExpectType string
}

// $c.count
{
$c.count("calaiedc8a","a"); // $ExpectType number	
$c.count("calaiedc8a","c"); // $ExpectType number	
$c.count("calaiedc8a","-"); // $ExpectType number
}

// $c.cut
{
$c.cut("cala",1,2); // $ExpectType string	
$c.cut("cala", 1,2,"p"); // $ExpectType string
}

// $c.ellipsis
{
$c.ellipsis("calasdfadfasdfasdfadf",1); // $ExpectType string	
$c.ellipsis("calasdfadfasdfasdfadf", 1,2); // $ExpectType string
}

// $c.endsWithAny
{
$c.endsWithAny("calasdfadfasdfasdfadf",'a','p','f'); // $ExpectType string	
$c.endsWithAny("calasdfadfasdfasdfadf",['a','p','f']); // $ExpectType string	
$c.endsWithAny("calasdfadfasdfasdfadf",'a'); // $ExpectType boolean	
$c.endsWithAny("calasdfadfasdfasdfadf",['a']); // $ExpectType boolean	
$c.endsWithAny("build","build","pull","npm"); // $ExpectType string	
$c.endsWithAny("pull","build","pull","npm"); // $ExpectType string
}

// $c.highlight
{
$c.highlight("cal",'a'); // $ExpectType string	
$c.highlight("cal",/a/); // $ExpectType string	
$c.highlight("cal",'a','chl'); // $ExpectType string	
$c.highlight("cal",/a/,'chl'); // $ExpectType string	
$c.highlight("cal",'a',null,'div'); // $ExpectType string	
$c.highlight("cal",/a/,null,'div'); // $ExpectType string	
$c.highlight("cal",'a',"chl",'div'); // $ExpectType string	
$c.highlight("cal",/a/,"chl",'div'); // $ExpectType string
}

// $c.indexOfAlt
{
$c.indexOfAlt("cal",/a/); // $ExpectType number	
$c.indexOfAlt("cala",/a/,2); // $ExpectType number
}

// $c.ireplace_all
{
$c.ireplace_all("calA",'a',''); // $ExpectType string
}

// $c.isCuid
{
$c.isCuid(c); // $ExpectType boolean
}

// $c.isBlank
{
$c.isBlank("cal"); // $ExpectType boolean	
$c.isBlank(""); // $ExpectType boolean
}

// $c.isValidEmail
{
$c.isValidEmail("cal"); // $ExpectType boolean	
$c.isValidEmail("cal@craydent.com"); // $ExpectType boolean
}

// $c.lastIndexOfAlt
{
$c.lastIndexOfAlt("caal",/a/); // $ExpectType number	
$c.lastIndexOfAlt("caal",/a/,0); // $ExpectType number
}

// $c.ltrim
{
$c.ltrim("     cal "); // $ExpectType string	
$c.ltrim("     aacalaaa",'a'); // $ExpectType string	
$c.ltrim("aacalaaa",'a'); // $ExpectType string
}

// $c.pluralize
{
$c.pluralize("life"); // $ExpectType string	
$c.pluralize("history"); // $ExpectType string	
$c.pluralize("deer"); // $ExpectType string
}

// $c.replace_all
{
$c.replace_all("calA",'a',''); // $ExpectType string	
$c.replace_all("calaaa",'a',''); // $ExpectType string	
$c.replace_all("calaaa",'a','b'); // $ExpectType string	
$c.replace_all("calaaa",['c','a'],['d','b']); // $ExpectType string	
$c.replace_all("calaaa",['c','a'],['b']); // $ExpectType string
}

// $c.reverse
{
$c.reverse("cal"); // $ExpectType string
}

// $c.rtrim
{
$c.rtrim(" cal  "); // $ExpectType string	
$c.rtrim("     aacalaaa",'a'); // $ExpectType string	
$c.rtrim("aacalaaa",'a'); // $ExpectType string	
$c.rtrim(" cal  "); // $ExpectType string	
$c.rtrim("     aacalaaa",'a'); // $ExpectType string	
$c.rtrim("aacalaaa",'a'); // $ExpectType string
}

// $c.singularize
{
$c.singularize("lives"); // $ExpectType string	
$c.singularize("histories"); // $ExpectType string	
$c.singularize("deer"); // $ExpectType string
}

// $c.startsWithAny
{
$c.startsWithAny("calasdfadfasdfasdfadf",'a','c','f'); // $ExpectType string	
$c.startsWithAny("calasdfadfasdfasdfadf",['a','c','f']); // $ExpectType string	
$c.startsWithAny("calasdfadfasdfasdfadf",'a'); // $ExpectType boolean	
$c.startsWithAny("calasdfadfasdfasdfadf",['a']); // $ExpectType boolean	
$c.startsWithAny("build","build","pull","npm"); // $ExpectType string	
$c.startsWithAny("pull","build","pull","npm"); // $ExpectType string
}

// $c.strip
{
$c.strip("aaaaaaaaaaaacalaaaaaaaaaa",'a'); // $ExpectType string	
$c.strip("aaaaaaaaaaaacalaaaaaaaaaab",'a'); // $ExpectType string	
$c.strip("aaaaaaaaaaaacalaaaaaaaaaa",['a','l']); // $ExpectType string
}

// $c.toCurrencyNotation
{
$c.toCurrencyNotation("1000"); // $ExpectType string	
$c.toCurrencyNotation("1000000"); // $ExpectType string	
$c.toCurrencyNotation("1000",'.'); // $ExpectType string
}

// $c.toDateTime
{
$c.toDateTime("30-12-2012"); // $ExpectType object	
$c.toDateTime("30.12.2012"); // $ExpectType object	
$c.toDateTime("2012-12-30"); // $ExpectType object	
$c.toDateTime("2012.12.30"); // $ExpectType object	
$c.toDateTime("2012.12.30",{format:'m/d/Y'}); // $ExpectType string	
$c.toDateTime("2012.12.30",{format:'d/m/Y'}); // $ExpectType string	
$c.toDateTime("1000",'.'); // $ExpectType string
}

// JSON.stringify
{
JSON.stringify($c.toObject("p1=1&p2=2&p3=3")); // $ExpectType string	
JSON.stringify($c.toObject("p1=1")); // $ExpectType string	
JSON.stringify($c.toObject("p1=&p2")); // $ExpectType string
}

// "    cal    ".trim
{
"    cal    ".trim(); // $ExpectType string
}

// "    cal".trim
{
"    cal".trim(); // $ExpectType string
}

// "cal   ".trim
{
"cal   ".trim(); // $ExpectType string
}

