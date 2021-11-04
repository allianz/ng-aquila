/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

export function createStringLiteral(text: string, singleQuotes: boolean): ts.StringLiteral {
  const literal: any = ts.createStringLiteral(text);
  // See: https://github.com/microsoft/TypeScript/blob/master/src/compiler/utilities.ts#L584-L590
  literal['singleQuote'] = singleQuotes;
  return literal;
}

export function report(node: ts.Node, message: string) {
  const { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(
    node.getStart()
  );
  console.log(`MODIFYING: ${message} in ${node.getSourceFile().fileName} (${line + 1},${character + 1})`);
}

export function modifyProperty(node: ts.Node) {
  let modify = false;
  const propertyAssignment = node as ts.PropertyAssignment;
  // check if this is the correct property assignment to modify
  if (propertyAssignment.parent && propertyAssignment.parent.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    const objectLiteralAssignment = propertyAssignment.parent as ts.ObjectLiteralExpression;
    if (objectLiteralAssignment.parent && objectLiteralAssignment.parent.kind === ts.SyntaxKind.CallExpression) {
      const callExpression = objectLiteralAssignment.parent as ts.CallExpression;
      if (callExpression.parent.kind === ts.SyntaxKind.Decorator) {
        modify = true;
      }
    }
  }
  return { modify, propertyAssignment };
}

export function isAngularApplicationProject(project: ProjectDefinition): boolean {
  if (project.extensions.projectType !== 'application') {
    return false;
  }

  const builder = project.targets?.get('build')?.builder.toString();
  if (builder && (builder.includes('@angular-devkit/build-angular:browser')
  || builder.includes('@angular-builders/custom-webpack:browser'))) {
    return true;
  }
  return false;
}
