import chalk = require('chalk');
import path = require('path');
import glob = require('glob');
import fs = require('fs-extra');
import hljs from 'highlight.js';

const extensionMap = {
    css: 'css',
    ts: 'typescript',
    html: 'html',
};

export function highlightSourceFiles(group, destination) {
    group.examples.forEach(exampleName => {
        console.log(chalk.magenta(`-- ${exampleName}`));
        const filePaths = glob.sync(path.join(group.sourcePath, exampleName, '*.+(html|css|ts)'));
        if (filePaths.length === 0) {
            chalk.yellow('No files found for example ', exampleName);
        }

        filePaths.forEach(filePath => {
            const content = fs.readFileSync(filePath, 'utf-8');
            const fileExtension = path.extname(filePath).slice(1);
            const extension = extensionMap[fileExtension];
            if (!extension) {
                console.error('No matching file extension found for ', filePath);
                process.exit(1);
            }
            const highlightedContent = hljs.highlight(content, { language: extension }).value;
            const newFileTitle = `${exampleName}-${fileExtension}`;
            fs.outputFileSync(path.join(destination, newFileTitle) + '.html', highlightedContent);
        });
    });
}
