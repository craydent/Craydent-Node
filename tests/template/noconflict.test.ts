import $c from '../../compiled/transformedMajor/template/noConflict';

describe('No Conflict Global methods', function () {
    $c.TEMPLATE_VARS.push({ variable: "TNAME", value: "this template var" });
    (global as any).tempFunc = function (o: any) { return o.a + " & " + o.b; }
    it('fillTemplate - nested props', function () {
        expect($c.fillTemplate("<div>${this.a.hello}${index}<div>", { a: { hello: "world" } })).toBe("<div>world0<div>");
    });
    it('fillTemplate - template var', function () {
        expect($c.fillTemplate("<div>${TNAME}<div>")).toBe("<div>this template var<div>");
    });
    it('fillTemplate - dataproperties', function () {
        expect($c.fillTemplate("<div ${dataproperties}>${hello}<div>", { hello: "world" })).toBe("<div data-hello='world' >world<div>");
    });
    it('fillTemplate - foreach', function () {
        expect($c.fillTemplate("<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>", [{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }]))
            .toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
        expect($c.fillTemplate('${foreach ${item} in ${this.DATA.page}}${if (${true})}<div>${item.name}</div>${end if}${end foreach}',
            { DATA: { page: [{ name: 'name1' }, { name: 'name2' }] } })).toBe('<div>name1</div><div>name2</div>');
        expect($c.fillTemplate('${foreach ${item} in ${this.TASK.subtasks}}\
			${if (${item.sub_complete})}\
				True\
			${else}\
				False\
			${end if}\
		${end foreach}', { TASK: { subtasks: [{ sub_complete: true }] } }).trim()).toBe('True');

        // let fs = require('fs');
        // let template = fs.readFileSync(`${process.cwd()}/test/submodules/template.ct`, 'utf8');
        $c.TEMPLATE_TAG_CONFIG.IGNORE_CHARS = []
        expect($c.fillTemplate('${foreach ${item} in ${this.TASK.subtasks}}\n${if (${item.sub_complete})}\nTrue\n${else}\nFalse\n${end if}\n${end foreach}', { TASK: { subtasks: [{ sub_complete: true }, { sub_complete: false }] } }).trim())
            .toBe('True\n\n\n\nFalse');
        expect($c.fillTemplate(`\${foreach \${item} in \${this.TASK.subtasks}}
\${if (\${item.sub_complete})}
True
\${else}
False
\${end if}
\${end foreach}`, { TASK: { subtasks: [{ sub_complete: true }, { sub_complete: false }] } }).trim())
            .toBe('True\n\n\n\nFalse');
        $c.TEMPLATE_TAG_CONFIG.IGNORE_CHARS = ['\n', '\r']
    });
    it('fillTemplate - methods', function () {
        expect($c.fillTemplate("<div>${COUNT[${arr}]}<div>", [{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }])).toBe("<div>2<div><div>2<div>");
        expect($c.fillTemplate("<div>${ENUM[${arr};]}<div>", { arr: ['monday', 'tuesday'] })).toBe("<div>monday, tuesday<div>");
        expect($c.fillTemplate("<div>${ENUM[${this};\"?\";[\"{ENUM_VAL}-\",\"-{ENUM_VAR}\"]]}<div>", { a: 'monday', b: 'tuesday' })).toBe("<div>monday-a-a?tuesday-b-b<div>");
        expect($c.fillTemplate("<div>${RUN[tempFunc;${this}]}<div>", { a: 'monday', b: 'tuesday' })).toBe("<div>monday & tuesday<div>");
        expect($c.fillTemplate("<div>${function add (a,b) { return a+b; }|1|2}<div>", { hello: "world" })).toBe("<div>3<div>");
    });
    it('fillTemplate - logical or/and', function () {
        expect($c.fillTemplate("<div>${${novar}||${hello}}<div>", { hello: "world" })).toBe("<div>world<div>");
        expect($c.fillTemplate("<div>${${hello}||${novar}}<div>", { hello: "world" })).toBe("<div>world<div>");
        expect($c.fillTemplate("<div>${${novar}&&${hello}}<div>", { hello: "world" })).toBe("<div><div>");
        expect($c.fillTemplate("<div>${${hello}&&'hello'}<div>", { hello: "world" })).toBe("<div>hello<div>");
    });
    it('fillTemplate - if/else', function () {
        expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>", { a: 'monday', b: 'tuesday' })).toBe("<div><a>monday</a></div>");
        expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>", { hi: "hello" })).toBe("<div><span>hello</span></div>");
        expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>", { bye: "bbye" })).toBe("<div><p>bbye</p></div>");
        expect($c.fillTemplate("<div>${if (${this.bye.value})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>", { hi: "hello", bye: { value: "bbye" } })).toBe("<div><span>hello</span></div>");
        expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>", { bye: { value: "bbye" } })).toBe("<div><p>bbye</p></div>");
        expect($c.fillTemplate("<div>${if (${this.bye.value})}<span>${this.bye.value}</span>${elseif (${bye})}<p>${bye}</p>${end if}</div>", { bye: { value: "bbye" } })).toBe("<div><span>bbye</span></div>");
        expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>", { bye: { value: "bbye" } })).toBe("<div><p>bbye</p></div>");
        expect($c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending", { User: [''] })).toBe("divheredivending");
        expect($c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending", { User: [] })).toBe("divheredivending");
        expect($c.fillTemplate("divhere${if (${this.User})}div${end if}ending", { User: [] })).toBe("divheredivending");
        expect($c.fillTemplate("divhere${if (${this.User.length})}div${end if}ending", { User: [] })).toBe("divhereending");
        expect($c.fillTemplate("divhere${if ('${this.User}')}div${end if}ending", { User: "adsf" })).toBe("divheredivending");
        expect($c.fillTemplate("div ${if (!${test.tags.Level} || ${test.tags.Level.length} != 0 && '${test.type}')}${test.type}${end if} ending",
            { test: { type: "testtype", tags: { Level: ["adsf"] } } })).toBe("div testtype ending");
    });
    it('fillTemplate - for', function () {
        expect($c.fillTemplate("<div>${name}<div>${for ${i=0,len=${arr}.length};${i<len};${i++}}${${arr}[i].hi}8888${name}9999${end for}</div></div>", [{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }]))
            .toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
    });
    it('fillTemplate - while', function () {
        expect($c.fillTemplate("<div>${name}<div>${declare i=0,len=${arr}.length}${while (${i}<${len})}${${arr}[i].hi}8888${name}9999${i++,null}${end while}</div></div>", [{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }]))
            .toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
    });
    it('fillTemplate - script/try', function () {
        let errorMessage: any = '';
        try { var a: any = null; a.foo } catch (e) {
            errorMessage = new Error(e.toString());
        }
        expect($c.fillTemplate("<div>${script}var a = 0;a += 20;echo('${a} number is: ');echo(a);echo(10);${end script}<div>", { a: 'monday', b: 'tuesday' })).toBe("<div>monday number is: 2010<div>");
        expect($c.fillTemplate("<div>${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try}<div>", { a: 'monday', b: 'tuesday' })).toBe(`<div>asdf${errorMessage}finallyy<div>`);
    });
    it('fillTemplate - switch', function () {
        expect($c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>", { a: 'monday', b: 'tuesday' })).toBe("<div><div>tuesday</div></div>");
        expect($c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>", { a: 'monday', b: 'tuesday', hello: 'world' })).toBe("<div><span>monday</span><p>tuesday</p></div>");
        expect($c.fillTemplate("<div>" +
            "${switch (${hello})}" +
            "${case 'world':}<span>${a}</span>" +
            "${case 'bite':}<p>${b}</p>" +
            "${break}" +
            "${case 'me':}<a>${a}</a>" +
            "${default}<div>${b}</div>" +
            "${end switch}</div>", { a: 'monday', b: 'tuesday', hello: 'bite' })).toBe("<div><p>tuesday</p></div>");
    });
});