import * as ts from 'typescript';

import { GroupedComponentMetadata } from './types';
import path = require('path');
import fs = require('fs-extra');

function getComponentTitle(exampleName: string, module: string, source: string) {
    const filePath = path.join(source, module, exampleName, `${exampleName}-example.ts`);
    if (!fs.existsSync(filePath)) {
        console.error('Could not find ts file ', filePath);
        process.exit(1);
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.ES2015, false, ts.ScriptKind.TS);
    let title = '';
    const visit = (node: any): void => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            // get the title of the example from the doc string in the TS file
            if (node.jsDoc?.length) {
                for (const doc of node.jsDoc) {
                    if (doc.tags?.length) {
                        for (const tag of doc.tags) {
                            // comment is the value of title
                            const tagValue = tag.comment;
                            const tagName = tag.tagName.text;
                            if (tagName === 'title') {
                                title = tagValue;
                            }
                        }
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return title;
}

export function createManifestData(metadata: GroupedComponentMetadata[], source: string) {
    return metadata.flatMap(group =>
        group.examples.map(example => {
            const title = getComponentTitle(example, group.name, source);
            return {
                id: example,
                title,
                module: group.name,
                types: ['ts', 'html', 'css'],
                url: `lib-viewer/examples/${example}-###TYPE###.html`,
            };
        }),
    );
}
