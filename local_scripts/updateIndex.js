
function start(prefix) {
    var root = require.resolve('../package.json').replace('/package.json', '');
    var fs = require('fs');
    var content = fs.readFileSync(`${root}/index.template.js`, 'utf-8')

    try { fs.unlinkSync(`${root}/index.js`); } catch (e) { /*console.log(e);*/ }
    fs.writeFileSync(`${root}/index.js`, content.replace(/\$\{prefix\}/g, prefix));
}

module.exports.start = start;