import fillTemplate, {
    __add_fillTemplate_ref,
    __and,
    __count,
    __enum,
    __logic_parser,
    __or,
    __processBlocks,
    __run_replace,
    __mapIgnoreChars,
    __processTemplateVars,
    __processThisProps,
    __processThisAndIndex,
    __processLogicals,
    __processDeclarations,
    __processVariables,
    __processLeftoverRunners
} from '../../compiled/transformedMinor/craydent.filltemplate';
import { $c } from '../../compiled/transformedMinor/craydent.filltemplate/private/__common';
const uid = 'c6U5b9TqA1';
let genSuid = () => {
    return uid;
};
jest.mock('../../compiled/transformedMinor/craydent.suid', () => {
    return {
        "default": () => {
            return genSuid();
        }
    }
});


declare var $g: any;
describe('fillTemplate', function () {
    beforeEach(() => {
        genSuid = () => {
            return uid;
        };
    });
    describe('main', () => {
        $g.tempFunc = function (o) { return `${o.a} & ${o.b}`; }
        let tv = [...$c.TEMPLATE_VARS];
        beforeAll(() => {
            $c.TEMPLATE_VARS.push({ variable: "TNAME", value: "this template var" });
        });
        afterAll(() => {
            $c.TEMPLATE_VARS = tv;
        });
        it('should process template props', function () {
            const template = "<div>${hello}<div>";
            const values = { hello: "world" };
            const expected = "<div>world<div>";
            expect(fillTemplate(template, values)).toBe(expected);
            expect(fillTemplate(template, '{ "hello": "world" }' as any)).toBe(expected);
        });
        it('should process blank Array', function () {
            const template = "${var}template";
            const values = [];
            expect(fillTemplate(template, values)).toBe("template");
            expect(fillTemplate(template, values, { preserveNonMatching: true })).toBe("${var}template");
        });
        it('should process blank templates', function () {
            const template = "   ";
            const values = { a: { hello: "world" } };
            expect(fillTemplate(template, values, 5)).toBe("");
        });
        it('should process invalid args', function () {
            expect(fillTemplate('${abc}', '' as any)).toBe('');
            expect(fillTemplate({} as any, '' as any)).toBe('');
        });
        it('should process nested props', function () {
            const template = "<div>${this.a.hello}${index}<div>";
            const values = { a: { hello: "world" } };
            const expected = "<div>world0<div>";
            expect(fillTemplate(template, values)).toBe(expected);
        });
        it('should process template var', function () {
            const template = "<div>${TNAME}<div>";
            const expected = "<div>this template var<div>";
            expect(fillTemplate(template)).toBe(expected);
        });
        it('should process dataproperties', function () {
            const template = "<div ${dataproperties}>${hello}<div>";
            const values = { hello: "world" };
            const expected = "<div data-hello='world' >world<div>";
            expect(fillTemplate(template, values)).toBe(expected);
        });
        it.each`
    method                  | template                                                                  | values                            | expected
    ${'COUNT'}              | ${"<div>${COUNT[${arr}]}<div>"}                                           | ${[{
                arr: [
                    { hi: "b" },
                    { hi: "c" }
                ],
                name: "operation"
            },
            {
                arr: [
                    { hi: "b" },
                    { hi: "c" }
                ],
                name: "operation"
            }]}                                                                                                                             | ${"<div>2<div><div>2<div>"}
    ${'ENUM'}               | ${"<div>${ENUM[${arr};]}<div>"}                                           | ${{ arr: ['monday', 'tuesday'] }} | ${"<div>monday, tuesday<div>"}
    ${'ENUM:ENUM_VAL'}      | ${"<div>${ENUM[${this};\"?\";[\"{ENUM_VAL}-\",\"-{ENUM_VAR}\"]]}<div>"}   | ${{ a: 'monday', b: 'tuesday' }}  | ${"<div>monday-a-a?tuesday-b-b<div>"}
    ${'RUN'}                | ${"<div>${RUN[tempFunc;${this}]}<div>"}                                   | ${{ a: 'monday', b: 'tuesday' }}  | ${"<div>monday & tuesday<div>"}
    ${'inline function'}    | ${"<div>${function add (a,b) { return a+b; }|${a}|${b}}<div>"}                  | ${{ hello: "world", a: 1, b: 2 }} | ${"<div>3<div>"}
    `('should process method $method', ({ template, values, expected }) => {
                expect(fillTemplate(template, values)).toBe(expected);
            });
        it.each`
    method  | template                                                      | values                | expected
    ${'or'} | ${"<div>${${novar}||${hello}}<div>"}                          | ${{ hello: "world" }} | ${"<div>world<div>"}
    ${'or'} | ${"<div>${${novar}||${hello}}${${novar2}||${hello}}<div>"}    | ${{ hello: "world" }} | ${"<div>worldworld<div>"}
    ${'or'} | ${"<div>${${hello}||${novar}}<div>"}                          | ${{ hello: "world" }} | ${"<div>world<div>"}
    ${'and'} | ${"<div>${${novar}&&${hello}}<div>"}                         | ${{ hello: "world" }} | ${"<div><div>"}
    ${'and'} | ${"<div>${${hello}&&'hello'}<div>"}                          | ${{ hello: "world" }} | ${"<div>hello<div>"}
    ${'and'} | ${"<div>${${hello}&&'hello'}${${hello}&&'hello2'}<div>"}     | ${{ hello: "world" }} | ${"<div>hellohello2<div>"}
    `('should process logical $method $template', function ({ template, values, expected }) {
            expect(fillTemplate(template, values)).toBe(expected);
        });
        describe('logical syntax', () => {
            const ifelseifTemplate = "<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>";
            const ifelseifWithContextTemplate = "<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>";
            const ifTemplate = "divhere${if (${this.User.length} || ${this.User})}div${end if}ending";
            const emptyUserValues = { User: [] };
            const byeValues = { bye: { value: "bbye" } };
            it.each`
        index   | template                                                                                                              | values                                                        | expected
        ${1}    | ${ifelseifTemplate}                                                                                                   | ${{ a: 'monday', b: 'tuesday' }}                              | ${"<div><a>monday</a></div>"}
        ${2}    | ${ifelseifTemplate}                                                                                                   | ${{ hi: "hello" }}                                            | ${"<div><span>hello</span></div>"}
        ${3}    | ${ifelseifTemplate}                                                                                                   | ${{ bye: "bbye" }}                                            | ${"<div><p>bbye</p></div>"}
        ${4}    | ${"<div>${if (${this.bye.value})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>"} | ${{ hi: "hello", bye: { value: "bbye" } }}                    | ${"<div><span>hello</span></div>"}
        ${5}    | ${"<div>${if (${this.bye.value})}<span>${this.bye.value}</span>${elseif (${bye})}<p>${bye}</p>${end if}</div>"}       | ${byeValues}                                                  | ${"<div><span>bbye</span></div>"}
        ${6}    | ${ifelseifWithContextTemplate}                                                                                        | ${byeValues}                                                  | ${"<div><p>bbye</p></div>"}
        ${7}    | ${ifelseifWithContextTemplate}                                                                                        | ${byeValues}                                                  | ${"<div><p>bbye</p></div>"}
        ${8}    | ${ifTemplate}                                                                                                         | ${{ User: [''] }}                                             | ${"divheredivending"}
        ${9}    | ${ifTemplate}                                                                                                         | ${emptyUserValues}                                            | ${"divheredivending"}
        ${10}   | ${"divhere${if (${this.User})}div${end if}ending"}                                                                    | ${emptyUserValues}                                            | ${"divheredivending"}
        ${11}   | ${"divhere${if (${this.User.length})}div${end if}ending"}                                                             | ${emptyUserValues}                                            | ${"divhereending"}
        ${12}   | ${"divhere${if ('${this.User}')}div${end if}ending"}                                                                  | ${{ User: "adsf" }}                                           | ${"divheredivending"}
        ${13}   | ${"div ${if (!${test.tags.Level} || ${test.tags.Level.length} != 0 && '${test.type}')}${test.type}${end if} ending"}  | ${{ test: { type: "testtype", tags: { Level: ["adsf"] } } }}  | ${"div testtype ending"}
        `('should process if/else $index', function ({ template, values, expected }) {
                expect(fillTemplate(template, values)).toBe(expected);
            });

            const foreachTests = [
                {
                    template: "<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>",
                    values: [{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }],
                    expected: "<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>"
                },
                {
                    template: "${foreach ${item} in ${this.DATA.page}}${if (${true})}<div>${item.name}</div>${end if}${end foreach}",
                    values: { DATA: { page: [{ name: 'name1' }, { name: 'name2' }] } },
                    expected: "<div>name1</div><div>name2</div>"
                },
                {
                    template: `\${foreach \${item} in \${this.TASK.subtasks}}
                    \${if (\${item.sub_complete})}
                        True
                    \${else}
                        False
                    \${end if}
                \${end foreach}`,
                    values: { TASK: { subtasks: [{ sub_complete: true }] } },
                    expected: "True"
                },
                {
                    template: "${foreach ${item} in ${this.TASK.subtasks}}\n${if (${item.sub_complete})}\nTrue\n${else}\nFalse\n${end if}\n${end foreach}",
                    values: { TASK: { subtasks: [{ sub_complete: true }, { sub_complete: false }] } },
                    expected: "TrueFalse"
                }
            ];
            const options = { removeNewLineFromLogicalSyntax: true, removeWhitespaceFromLogicalSyntax: true };
            it.each`
        index   | template                      | values                     | options      | expected
        ${1}    | ${foreachTests[0].template}   | ${foreachTests[0].values}  | ${{}}        | ${foreachTests[0].expected}
        ${2}    | ${foreachTests[1].template}   | ${foreachTests[1].values}  | ${{}}        | ${foreachTests[1].expected}
        ${3}    | ${foreachTests[2].template}   | ${foreachTests[2].values}  | ${options}   | ${foreachTests[2].expected}
        ${4}    | ${foreachTests[3].template}   | ${foreachTests[3].values}  | ${options}   | ${foreachTests[3].expected}
        `('should process foreach $index', ({ template, values, options, expected }) => {
                let i = 0, uids = ['GVXzQ5eb8Y', 'H8ymTivWJS', 'AH2CLLmoMl', 'RXDiKxX6cq', 'ooNrVIUebI', 'RX2BPvpuCO'];
                genSuid = () => {
                    return uids[i++];
                };
                expect(fillTemplate(template, values, options)).toBe(expected);
            });

            it.each`
        token           | template                                                                                                                                      | values                                                                                                                | expected
        ${"for"}        | ${"<div>${name}<div>${for ${i=0,len=${arr}.length};${i<len};${i++}}${${arr}[i].hi}8888${name}9999${end for}</div></div>"}                     | ${[{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }]}   | ${"<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>"}
        ${"for nested"} | ${"${for ${i=0,len=${arr}.length};${i<len};${i++}}${for ${j=0,jlen=${arr}.length};${j<jlen};${j++}}${i}${j}${end for}${end for}"}             | ${[{ arr: [{ hi: 'ab' }, { hi: 'ab' }] }]}                                                                            | ${"00011011"}
        ${"while"}      | ${"<div>${name}<div>${declare i=0,len=${arr}.length}${while (${i}<${len})}${${arr}[i].hi}8888${name}9999${i++,null}${end while}</div></div>"} | ${[{ arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }, { arr: [{ hi: "b" }, { hi: "c" }], name: "operation" }]}   | ${"<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>"}
        ${"script"}     | ${"<div>${script}var a = 0;a += 20;echo('${a} number is: ');echo(a);echo(10);${end script}<div>"}                                             | ${{ a: 'monday', b: 'tuesday' }}                                                                                      | ${"<div>monday number is: 2010<div>"}
        ${"try"}        | ${"<div>${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try}<div>"}                                | ${{ a: 'monday', b: 'tuesday' }}                                                                                      | ${"<div>asdfError: TypeError: Cannot read property 'foo' of nullfinallyy<div>"}
        `('should process $token', function ({ template, values, expected }) {
                let i = 0, uids = ['GVXzQ5eb8Y', 'H8ymTivWJS', 'AH2CLLmoMl', 'RXDiKxX6cq', 'ooNrVIUebI'];
                genSuid = () => {
                    return uids[i++];
                };
                expect(fillTemplate(template, values)).toBe(expected);
            });
            it('should process switch', function () {
                expect(fillTemplate("<div>" +
                    "${switch (${hello})}" +
                    "${case 'world':}<span>${a}</span>" +
                    "${case 'bite':}<p>${b}</p>" +
                    "${break}" +
                    "${case 'me':}<a>${a}</a>" +
                    "${default}<div>${b}</div>" +
                    "${end switch}</div>", { a: 'monday', b: 'tuesday' })).toBe("<div><div>tuesday</div></div>");
                expect(fillTemplate("<div>" +
                    "${switch (${hello})}" +
                    "${case 'world':}<span>${a}</span>" +
                    "${case 'bite':}<p>${b}</p>" +
                    "${break}" +
                    "${case 'me':}<a>${a}</a>" +
                    "${default}<div>${b}</div>" +
                    "${end switch}</div>", { a: 'monday', b: 'tuesday', hello: 'world' })).toBe("<div><span>monday</span><p>tuesday</p></div>");
                expect(fillTemplate("<div>" +
                    "${switch (${hello})}" +
                    "${case 'world':}<span>${a}</span>" +
                    "${case 'bite':}<p>${b}</p>" +
                    "${break}" +
                    "${case 'me':}<a>${a}</a>" +
                    "${default}<div>${b}</div>" +
                    "${end switch}</div>", { a: 'monday', b: 'tuesday', hello: 'bite' })).toBe("<div><p>tuesday</p></div>");
            });
        })
    });
    describe('__add_fillTemplate_ref', () => {
        afterEach(() => {
            delete (fillTemplate as any).refs;
        });
        it('should set refs', () => {
            const data = {};
            let ft = { refs: [] as any };
            expect(__add_fillTemplate_ref.call(ft, data)).toBe(uid);
            expect(ft.refs.ref_0).toBe(uid);
            expect(ft.refs[uid]).toBe(data);
            expect(ft.refs[0]).toBe(data);
        });
    });
    describe('__and', () => {
        it('should do the logical AND comparison', () => {
            expect(__and()).toBe(undefined);
            expect(__and(1)).toBe(1);
            expect(__and(1, 2)).toBe(2);
            expect(__and(1, 2, 3)).toBe(3);
        });
        it('should do the logical AND comparison and return "" when falsey', () => {
            expect(__and(false, 1, 2)).toBe("");
            expect(__and(1, 0, 2)).toBe("");
            expect(__and(1, 2, "")).toBe("");
            expect(__and(null)).toBe("");
            expect(__and(undefined)).toBe("");
        });
    });
    describe('__count', () => {
        it('should return the length', () => {
            expect(__count([1, 2, 3])).toBe(3);
        });
    });
    describe('__enum', () => {
        it('should process enum when given an array of properties', () => {
            expect(__enum(['p1', 'p2'])).toBe('p1, p2');
        });
        it('should process enum when given an object', () => {
            expect(__enum({ 'p1': 1, 'p2': 1 })).toBe('p1, p2');

        });
        it('should process enum when given an array of properties with ENUM_VAR and ENUM_VAL', () => {
            expect(__enum({ 'p1': 1, 'p2': 1 }, '?', ['{ENUM_VAR}-{ENUM_VAL}', '{ENUM_VAL}-{ENUM_VAR}'])).toBe('p1-1p11-p1?p2-1p21-p2');
            expect(__enum(['p1', 'p2'], '?', ['{ENUM_VAR}-{ENUM_VAL}', '{ENUM_VAL}-{ENUM_VAR}'])).toBe('p1-p1-p1?p2-p2-p2');
        });
        it('should return "" when invalid', () => {
            expect(__enum("" as any)).toBe('');
        });
    });
    describe('__logic_parser', () => {
        let ttc = $c.TEMPLATE_TAG_CONFIG;
        beforeEach(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        afterAll(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        it('should return "" when code is blank', () => {
            expect(__logic_parser('')).toBe('');
        });
        it('should should process template using the logic parser and call the associated parser', () => {
            const begin = /craydent/;
            const obj = {};
            const parser = jest.fn().mockImplementation((code, obj, bind, options) => {
                return code.replace(begin, '');
            });
            $c.TEMPLATE_TAG_CONFIG = {
                FOR: {},
                FOREACH: { begin, parser },
                WHILE: { begin: /nomatching/ }
            } as any;
            expect(__logic_parser('my simple craydentcode goes here', obj, '')).toBe('my simple code goes here');
            expect(parser).toHaveBeenCalledWith('craydentcode goes here', obj, '', undefined);
            expect(__logic_parser('my simple craydentcode goes here', obj, '', { removeNewLineFromLogicalSyntax: false })).toBe('my simple code goes here');
            expect(parser).toHaveBeenCalledWith('craydentcode goes here', obj, '', { removeNewLineFromLogicalSyntax: false });
        });
    });
    describe('__or', () => {
        it('should do the logical OR comparison', () => {
            expect(__or()).toBe("");
            expect(__or(1)).toBe(1);
            expect(__or(1, 2)).toBe(1);
            expect(__or(1, 2, 3)).toBe(1);
            expect(__or(0, false, 3)).toBe(3);
        });
        it('should do the logical OR comparison and return "" when falsey', () => {
            expect(__or(false, 0, "")).toBe("");
            expect(__or(null)).toBe("");
            expect(__or(undefined)).toBe("");
        });
    });
    describe('__processBlocks', () => {
        const start = /\{craydent\}/;
        const end = /\{endcraydent\}/;
        it('should process blocks when balanced', () => {
            const code = 'my code snippet {craydent} is here {endcraydent}';
            const lookup = {};
            const expected = [{ id: `##${uid}##`, block: "{craydent} is here {endcraydent}", body: " is here ", code: `my code snippet ##${uid}##` }];
            expect(__processBlocks(start, end, code, {})).toEqual(expected);
            __processBlocks(start, end, code, {}, lookup);
            expect(lookup[`##${uid}##`]).toBe('{craydent} is here {endcraydent}');
        });
        it('should process blocks when unbalanced', () => {
            const code = 'my code snippet {craydent} is here';
            const expected = [{ id: `##${uid}##`, block: "", body: "", code }];
            expect(__processBlocks(start, end, code, {})).toEqual(expected);
        });
        it('should process multiple blocks', () => {
            const code = 'my code snippet {craydent} is here {endcraydent} and is {craydent} there {endcraydent}';
            const expected = [
                { id: `##${uid}##`, block: "{craydent} there {endcraydent}", body: ' there ', code: `my code snippet ##${uid}## and is ##${uid}##` },
                { id: `##${uid}##`, block: "{craydent} is here {endcraydent}", body: ' is here ', code: `my code snippet ##${uid}## and is {craydent} there {endcraydent}` }
            ];
            expect(__processBlocks(start, end, code, {})).toEqual(expected);
        });
        it('should process blocks when removeNewLineFromLogicalSyntax and removeWhitespaceFromLogicalSyntax are true', () => {
            const code = 'my code snippet {craydent}this.refs[\'newline\']         is here this.refs[\'returnline\']        {endcraydent}';
            const expected = [{ id: `##${uid}##`, block: "{craydent}is here {endcraydent}", body: "is here ", code: `my code snippet ##${uid}##` }];

            expect(__processBlocks(start, end, code, { removeWhitespaceFromLogicalSyntax: true, removeNewLineFromLogicalSyntax: true })).toEqual(expected);
        });
        it('should process blocks when removeNewLineFromLogicalSyntax is true and removeWhitespaceFromLogicalSyntax is false', () => {
            const code = 'my code snippet {craydent}this.refs[\'newline\']         is here this.refs[\'returnline\']        {endcraydent}';
            const expected = [{ id: `##${uid}##`, block: "{craydent}         is here         {endcraydent}", body: "         is here         ", code: `my code snippet ##${uid}##` }];

            expect(__processBlocks(start, end, code, { removeNewLineFromLogicalSyntax: true })).toEqual(expected);
        });
    });
    describe('__run_replace', () => {
        it('should replace the value based on the function return', () => {
            const func = "function(a, b) { return a + b; }";
            expect(__run_replace(/\$\{RUN\[(.+?)\]\}/, `\${RUN[${func};1;2]}`, true, { a: 1, b: 1 })).toBe('3');
            expect(__run_replace(/\$\{(.+?(\|?.+?)+)\}/, `\${${func}|1|2}`, false, { a: 1, b: 1 })).toBe('3');
            expect(__run_replace(/\$\{(.+?(\|?.+?)+)\}/, `\${${func}|1|2}`, false, { a: 1, b: 1 })).toBe('3');
        })
        it('should replace the value based on the global function', () => {
            $g.func = (a, b) => { return a + b; }
            $g.func2 = (a, b) => { return ""; }
            expect(__run_replace(/\$\{RUN\[(.+?)\]\}/, '${RUN[func;1;1]}', true, { a: 1, b: 1 })).toBe('2');
            expect(__run_replace(/\$\{(.+?(\|?.+?)+)\}/, '${func|1|1}', false, { a: 1, b: 1 })).toBe('2');
            expect(__run_replace(/\$\{(.+?(\|?.+?)+)\}/, `\${func2|1|2}`, false, { a: 1, b: 1 })).toBe('');
            delete $g.func;
            delete $g.func2;
        })
    });
    describe('__mapIgnoreChars', () => {
        let ttc = $c.TEMPLATE_TAG_CONFIG;
        beforeEach(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        afterAll(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        it('should replace \\n and \\r with ref objects', () => {
            $c.TEMPLATE_TAG_CONFIG = {
                IGNORE_CHARS: ['\n', '\r', 'ref']
            } as any;
            expect(__mapIgnoreChars()).toEqual(["this.refs['newline']", "this.refs['returnline']", 'ref']);
        });
        it('should replace \\n and \\r with ref objects', () => {
            $c.TEMPLATE_TAG_CONFIG = {
                IGNORE_CHARS: null
            } as any;
            expect(__mapIgnoreChars()).toEqual([]);
        });
    });
    describe('__processTemplateVars', () => {
        let tvars = $c.TEMPLATE_VARS;
        beforeEach(() => {
            $c.TEMPLATE_VARS = [];
        });
        afterAll(() => {
            $c.TEMPLATE_VARS = tvars;
        });
        it('should process TEMPLATE_VARS', () => {
            $c.TEMPLATE_VARS = [{ variable: "TVAR", value: "this template var" }, { name: "TFUNC", value: () => "func" }, { name: "TNAME", value: "" }];
            expect(__processTemplateVars("${TVAR}${TFUNC}${TNAME}")).toBe('this template varfunc');
        })
    });
    describe('__processThisProps', () => {
        it('should process this props', () => {
            expect(__processThisProps.call({ refs: [] }, '${this.value}', { value: 'the value' })).toBe('the value');
            expect(__processThisProps.call({ refs: [] }, '${this.value}', { value: {} })).toBe(`this.refs['${genSuid()}']`);
        });
    });
    describe('__processThisAndIndex', () => {
        it('should process this and index', () => {
            expect(__processThisAndIndex.call({ refs: [] }, '${this}', {}, 0)).toBe(`this.refs['${genSuid()}']`);
            expect(__processThisAndIndex.call({ refs: [] }, '${index}', {}, 0)).toBe('0');
            expect(__processThisAndIndex.call({ refs: [] }, '', {}, 0)).toBe('');
        })
    });
    describe('__processVariables', () => {
        it('should process variables when expression does not exist or when object does not have the property', () => {
            expect(__processVariables.call({ refs: [] }, '${value}', {}, 'value', '${value}', true, true)).toBe('${value}');
            expect(__processVariables.call({ refs: [] }, '${value}', { value: '' }, 'value', 'theval', true, true)).toBe('${value}');
        });
        it('should process variables it exists', () => {
            expect(__processVariables.call({ refs: [] }, '${value}', { value: {} }, 'value', '${value}', true, true)).toBe(`this.refs['${genSuid()}']`);
            expect(__processVariables.call({ refs: [] }, '${value}', { value: 'the value' }, 'value', '${value}', false, false)).toBe('the value');
        })
        it('should process data properties', () => {
            expect(__processVariables.call({ refs: [] }, '${value} ${dataproperties}', { value: '<value />' }, 'value', '${value}', false, true))
                .toBe('<value /> data-value=\'<value />\' ${dataproperties}');
        })
        it('should process inner templates', () => {
            expect(__processVariables.call({ refs: [] }, '${value}', { value: '${price}', price: 10 }, 'value', '${value}', false, false)).toBe('10');
        })
    });
    describe('__processDeclarations', () => {
        let ttc = $c.TEMPLATE_TAG_CONFIG;
        afterEach(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        it('should process declarations', () => {
            $c.TEMPLATE_TAG_CONFIG = {
                DECLARE: {
                    syntax: /\$\{var\}/,
                    parser: jest.fn().mockImplementation((template, declaration) => template)
                }
            };
            expect(__processDeclarations.call({ refs: [] }, '${var}')).toBe('${var}');
            expect($c.TEMPLATE_TAG_CONFIG.DECLARE.parser).toBeCalledWith('${var}', '${var}');
        });
    });
    describe('__processLogicals', () => {
        let ttc = $c.TEMPLATE_TAG_CONFIG;
        afterEach(() => {
            $c.TEMPLATE_TAG_CONFIG = ttc;
        });
        it('should just work', () => {
            //         ${'or'} | ${"<div><div>"}    | ${{ hello: "world" }} | ${"<div>worldworld<div>"}
            // ${'or'} | ${"<div>${${hello}||${novar}}<div>"}                          | ${{ hello: "world" }} | ${"<div>world<div>"}
            // ${'and'} | ${"<div>${${novar}&&${hello}}<div>"}                         | ${{ hello: "world" }} | ${"<div><div>"}
            // ${'and'} | ${"<div>${${hello}&&'hello'}<div>"}                          | ${{ hello: "world" }} | ${"<div>hello<div>"}
            // ${'and'} | ${"<div>${${hello}&&'hello'}${${hello}&&'hello2'}<div>"}     | ${{ hello: "world" }} | ${"<div>hellohello2<div>"}
            expect(fillTemplate("<div>${${hello}||${novar}}<div>", { hello: 'hello' })).toBe('<div>hello<div>');

        })
        it('should process logical ||', () => {
            expect(__processLogicals('${a||b}', {})).toBe('a');
            expect(__processLogicals('${a||b}${a||c}', {})).toBe('aa');
            expect(__processLogicals('${${novar}||b}${a||c}', {})).toBe('ba');
        })
        it('should process logical || when conflicting with custom logicals', () => {
            $c.TEMPLATE_TAG_CONFIG = {
                customtag: {
                    begin: /\$\{(.+?\|\|?.+?)\}/
                },
                OR: $c.TEMPLATE_TAG_CONFIG.OR,
                AND: $c.TEMPLATE_TAG_CONFIG.AND
            }
            expect(__processLogicals('${a||b}', {})).toBe('${a||b}');
        })
        it('should process logical &&', () => {
            expect(__processLogicals('${a&&b}', {})).toBe('b');
            expect(__processLogicals('${a&&b}${a&&c}', {})).toBe('bc');
            expect(__processLogicals('${${novar}&&b}', {})).toBe('');

        })
        it('should process logical && when conflicting with custom logicals', () => {
            $c.TEMPLATE_TAG_CONFIG = {
                customtag: {
                    begin: /\$\{(.+?\&\&?.+?)\}/
                },
                OR: $c.TEMPLATE_TAG_CONFIG.OR,
                AND: $c.TEMPLATE_TAG_CONFIG.AND
            }
            expect(__processLogicals('${a&&b}', {})).toBe('${a&&b}');
        })
    });
    describe('__processLeftoverRunners', () => {
        it('should not process left over variables', () => {
            expect(__processLeftoverRunners.call({}, '${leftover}', {})).toBe('${leftover}');
        })
        it('should not process left overs when there are no variables', () => {
            expect(__processLeftoverRunners.call({}, 'no leftovers', {})).toBe('no leftovers');
        })
        it('should process left over runners', () => {
            expect(__processLeftoverRunners.call({}, '${__and|a|b}', {})).toBe('b');
        })
    });
    describe('Logical parsers config', () => {
        let i = 0, uids = [
            'GVXzQ5eb8Y',
            'H8ymTivWJS',
            'AH2CLLmoMl',
            'RXDiKxX6cq',
            'ooNrVIUebI',
            'RX2BPvpuCO',
            'PaW0dcTWuO',
            'Ydrm26AcUo',
            'eSjUmb0KUc',
            'HBqfXvQ0iS'
        ];
        beforeEach(() => {
            genSuid = () => {
                return uids[i++];
            };
            i = 0;
        });
        describe('FOR', () => {
            it('should process parser', () => {
                const FOR = $c.TEMPLATE_TAG_CONFIG.FOR
                const code = "${for ${i=0,len=this.refs['c6U5b9TqA1'].length};${i<len};${i++}}${this.refs['c6U5b9TqA1'][i].hi}${end for}";
                const template = `begin${code}\${variable}${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginababababend";
                expect(FOR.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const FOR = $c.TEMPLATE_TAG_CONFIG.FOR
                const code = "${for ${i=0,len=this.refs['c6U5b9TqA1'].length};${i<len};${i++}}${for ${j=0,jlen=this.refs['c6U5b9TqA1'].length};${j<jlen};${j++}}${j}${end for}${end for}";
                const template = `begin${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "begin0101end";
                expect(FOR.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process helper', () => {
                const FOR = $c.TEMPLATE_TAG_CONFIG.FOR;
                const code = '${for ${i=0,len=this.refs[\'c6U5b9TqA1\'].length};${i<len};${i++}}${this.refs[\'c6U5b9TqA1\'][i].hi}${end for}';
                const body = '${this.refs[\'c6U5b9TqA1\'][i].hi}';
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = '${"i"=0,"len"=2}${this.refs[\'c6U5b9TqA1\'][i].hi}${"i"=1,"len"=2}${this.refs[\'c6U5b9TqA1\'][i].hi}';
                expect(FOR.helper.call(dis, code, body, {})).toBe(expected);
            });
        });
        describe('FOREACH', () => {
            it('should process parser', () => {
                const FOREACH = $c.TEMPLATE_TAG_CONFIG.FOREACH
                const code = "${foreach ${item} in this.refs['c6U5b9TqA1']}${item.hi}${end foreach}";
                const template = `begin${code}\${variable}${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginabab${variable}ababend";
                expect(FOREACH.parser.call(dis, template, { arr }, '', {})).toBe(expected);

            });
            it('should process parser when nested', () => {
                const FOREACH = $c.TEMPLATE_TAG_CONFIG.FOREACH
                const code = "${foreach ${item} in this.refs['c6U5b9TqA1']}${foreach ${item2} in this.refs['c6U5b9TqA1']}${item.hi}${item2.hi}${end foreach}${end foreach}";
                const template = `begin${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginababababababababend";
                expect(FOREACH.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process parser with complex object', () => {
                const FOREACH = $c.TEMPLATE_TAG_CONFIG.FOREACH
                const code = "${foreach ${item} in this.refs['c6U5b9TqA1']}${item.hi}${end foreach}";
                const template = `begin${code}end`;
                const arr = [{ hi: { hi: 'ab' } }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginthis.refs['RXDiKxX6cq']end";
                expect(FOREACH.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process helper', () => {
                const FOREACH = $c.TEMPLATE_TAG_CONFIG.FOREACH;
                const code = '${foreach ${item} in this.refs[\'c6U5b9TqA1\']}${item.hi}${end foreach}';
                const body = '${item.hi}';
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = '${item=itemGVXzQ5eb8Ys[0],null}${item.hi}${item=itemGVXzQ5eb8Ys[1],null}${item.hi}';
                expect(FOREACH.helper.call(dis, code, body, {}, 'c6U5b9TqA1')).toBe(expected);
            });
            it('should not process helper when value does not exist', () => {
                const FOREACH = $c.TEMPLATE_TAG_CONFIG.FOREACH;
                const code = '${foreach ${item} in ${var}}${item.hi}${end foreach}';
                const body = '${item.hi}';
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [] };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = code;
                expect(FOREACH.helper.call(dis, code, body, {}, 'c6U5b9TqA1')).toBe(expected);
            });
        });
        describe('WHILE', () => {
            it('should process parser', () => {
                const WHILE = $c.TEMPLATE_TAG_CONFIG.WHILE
                const code = "${while (${i}<${len})}${this.refs['c6U5b9TqA1'][i].hi}${i++,null}${end while}";
                const template = `begin${code}\${variable}${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [], declared: { i: 0, len: 2, j: 0, jlen: 2 } };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginababababend";
                expect(WHILE.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const WHILE = $c.TEMPLATE_TAG_CONFIG.WHILE
                const code = "${while (${i}<${len})}${while (${j}<${jlen})}${this.refs['c6U5b9TqA1'][j].hi}${j++,null}${end while}${i++,null}${end while}";
                const template = `begin${code}end`;
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [], declared: { i: 0, len: 2, j: 0, jlen: 2 } };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = "beginababababend";
                expect(WHILE.parser.call(dis, template, { arr }, '', {})).toBe(expected);
            });
            it('should process helper', () => {
                const WHILE = $c.TEMPLATE_TAG_CONFIG.WHILE;
                const code = "${while (${i}<${len})}${this.refs['c6U5b9TqA1'][i].hi}${i++,null}${end while}";
                const body = '${this.refs[\'c6U5b9TqA1\'][i].hi}${i++,null}';
                const arr = [{ hi: 'ab' }, { hi: 'ab' }];
                let dis = { refs: [], declared: { i: 0, len: 2, j: 0, jlen: 2 } };
                dis.refs['c6U5b9TqA1'] = arr;
                const expected = '${i=0,null}${len=2,null}${this.refs[\'c6U5b9TqA1\'][i].hi}${i++,null}${this.refs[\'c6U5b9TqA1\'][i].hi}${i++,null}';
                expect(WHILE.helper.call(dis, code, body)).toBe(expected);
            });
            it('should throw error when helper loop exceeds 100,000', () => {
                const WHILE = $c.TEMPLATE_TAG_CONFIG.WHILE;
                const code = "${while (${i}<${len})}a${i++,null}${end while}";
                const body = 'a${i++,null}';
                let dis = { refs: [], declared: { i: 0, len: 100001 } };
                const expected = 'fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?';
                let error = null;
                try {
                    WHILE.helper.call(dis, code, body);
                } catch (e) {
                    error = e;
                }
                expect(error).toBe(expected);
            });
        });
        describe('IF', () => {
            it('should process parser', () => {
                const IF = $c.TEMPLATE_TAG_CONFIG.IF
                const code = "${if (undefined)}hi${elseif (false)}elif${end if}";
                const template = `begin${code}\${variable}${code}end`;
                let dis = { refs: [] };
                const expected = "begin${variable}end";
                expect(IF.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const IF = $c.TEMPLATE_TAG_CONFIG.IF
                const codeif = "${if (true)}${if (true)}hi${elseif (false)}elif${else}el${end if}${elseif (false)}${if (true)}hi${elseif (false)}elif${else}el${end if}${else}el${end if}";
                let dis = { refs: [] };
                expect(IF.parser.call(dis, `begin${codeif}end`, { hi: true }, '', {})).toBe('beginhiend');
                const codeelif = "${if (false)}${if (false)}hi${elseif (true)}elif${else}el${end if}${elseif (true)}${if (false)}hi${elseif (true)}elif${else}el${end if}${else}el${end if}";
                expect(IF.parser.call(dis, `begin${codeelif}end`, { bye: true }, '', {})).toBe('beginelifend');
                const codeel = "${if (false)}${if (false)}hi${elseif (false)}elif${else}el${end if}${elseif (false)}${if (false)}hi${elseif (false)}elif${else}el${end if}${else}el${end if}";
                expect(IF.parser.call(dis, `begin${codeel}end`, { bye: true }, '', {})).toBe('beginelend');
            });
            it('should process helper', () => {
                const IF = $c.TEMPLATE_TAG_CONFIG.IF;
                const code = "begin${if (true)}hi${elseif (false)}elif${end if}end";
                let dis = { refs: [] };
                const expected = 'beginhiend';
                expect(IF.helper.call(dis, code)).toBe(expected);
            });
            it('should return original code when IF syntax does not exist', () => {
                const IF = $c.TEMPLATE_TAG_CONFIG.IF
                const code = "beginend";
                let dis = { refs: [] };
                const expected = "beginend";
                expect(IF.helper.call(dis, code)).toBe(expected);
            });
        });
        describe('SWITCH', () => {
            it('should process parser', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH
                const code = "${switch ('world')}${case 'world':}theworld${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}";
                const template = `begin${code}\${variable}${code}end`;
                let dis = { refs: [] };
                const expected = "begintheworld${variable}theworldend";
                expect(SWITCH.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH
                const code = "${switch ('world')}${case 'world':}${switch ('world')}${case 'world':}theworld${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}";
                let dis = { refs: [] };
                expect(SWITCH.parser.call(dis, `begin${code}end`, {}, '', {})).toBe('begintheworldend');
                const codenext = "${switch ('bite')}${case 'world':}${break}${case 'bite':}${switch ('bite')}${case 'world':}theworld${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}${break}${case 'me':}theme${default}thedefault${end switch}";
                expect(SWITCH.parser.call(dis, `begin${codenext}end`, {}, '', {})).toBe('beginthebiteend');
                const codelast = "${switch ('worlds')}${case 'world':}${break}${case 'bite':}thebite${break}${case 'me':}theme${default}${switch ('world')}${case 'world':}theworld${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}thedefault${end switch}";
                expect(SWITCH.parser.call(dis, `begin${codelast}end`, {}, '', {})).toBe('begintheworldthedefaultend');
            });
            it('should process helper', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH;
                const code = "${switch ('world')}${case 'world':}theworld${break}${case 'bite':}thebite${break}${case 'me':}theme${default}thedefault${end switch}";
                let dis = { refs: [] };
                const expected = 'theworld';
                expect(SWITCH.helper.call(dis, code)).toBe(expected);
            });
            it('should return original code when SWITCH syntax does not exist', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH
                const code = "beginend";
                let dis = { refs: [] };
                const expected = "beginend";
                expect(SWITCH.helper.call(dis, code)).toBe(expected);
            });
            it('should process code when SWITCH syntax does not have cases', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH
                const code = "${switch ('world')}${default}thedefault${end switch}";
                let dis = { refs: [] };
                const expected = "thedefault";
                expect(SWITCH.helper.call(dis, code)).toBe(expected);
                expect(SWITCH.helper.call(dis, "${switch ('world')}${end switch}")).toBe("");
            });
            it('should process code when SWITCH syntax does not have cases and no default', () => {
                const SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH
                const code = "${switch ('world')}${end switch}";
                let dis = { refs: [] };
                const expected = "";
                expect(SWITCH.helper.call(dis, code)).toBe(expected);
            });
        });
        describe('SCRIPT', () => {
            it('should process parser', () => {
                const SCRIPT = $c.TEMPLATE_TAG_CONFIG.SCRIPT
                const code = "${script}var a = 0;a += 20;echo('the number is: ');echo(a);echo(10);${end script}";
                const template = `begin${code}\${variable}${code}end`;
                let dis = { refs: [] };
                const expected = "beginthe number is: 2010${variable}the number is: 2010end";
                expect(SCRIPT.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const SCRIPT = $c.TEMPLATE_TAG_CONFIG.SCRIPT
                const code = "${script}var a = 0;a += 20;echo('the number is: ');echo(a);echo(10);${script}var a = 0;a += 20;echo('the number is: ');echo(a);echo(10);${end script}${end script}";
                const template = `begin${code}end`;
                let dis = { refs: [] };
                const expected = "beginthe number is: 2010the number is: 2010end";
                expect(SCRIPT.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
        });
        describe('TRY', () => {
            it('should process parser', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY
                const code = "${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try}";
                const errorMessage = "Error: TypeError: Cannot read property 'foo' of null";
                const template = `begin${code}\${variable}${code}end`;
                let dis = { refs: [] };
                const expected = `beginasdf${errorMessage}finallyy\${variable}asdf${errorMessage}finallyyend`;
                expect(TRY.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser with no catch or finally', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY
                const code = "${try}echo('asdf');echo('finallyy')${end try}";
                const template = `begin${code}end`;
                let dis = { refs: [] };
                const expected = `beginasdffinallyyend`;
                expect(TRY.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser with no catch and with finally', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY
                const code = "${try}echo('asdf');var a = null; a.foo;${finally}echo('finallyy')${end try}";
                const template = `begin${code}end`;
                let dis = { refs: [] };
                const expected = `beginasdffinallyyend`;
                expect(TRY.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser with catch and no finally', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY
                const code = "${try}echo('asdf');var a = null; a.foo;${catch (e)}echo('finallyy')${end try}";
                const template = `begin${code}end`;
                let dis = { refs: [] };
                const expected = `beginasdffinallyyend`;
                expect(TRY.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process parser when nested', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY
                const code = "${try}echo('as')${try}echo('df')${catch (e)}echo('catch')${end try};var a = null; a.foo;${catch (e)}echo(e)${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try};${finally}echo('finallyy')${end try}";
                const template = `begin${code}end`;
                let dis = { refs: [] };
                const errorMessage = "Error: TypeError: Cannot read property 'foo' of null";
                const expected = `beginasdf${errorMessage}asdf${errorMessage}finallyyfinallyyend`;
                expect(TRY.parser.call(dis, template, {}, '', {})).toBe(expected);
            });
            it('should process helper', () => {
                const TRY = $c.TEMPLATE_TAG_CONFIG.TRY;
                const code = `##${uid}##\${try}echo('asdf');var a = null; a.foo;\${catch (e)}echo(e);\${finally}echo('finallyy')\${end try}`;
                const errorMessage = "Error: TypeError: Cannot read property 'foo' of null";
                let dis = { refs: [] };
                const expected = `##${uid}##asdf${errorMessage}finallyy`;
                expect(TRY.helper.call(dis, code)).toBe(expected);
            });
        });
        describe('VARIABLE_NAME', () => {
            const vn = $c.TEMPLATE_TAG_CONFIG.VARIABLE_NAME;
            beforeEach(() => {
                $c.TEMPLATE_TAG_CONFIG.VARIABLE_NAME = vn;
            });
            afterAll(() => {
                $c.TEMPLATE_TAG_CONFIG.VARIABLE_NAME = vn;
            });
            it('should process VARIABLE_NAME', () => {
                const VARIABLE_NAME = $c.TEMPLATE_TAG_CONFIG.VARIABLE_NAME
                expect(VARIABLE_NAME('${thename}')).toBe('thename');
                expect(VARIABLE_NAME('{{thename}}')).toBe('thename');
            });
            it('should allow VARIABLE_NAME to be a regex', () => {
                $c.TEMPLATE_TAG_CONFIG.VARIABLE_NAME = /\$\{(.*?)\}/;
                expect(fillTemplate('${abc}', { abc: 'helloworld' })).toBe('helloworld');
            });
        });
        describe('DECLARE', () => {
            it('should process one variable', () => {
                const DECLARE = $c.TEMPLATE_TAG_CONFIG.DECLARE
                const code = "abcd${declare i=0;}efgh";
                let dis = { declared: {} };
                const expected = 'abcdefgh';
                expect(DECLARE.parser.call(dis, code, '${declare i=0;}')).toBe(expected);
                expect(dis.declared).toEqual({ i: 0 });
            });
            it('should process multiple variables', () => {
                const DECLARE = $c.TEMPLATE_TAG_CONFIG.DECLARE
                const code = "abcd${declare i=0,j=1;}efgh";
                let dis = { declared: {} };
                const expected = 'abcdefgh';
                expect(DECLARE.parser.call(dis, code, '${declare i=0,j=1;}')).toBe(expected);
                expect(dis.declared).toEqual({ i: 0, j: 1 });
            });
        });
    });
});
