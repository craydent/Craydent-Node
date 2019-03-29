import * as $c from '@craydent/craydent-number/noConflict';


// $c.aboutEqualTo
{
$c.aboutEqualTo(10,9,1); // $ExpectType boolean	
$c.aboutEqualTo(10,9,1.1); // $ExpectType boolean	
$c.aboutEqualTo(10,9,0.9); // $ExpectType boolean	
$c.aboutEqualTo(8,9,1); // $ExpectType boolean	
$c.aboutEqualTo(8,9,1.1); // $ExpectType boolean	
$c.aboutEqualTo(8,9,0.9); // $ExpectType boolean	
$c.aboutEqualTo(7,9,1.1); // $ExpectType boolean
}

// $c.isOdd
{
$c.isOdd(10); // $ExpectType boolean	
$c.isOdd(9); // $ExpectType boolean
}

// $c.isEven
{
$c.isEven(10); // $ExpectType boolean	
$c.isEven(9); // $ExpectType boolean
}

// $c.toCurrencyNotation
{
$c.toCurrencyNotation(1000); // $ExpectType string	
$c.toCurrencyNotation(1000000); // $ExpectType string	
$c.toCurrencyNotation(1000,'.'); // $ExpectType string
}

