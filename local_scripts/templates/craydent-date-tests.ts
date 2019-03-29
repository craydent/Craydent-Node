import * as $c from '@craydent/craydent-date/noConflict';
var date = new Date('1/8/2016 13:00:00');
var ndate = new Date('adsfaf');

// $c.format
{
$c.format(date,'m/d/Y'); // $ExpectType string	
$c.format(date,'d'); // $ExpectType string	
$c.format(date,'%d'); // $ExpectType string	
$c.format(date,'D'); // $ExpectType string	
$c.format(date,'j'); // $ExpectType string	
$c.format(date,'l'); // $ExpectType string	
$c.format(date,'N'); // $ExpectType string	
$c.format(date,'S'); // $ExpectType string	
$c.format(date,'w'); // $ExpectType string	
$c.format(date,'%w'); // $ExpectType string	
$c.format(date,'z'); // $ExpectType string	
$c.format(date,'%j'); // $ExpectType string	
$c.format(date,'W'); // $ExpectType string	
$c.format(date,'%U'); // $ExpectType string	
$c.format(date,'F'); // $ExpectType string	
$c.format(date,'m'); // $ExpectType string	
$c.format(date,'%m'); // $ExpectType string	
$c.format(date,'M'); // $ExpectType string	
$c.format(date,'%M'); // $ExpectType string	
$c.format(date,'n'); // $ExpectType string	
$c.format(date,'t'); // $ExpectType string	
$c.format(date,'L'); // $ExpectType string	
$c.format(date,'o'); // $ExpectType string	
$c.format(date,'Y'); // $ExpectType string	
$c.format(date,'%Y'); // $ExpectType string	
$c.format(date,'y'); // $ExpectType string	
$c.format(date,'a'); // $ExpectType string	
$c.format(date,'A'); // $ExpectType string	
$c.format(date,'B'); // $ExpectType string	
$c.format(date,'g'); // $ExpectType string	
$c.format(date,'G'); // $ExpectType string	
$c.format(date,'h'); // $ExpectType string	
$c.format(date,'H'); // $ExpectType string	
$c.format(date,'i'); // $ExpectType string	
$c.format(date,'s'); // $ExpectType string	
$c.format(date,'u'); // $ExpectType string	
$c.format(date,'%L'); // $ExpectType string	
$c.format(date,'e'); // $ExpectType string	
$c.format(date,'I'); // $ExpectType string	
$c.format(date,'O'); // $ExpectType string	
$c.format(date,'P'); // $ExpectType string	
$c.format(date,'T'); // $ExpectType string	
$c.format(date,'Z'); // $ExpectType string	
$c.format(date,'c'); // $ExpectType string	
$c.format(date,'r'); // $ExpectType string	
$c.format(date,'U'); // $ExpectType string	
$c.format(date,'yymmdd'); // $ExpectType string
}

// $c.getDayOfYear
{
$c.getDayOfYear(new Date('1/1/2016')); // $ExpectType number	
$c.getDayOfYear(new Date('3/1/2016')); // $ExpectType number
}

// $c.getWeek
{
$c.getWeek(new Date('1/1/2016')); // $ExpectType number	
$c.getWeek(new Date('1/8/2016')); // $ExpectType number	
$c.getWeek(new Date('2/1/2016')); // $ExpectType number	
$c.getWeek(new Date('2/7/2016')); // $ExpectType number	
$c.getWeek(new Date('12/31/2016')); // $ExpectType number
}

// $c.isValidDate
{
$c.isValidDate(ndate); // $ExpectType boolean	
$c.isValidDate(new Date()); // $ExpectType boolean
}

