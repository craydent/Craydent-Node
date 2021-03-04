import $c from '../../compiled/transformedMajor/string/noConflict';
import cuid from '../../compiled/transformedMinor/craydent.cuid';

describe('No Conflict String', function () {
  it('capitalize', function () {
    expect($c.capitalize("word of the day")).toBe("Word of the day");
    expect($c.capitalize("word of the day", 1)).toBe("wOrd of the day");
    expect($c.capitalize("word of the day", 0, true)).toBe("Word Of The Day");
    expect($c.capitalize("word of the day", 1, true)).toBe("wOrd oF tHe dAy");
  });
  it('convertUTCDate', function () {
    expect($c.convertUTCDate("2016/12/13 10:01:33", "/")).toBe("12/13/2016 10:01:33");
    expect($c.convertUTCDate("2016.12.13 10:01:33", ".")).toBe("12/13/2016 10:01:33");
    expect($c.convertUTCDate("2016-12-13 10:01:33", "-")).toBe("12/13/2016 10:01:33");
  });
  it('count', function () {
    expect($c.count("calaiedc8a", "a")).toBe(3);
    expect($c.count("calaiedc8a", "c")).toBe(2);
    expect($c.count("calaiedc8a", "-")).toBe(0);
  });
  it('cut', function () {
    expect($c.cut("cala", 1, 2)).toBe("ca");
    expect($c.cut("cala", 1, 2, "p")).toBe("cpa");
  });
  it('ellipsis', function () {
    expect($c.ellipsis("calasdfadfasdfasdfadf", 1)).toBe("c...");
    expect($c.ellipsis("calasdfadfasdfasdfadf", 1, 2)).toBe("c...df");
  });
  it('endsWithAny', function () {
    expect($c.endsWithAny("calasdfadfasdfasdfadf", 'a', 'p', 'f')).toBe("f");
    expect($c.endsWithAny("calasdfadfasdfasdfadf", ['a', 'p', 'f'])).toBe("f");
    expect($c.endsWithAny("calasdfadfasdfasdfadf", 'a')).toBe(false);
    expect($c.endsWithAny("calasdfadfasdfasdfadf", ['a'])).toBe(false);
    expect($c.endsWithAny("build", "build", "pull", "npm")).toBe("build");
    expect($c.endsWithAny("pull", "build", "pull", "npm")).toBe("pull");
  });
  it('highlight', function () {
    expect($c.highlight("cal", 'a')).toBe("c<span class=\"chighlight\">a</span>l");
    expect($c.highlight("cal", /a/)).toBe("c<span class=\"chighlight\">a</span>l");
    expect($c.highlight("cal", 'a', 'chl')).toBe("c<span class=\"chl\">a</span>l");
    expect($c.highlight("cal", /a/, 'chl')).toBe("c<span class=\"chl\">a</span>l");
    expect($c.highlight("cal", 'a', null, 'div')).toBe("c<div class=\"chighlight\">a</div>l");
    expect($c.highlight("cal", /a/, null, 'div')).toBe("c<div class=\"chighlight\">a</div>l");
    expect($c.highlight("cal", 'a', "chl", 'div')).toBe("c<div class=\"chl\">a</div>l");
    expect($c.highlight("cal", /a/, "chl", 'div')).toBe("c<div class=\"chl\">a</div>l");
  });
  it('indexOfAlt', function () {
    expect($c.indexOfAlt("cal", /a/)).toBe(1);
    expect($c.indexOfAlt("cala", /a/, 2)).toBe(3);
  });
  it('ireplace_all', function () {
    expect($c.ireplace_all("calA", 'a', '')).toBe('cl');
  });
  it('isCuid', function () {
    var c = cuid();
    expect($c.isCuid(c)).toBe(true);
  });
  it('isBlank', function () {
    expect($c.isBlank("cal")).toBe(false);
    expect($c.isBlank("")).toBe(true);
  });
  it('isValidEmail', function () {
    expect($c.isValidEmail("cal")).toBe(false);
    expect($c.isValidEmail("cal@craydent.com")).toBe(true);
  });
  it('lastIndexOfAlt', function () {
    expect($c.lastIndexOfAlt("caal", /a/)).toBe(2);
    expect($c.lastIndexOfAlt("caal", /a/, 0)).toBe(-1);
  });
  it('ltrim', function () {
    expect($c.ltrim("     cal ")).toBe("cal ");
    expect($c.ltrim("     aacalaaa", 'a')).toBe("     aacalaaa");
    expect($c.ltrim("aacalaaa", 'a')).toBe("calaaa");
  });
  it('pluralize', function () {
    expect($c.pluralize("life")).toBe("lives");
    expect($c.pluralize("history")).toBe("histories");
    expect($c.pluralize("deer")).toBe("deer");
  });
  it('replace_all', function () {
    expect($c.replace_all("calA", 'a', '')).toBe("clA");
    expect($c.replace_all("calaaa", 'a', '')).toBe("cl");
    expect($c.replace_all("calaaa", 'a', 'b')).toBe("cblbbb");
    expect($c.replace_all("calaaa", ['c', 'a'], ['d', 'b'])).toBe("dblbbb");
    expect($c.replace_all("calaaa", ['c', 'a'], ['b'])).toBe("bblbbb");
  });
  it('reverse', function () {
    expect($c.reverse("cal")).toBe("lac");
  });
  it('rtrim', function () {
    expect($c.rtrim(" cal  ")).toBe(" cal");
    expect($c.rtrim("     aacalaaa", 'a')).toBe("     aacal");
    expect($c.rtrim("aacalaaa", 'a')).toBe("aacal");
  });
  // TO/DO sanitize
  it('sanitize', function () {
    // expect($c.rtrim(" cal  ")).toBe(" cal");
    // expect($c.rtrim("     aacalaaa",'a')).toBe("     aacal");
    // expect($c.rtrim("aacalaaa",'a')).toBe("aacal");
  });
  it('singularize', function () {
    expect($c.singularize("lives")).toBe("life");
    expect($c.singularize("histories")).toBe("history");
    expect($c.singularize("deer")).toBe("deer");
  });
  it('startsWithAny', function () {
    expect($c.startsWithAny("calasdfadfasdfasdfadf", 'a', 'c', 'f')).toBe("c");
    expect($c.startsWithAny("calasdfadfasdfasdfadf", ['a', 'c', 'f'])).toBe("c");
    expect($c.startsWithAny("calasdfadfasdfasdfadf", 'a')).toBe(false);
    expect($c.startsWithAny("calasdfadfasdfasdfadf", ['a'])).toBe(false);
    expect($c.startsWithAny("build", "build", "pull", "npm")).toBe("build");
    expect($c.startsWithAny("pull", "build", "pull", "npm")).toBe("pull");
  });
  it('strip', function () {
    expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaa", 'a')).toBe("cal");
    expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaab", 'a')).toBe("calaaaaaaaaaab");
    expect($c.strip("aaaaaaaaaaaacalaaaaaaaaaa", ['a', 'l'])).toBe('c');
  });
  it('toCurrencyNotation', function () {
    expect($c.toCurrencyNotation("1000")).toBe("1,000");
    expect($c.toCurrencyNotation("1000000")).toBe("1,000,000");
    expect($c.toCurrencyNotation("1000", '.')).toBe('1.000');
  });
  it('toDateTime', function () {
    //console.log($c.toDateTime("30-12-2012"));
    expect($c.toDateTime("30-12-2012")).toEqual(new Date("12/30/2012"));
    expect($c.toDateTime("30.12.2012")).toEqual(new Date("12/30/2012"));
    expect($c.toDateTime("2012-12-30")).toEqual(new Date("12/30/2012"));
    expect($c.toDateTime("2012.12.30")).toEqual(new Date("12/30/2012"));
    expect($c.toDateTime("2012.12.30", { format: 'm/d/Y' })).toEqual("12/30/2012");
    expect($c.toDateTime("2012.12.30", { format: 'd/m/Y' })).toEqual("30/12/2012");
    //expect($c.toDateTime("1000",'.')).toBe('1.000');
  });
  it('toObject', function () {
    expect(JSON.stringify($c.toObject("p1=1&p2=2&p3=3"))).toBe(JSON.stringify({ p1: "1", p2: "2", p3: "3" }));
    expect(JSON.stringify($c.toObject("p1=1"))).toBe(JSON.stringify({ p1: "1" }));
    expect(JSON.stringify($c.toObject("p1=&p2"))).toBe(JSON.stringify({ p1: "", p2: undefined }));
  });
  it('trim', function () {
    expect("    cal    ".trim()).toBe("cal");
    expect("    cal".trim()).toBe("cal");
    expect("cal   ".trim()).toBe("cal");
  });

});