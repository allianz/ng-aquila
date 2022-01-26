import * as path from 'path';
import * as ts from 'typescript';

import { GroupedComponentMetadata } from './types';
import fs = require('fs-extra');

function findExampleFolders(source) {
    if (!fs.existsSync(source)) {
        return [];
    }

    return fs
        .readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

export const getMetadata = (file: ts.SourceFile) => {
    const components = [];
    let className = '';
    const visit = (node: ts.Node) => {
        if (ts.isClassDeclaration(node)) {
            if (node.name.escapedText.toString().includes('ExamplesModule')) {
                className = node.name.escapedText.toString();
                node.members.forEach(m => {
                    if (ts.isMethodDeclaration(m)) {
                        if (ts.isIdentifier(m.name) && m.name.escapedText === 'components') {
                            m.body.statements.forEach(statement => {
                                if (ts.isReturnStatement(statement) && ts.isObjectLiteralExpression(statement.expression)) {
                                    statement.expression.properties.forEach(p => {
                                        if (ts.isPropertyAssignment(p) && ts.isStringLiteral(p.name)) {
                                            components.push(p.name.text);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(file);
    return { className, components };
};

function getModuleMetadata(modulePath: string, serviceOutputPath: string) {
    const sourceFile = ts.createSourceFile('test.ts', fs.readFileSync(path.resolve(modulePath)).toString(), ts.ScriptTarget.ES2015, false, ts.ScriptKind.TS);
    const metadata = getMetadata(sourceFile);
    const basename = path.basename(modulePath).replace('.ts', '');
    const relativeImportPath = path.relative(path.resolve(serviceOutputPath), path.resolve(modulePath));
    return { modulePath, className: metadata.className, basename, relativeImportPath };
}

export function collectMetadata(source, serviceOutputPath): GroupedComponentMetadata[] {
    const exampleComponentNames = findExampleFolders(source);

    // scan all example folders
    const parsedMetadata = exampleComponentNames.map(componentName => {
        // find module
        const modulePath = path.join(source, componentName, `${componentName}-examples.module.ts`);
        if (!fs.existsSync(modulePath)) {
            console.error('Module not found');
            process.exit(1);
        }

        const moduleMetadata = getModuleMetadata(modulePath, serviceOutputPath);

        // get example folders
        const exampleFolders = fs
            .readdirSync(path.join(source, componentName), { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        return {
            sourcePath: path.join(source, componentName),
            name: componentName,
            ...moduleMetadata,
            examples: exampleFolders,
        };
    });

    return parsedMetadata;
}
