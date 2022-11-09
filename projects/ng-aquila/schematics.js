#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');
const glob = require('glob');

function copySchematics() {
    try {
        process.chdir('./src');
        glob('./schematics/**/*.json', null, function (er, files) {
            files.forEach(src => {
                const file = src.replace('./schematics/', '');
                fs.copySync('./schematics/' + file, '../../../dist/ng-aquila/schematics/' + file);
            });
        });
    } catch (err) {
        console.error(chalk.red.bold('Error while copy:schematics.'));
        console.error(chalk.red(err));
    }
}

copySchematics();
