// script to generate example in documentation (not used in any build process)
//                                           [component] [exampleName]
// usage `node ./utils/generate-example.js   dropdown    focus-out`
// will generate into
// documentation/examples/
//                |- dropdown/
//                     |- dropdown-focus-out/
//                         |- dropdown-focus-out-example.component.ts
//                         |- dropdown-focus-out-example.component.scss
//                         |- dropdown-focus-out-example.component.html

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);

const componentName = process.argv[2];
const exampleName = process.argv[3];
const examplePath = './projects/ng-aquila/documentation/examples';
const srcPath = './projects/ng-aquila/src';
const destination = path.join(examplePath, componentName);
const rootPath = process.cwd();

if (!fs.existsSync(destination)) {
    throw new Error(console.log(`The target example ${destination} does not exist.`));
}

if (!fs.existsSync(path.join(srcPath, componentName))) {
    throw new Error(console.log(`The target src ${path.join(srcPath, componentName)} does not exist.`));
}

(async () => {
    try {
        const folder = componentName + '-' + exampleName;
        await mkdir(path.join(destination, folder));
        console.log(`Successfully created folder: ${folder}`);

        // Generate component
        process.chdir(path.join(destination, folder));
        exec(
            `ng generate component ${componentName}-${exampleName}-example --skip-import --skip-tests=true --type= --prefix= --flat`,
            (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }

                process.chdir(rootPath);

                // add to module
                const moduleFile = path.join(examplePath, componentName, `${componentName}-examples.module.ts`);
                fs.readFile(moduleFile, 'utf8', (err, data) => {
                    if (err) {
                        return console.log(err);
                    }
                    const c = `${capital(componentName)}${capital(exampleName)}Example`;
                    const i = `import { ${c} } from './${componentName}-${exampleName}/${componentName}-${exampleName}-example'`;
                    const result =
                        i +
                        ' \n' +
                        data
                            .replace(/const EXAMPLES = \[/, `const EXAMPLES = [\n    ${c},`)
                            .replace('return {', `return {\n            '${componentName}-${exampleName}': ${c},`);

                    fs.writeFile(moduleFile, result, 'utf8', err => {
                        if (err) return console.log(err);
                        console.log('updated module file');
                    });
                });

                // add to markdown
                const markdownFile = path.join(srcPath, componentName, componentName + '.md');
                fs.readFile(markdownFile, 'utf8', (err, data) => {
                    const x = `### ${exampleName} \n <!-- example(${componentName}-${exampleName}) -->`;
                    const result = `${data} \n ${x}`;
                    fs.writeFile(markdownFile, result, 'utf8', err => {
                        if (err) return console.log(err);
                        console.log('updated markdown');
                    });
                });

                console.log(stdout);
                console.error(stderr);
            },
        );
    } catch (err) {
        console.error(`Error : ${err}`);
    }
})();

function capital(str) {
    return str[0].toUpperCase() + str.slice(1);
}
