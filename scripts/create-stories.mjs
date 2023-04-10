import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { storyTemplate } from './story-template.mjs';
import { pascalCase } from 'pascal-case';

const componentSrcFolder = 'projects/ng-aquila/src';
const examplesFolder = 'projects/ng-aquila/documentation/examples';
const ignoreList = ['accessibility', 'core', 'rtl', 'types', 'typography', 'utils', 'stories', 'iso-date-adapter', 'moment-date-adapter'];

const getComponentExampleFolder = componentName => resolve(examplesFolder, componentName);
const getComponentSrcFolder = componentName => resolve(componentSrcFolder, componentName);

const findComponentSelector = content => {
    const match = content.match(/selector:[\s]'(.*)'/);
    return match[1];
};

const getExampleComponents = componentName => {
    const allExamples = [];
    const componentFolder = getComponentExampleFolder(componentName);
    const folders = readdirSync(componentFolder, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name);
    folders.forEach(exampleFolderName => {
        const componentFile = resolve(componentFolder, exampleFolderName, `${exampleFolderName}-example.ts`);
        if (!existsSync(componentFile)) {
            console.log(`Error, cannot find ${componentFile}`);
            return;
        }
        const fileContents = readFileSync(componentFile).toString();
        const selector = findComponentSelector(fileContents);
        if (!selector) {
            console.log("Error, couldn't find selector", componentName, exampleFolderName);
            return;
        }
        allExamples.push({ exampleName: exampleFolderName, selector, exampleComponent: `${pascalCase(exampleFolderName)}ExampleComponent` });
    });
    return allExamples;
};

const getExampleModule = componentName => {
    const componentExampleFolder = getComponentExampleFolder(componentName);
    const modulePath = resolve(componentExampleFolder, `${componentName}-examples.module.ts`);
    if (!existsSync(modulePath)) {
        throw new Error('Example module not found');
    }
    return { modulePath, moduleName: `${pascalCase(componentName)}ExamplesModule`, moduleFile: `${componentName}-examples.module.ts` };
};

const createComponentStoryFile = (componentName, exampleModule, examples) => {
    const storyContent = storyTemplate(componentName, exampleModule, examples);
    const componentSrcFolder = getComponentSrcFolder(componentName);
    const storyFileName = `${componentName}.stories.ts`;
    const storyFilePath = resolve(componentSrcFolder, storyFileName);
    writeFileSync(storyFilePath, storyContent);
};

// Step 1:
// get all component folders
const allSrcFolderEntries = readdirSync(componentSrcFolder, { withFileTypes: true });
const componentNames = allSrcFolderEntries.filter(entry => entry.isDirectory() && !ignoreList.includes(entry.name)).map(entry => entry.name);
console.log(componentNames);

// for each component
// get all example components
// get the example module
componentNames.forEach(componentName => {
    const componentExampleFolder = resolve(examplesFolder, componentName);
    if (!existsSync(componentExampleFolder)) {
        console.log('NOPE', componentExampleFolder);
        return;
    }
    try {
        const moduleData = getExampleModule(componentName);
        const examples = getExampleComponents(componentName);
        console.log(examples);
        createComponentStoryFile(componentName, moduleData, examples);
    } catch (e) {
        console.log(`Error for ${componentName}: `, e);
    }
});

// create a story file that adds all examples as stories

// Step 2:
// create mdx files for all

// Step 3:
// migrate existing md files to mdx
// including copy and pasting the example files
// into the story files that the users could see some
// proper code
