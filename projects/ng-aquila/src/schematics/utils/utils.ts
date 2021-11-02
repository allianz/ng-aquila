/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import * as html from '@angular/compiler/src/ml_parser/ast';
import { getHtmlTagDefinition } from '@angular/compiler/src/ml_parser/html_tags';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

class SerializerVisitor implements html.Visitor {
  visitElement(element: html.Element, _context: any): any {
    if (getHtmlTagDefinition(element.name).isVoid) {
      return `<${element.name}${this._visitAll(element.attrs, ' ')}/>`;
    }

    return `<${element.name}${this._visitAll(element.attrs, ' ')}>${this._visitAll(element.children)}</${element.name}>`;
  }

  visitAttribute(attribute: html.Attribute, _context: any): any {
    if (!attribute.value) {
      return `${attribute.name}`;
    }
    return `${attribute.name}="${attribute.value}"`;
  }

  visitText(text: html.Text, _context: any): any { return text.value; }

  visitComment(comment: html.Comment, _context: any): any { return `<!--${comment.value}-->`; }

  visitExpansion(expansion: html.Expansion, _context: any): any {
    return `{${expansion.switchValue}, ${expansion.type},${this._visitAll(expansion.cases)}}`;
  }

  visitExpansionCase(expansionCase: html.ExpansionCase, _context: any): any {
    return ` ${expansionCase.value} {${this._visitAll(expansionCase.expression)}}`;
  }

  private _visitAll(nodes: html.Node[], join: string = ''): string {
    if (nodes.length === 0) {
      return '';
    }
    return join + nodes.map(a => a.visit(this, null)).join(join);
  }
}

const serializerVisitor = new SerializerVisitor();

export function serializeNodes(nodes: html.Node[]): string[] {
  return nodes.map(node => node.visit(serializerVisitor, null));
}

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
