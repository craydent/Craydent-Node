const fs = require('fs').promises;
const root = require.resolve('../package.json').replace('/package.json', '');
const CONSOLE_COLORS = {
    RED: '\x1b[31m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m'
};
async function start(prefix) {
    console.log(CONSOLE_COLORS.GREEN, 'starting updateIndex');
    let contentIndex = (await fs.readFile(`${root}/modules/index.ts`, 'utf-8'))
        .replace(/\$\{prefix\}/g, prefix)
        .replace(/\((.*?) as any\)/g, '$1')
        .replace(/import '(.*?)';/g, 'require(\'$1\');');
    let contentGlobal = (await fs.readFile(`${root}/modules/global.ts`, 'utf-8'))
        .replace(/\$\{prefix\}/g, prefix)
        .replace(/\((.*?) as any\)/g, '$1');
    let contentNoConflict = (await fs.readFile(`${root}/modules/noConflict.ts`, 'utf-8'))
        .replace(/\$\{prefix\}/g, prefix)
        .replace(/\((.*?) as any\)/g, '$1');

    let folders = await fs.readdir(`${root}/modules/`);
    let promises = [];
    const exclude = {
        globalTypes: 1,
        methods: 1,
        models: 1,
        private: 1,
        protected: 1,
        "package.json": 1,
        "index.ts": 1,
        "global.ts": 1,
        "noConflict.ts": 1,
        "__prototypes.d.ts": 1
    };
    let protoPromises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        if (folder in exclude) { continue; }
        promises.push(fs.readFile(`${root}/modules/${folder}/index.template`, 'utf8'));
        protoPromises.push(fs.readFile(`${root}/compiled/transformedMajor/${folder}/__prototypes.d.ts`, 'utf8'));
    }
    let results = await Promise.all(promises);
    let protos = await Promise.all(protoPromises);
    let imports = condense(results.join('\n').match(/import\s\* as I[a-zA-Z0-9$]*?\sfrom ['"](.*?)['"]/g), true)
        .filter(x => !!~x.indexOf('./methods') || !!~x.indexOf('IHttp') || !!~x.indexOf('IGeneric'))
        .map(x => x.replace('../', './'))
        .sort();
    if (!~imports.indexOf("import * as IPrototypes from './__prototypes';")) {
        imports.push("import * as IPrototypes from './__prototypes';");
    }
    let exportCode = 'declare const craydent: Craydent;\nexport = craydent;';
    let contents = results.map(content => content.replace(/[\s\S]*?\/\/#region typeDefs([\s\S]*?)\/\/#endregion typeDefs[\s\S]*/g, '$1')).join('\n');
    const protoCode = `${imports.join('\n')}\n`;
    let contentIndexD = contentIndex
        .replace(/\/\* type defs \*\/[\s\S]*/, protoCode + contents.replace(/\/\/#region global[\s\S]*?\/\/#endregion global/g, ''))
        .replace(/require\('(.*?)'\);\n/g, '') + exportCode;
    let contentNoConflictD = contentNoConflict.replace(/\/\* type defs \*\/[\s\S]*/, protoCode + contents.replace(/\/\/#region proto[\s\S]*?\/\/#endregion proto/g, '')) + exportCode;
    let contentGlobalD = contentGlobal.replace(/\/\* type defs \*\/[\s\S]*/, protoCode + contents) + exportCode;

    let models = {};
    let nModels = {};
    let protoVars = '';
    let exportVars = [];
    // remove duplicate vars in the prototype.d
    for (let i = 0, len = protos.length; i < len; i++) {
        // remove dup imports
        let matches = protos[i].match(/import\s\{.*?\}\sfrom ['"].*?['"]/g) || [];
        for (let j = 0, jlen = matches.length; j < jlen; j++) {
            let match = matches[j].replace(/import\s\{(.*?)\}\sfrom ['"](.*?)['"]/g, '$1::$2');
            let parts = match.split('::');
            // if (!~parts[1].indexOf('./models/')) { continue; }
            models[parts[1]] = models[parts[1]] || []
            models[parts[1]] = models[parts[1]].concat(parts[0].trim().split(', '));
            protos[i] = protos[i]
                .replace(`${matches[j]};`, '')
                .replace(matches[j], '');
        }
        // remove dup module imports
        let modMatches = protos[i].match(/import\s\* as .*?\sfrom ['"].*?['"]/g) || [];
        for (let j = 0, jlen = modMatches.length; j < jlen; j++) {
            let match = modMatches[j].replace(/import\s\* as (.*?)\sfrom ['"](.*?)['"]/g, '$1::$2');
            let parts = match.split('::');
            nModels[parts[1]] = nModels[parts[1]] || []
            nModels[parts[1]] = nModels[parts[1]].concat(parts[0].trim().split(', '));
            protos[i] = protos[i]
                .replace(`${modMatches[j]};`, '')
                .replace(modMatches[j], '');
        }
        // remove dup declares
        let varsMatches = protos[i].match(/declare const .*?: typeof .*?;/g) || [];
        for (let j = 0, jlen = varsMatches.length; j < jlen; j++) {
            let match = varsMatches[j];
            if (!~protoVars.indexOf(`${match}\n`)) {
                protoVars += `${match}\n`;
            }
            protos[i] = protos[i].replace(new RegExp(match.replace(/\$/g, '\\$'), 'g'), '');
        }
        // remove dup exports
        let exportMatches = protos[i].match(/export \{.*?\};/g) || [];
        for (let j = 0, jlen = exportMatches.length; j < jlen; j++) {
            let match = exportMatches[j];
            exportVars = exportVars.concat(match.replace(/export \{(.*?)\};/g, '$1').trim().split(', '));
            protos[i] = protos[i].replace(match, '');
        }

    }

    let protoImports = '';
    for (let ref in models) {
        if (!models.hasOwnProperty(ref)) { continue; }
        protoImports += `import { ${condense(models[ref], true).join(', ')} } from '${ref}';\n`
    }
    for (let ref in nModels) {
        if (!nModels.hasOwnProperty(ref)) { continue; }
        protoImports += `import \* as ${condense(nModels[ref], true).join(', ')} from '${ref}';\n`
    }
    exportVars = condense(exportVars, true);
    let exports = `export { ${exportVars.join(', ')} };`;
    await Promise.all([
        fs.writeFile(`${root}/compiled/index.d.ts`, contentIndexD),
        fs.writeFile(`${root}/compiled/noConflict.d.ts`, contentNoConflictD),
        fs.writeFile(`${root}/compiled/global.d.ts`, contentGlobalD),

        fs.writeFile(`${root}/compiled/index.js`, contentIndex),
        fs.writeFile(`${root}/compiled/noConflict.js`, contentNoConflict),
        fs.writeFile(`${root}/compiled/global.js`, contentGlobal),

        fs.writeFile(
            `${root}/compiled/__prototypes.d.ts`,
            (protoImports + protoVars + protos.join('\n') + exports).replace(/[\n]+/g, '\n'))
    ]);
    console.log(CONSOLE_COLORS.GREEN, 'finished updateIndex');
}

function condense(arr, check_values) {
    // try  {
    let skip = [], items = [], without = false;
    if (check_values && check_values.constructor == Array) {
        without = true;
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        let obj = arr[i];
        if (check_values) {
            let index = i;
            if (without && ~check_values.indexOf(obj)) {
                skip.push(i);
                continue;
            }
            if (~skip.indexOf(i)) { continue; }
            while (~(index = arr.indexOf(obj, index + 1))) {
                skip.push(index);
            }

        }
        obj !== "" && !isNull(obj) && !~skip.indexOf(i) && items.push(obj);
    }
    return items;
    // } catch (e) /* istanbul ignore next */ {
    //     console.log("condence", e);
    //     return [];
    // }
}

function isNull(value, defaultValue) {
    try {
        let isnull = value == null || value == undefined;
        if (arguments.length === 1) {
            return isnull;
        }
        return isnull ? defaultValue : value;
    } catch (e) /* istanbul ignore next */ {

    }
}
module.exports.start = start;