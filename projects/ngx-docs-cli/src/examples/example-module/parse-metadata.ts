import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { SourceFile } from 'typescript';
import * as ts from 'typescript';

export const parseExampleMetadata = pipe(
    map((sourceFile: SourceFile) => {
        const meta: any = {};
        const visit = (node: any): void => {

            // get the classname as a component name
            if (node.kind === ts.SyntaxKind.ClassDeclaration) {
                meta.component = node.name.text;
                // get the title of the example from the doc string in the TS file
                if (node.jsDoc && node.jsDoc.length) {
                  for (const doc of node.jsDoc) {
                      if (doc.tags && doc.tags.length) {
                          for (const tag of doc.tags) {
                              // comment is the value of title
                              const tagValue = tag.comment;
                              const tagName = tag.tagName.text;
                              if (tagName === 'title') {
                                  meta.title = tagValue;
                              }
                          }
                      }
                  }
              }
            }
            // visit each child node in the file
            ts.forEachChild(node, visit);
        };
        visit(sourceFile);
        meta.sourcePath = sourceFile.fileName;
        return meta;
    })
);
