#!/usr/bin/env node
const cpx = require('cpx');
const chalk = require('chalk');

function copySchematics() {
  try {
    process.chdir('./src');
    cpx.copySync('./schematics/**/*.json', '../../../dist/ng-aquila/schematics')
  } catch (err) {
    console.error(chalk.red.bold('Error while copy:schematics.'));
    console.error(chalk.red(err));
  }
}

copySchematics();
