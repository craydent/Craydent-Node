import * as $c from '@craydent/craydent-template/noConflict';
var obj = [{arr:[{hi:"b"},{hi:"c"}],name:"operation"},{arr:[{hi:"b"},{hi:"c"}],name:"operation"}],
        obj2 = {arr:['monday','tuesday']},
        obj3 = {a:'monday',b:'tuesday'},
        obj4 = {a:'monday',b:'tuesday',hello:'world'},
        obj5 = {a:'monday',b:'tuesday',hello:'bite'},
        simple = {hello:"world"},
        simple2 = {a:{hello:"world"}};
var a = 0;
var a = null;

// $c.fillTemplate
{
$c.fillTemplate("<div>${this.a.hello}${index}<div>",simple2); // $ExpectType string	
$c.fillTemplate("<div>${TNAME}<div>"); // $ExpectType string	
$c.fillTemplate("<div ${dataproperties}>${hello}<div>",simple); // $ExpectType string	
$c.fillTemplate(template, {TASK:{subtasks:[{sub_complete:true},{sub_complete:false}]}}; // $ExpectType string	
$c.fillTemplate("<div>${COUNT[${arr}]}<div>",obj); // $ExpectType string	
$c.fillTemplate("<div>${${novar}||${hello}}<div>",simple); // $ExpectType string	
$c.fillTemplate("<div>${${hello}||${novar}}<div>",simple); // $ExpectType string	
$c.fillTemplate("<div>${${novar}&&${hello}}<div>",simple); // $ExpectType string	
$c.fillTemplate("<div>${${hello}&&'hello'}<div>",simple); // $ExpectType string	
$c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",obj3); // $ExpectType string	
$c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{hi:"hello"}); // $ExpectType string	
$c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{bye:"bbye"}); // $ExpectType string	
$c.fillTemplate("<div>${if (${this.bye.value})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{hi:"hello",bye:{value:"bbye"}}); // $ExpectType string	
$c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>",{bye:{value:"bbye"}}); // $ExpectType string	
$c.fillTemplate("<div>${if (${this.bye.value})}<span>${this.bye.value}</span>${elseif (${bye})}<p>${bye}</p>${end if}</div>",{bye:{value:"bbye"}}); // $ExpectType string	
$c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>",{bye:{value:"bbye"}}); // $ExpectType string	
$c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending",{User:['']}); // $ExpectType string	
$c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending",{User:[]}); // $ExpectType string	
$c.fillTemplate("divhere${if (${this.User})}div${end if}ending",{User:[]}); // $ExpectType string	
$c.fillTemplate("divhere${if (${this.User.length})}div${end if}ending",{User:[]}); // $ExpectType string	
$c.fillTemplate("divhere${if ('${this.User}')}div${end if}ending",{User:"adsf"}); // $ExpectType string
}

// $c.fillTemplate
			${if (${item.sub_complete})}\
				True\
			${else}\
				False\
			${end if}\
		${end foreach}',{TASK:{subtasks:[{sub_complete:true}]}}
{
$c.fillTemplate('${foreach ${item} in ${this.TASK.subtasks}}\
			${if (${item.sub_complete})}\
				True\
			${else}\
				False\
			${end if}\
		${end foreach}',{TASK:{subtasks:[{sub_complete:true}]}}; // $ExpectType string
}

// $c.fillTemplate
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj3)
{
$c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj3); // $ExpectType string
}

// $c.fillTemplate
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj4)
{
$c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj4); // $ExpectType string
}

// $c.fillTemplate
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj5)
{
$c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>",obj5); // $ExpectType string
}

