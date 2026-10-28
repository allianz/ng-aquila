import { Node, ts, Type, TypeFormatFlags } from 'ts-morph';

import { ParsedDecorator } from './api-doc-definitions';

const LEADING_STAR = /^[^\S\n\r]*\*[^\S\n\r]?/gm;

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: true });

/** Prints a node from its syntax tree, without comments. */
export function nodeToString(node: Node, hint = ts.EmitHint.Unspecified): string {
  return printer.printNode(hint, node.compilerNode, node.getSourceFile().compilerNode);
}

/**
 * Prints a type with the given format flags. Unlike `Type.getText()` this keeps the compiler's own
 * defaults when no flags are given, as ts-morph would otherwise add `NoTruncation` and fully
 * qualified names.
 */
export function typeToString(type: Type, flags?: TypeFormatFlags): string {
  return type.getText(
    undefined,
    flags ??
      TypeFormatFlags.AllowUniqueESSymbolType | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  );
}

/**
 * Kinds whose comment can sit on the same line as the previous token, as in
 * `constructor(/** … *\/ readonly a)`, which the compiler counts as a trailing comment.
 */
const KINDS_WITH_TRAILING_COMMENTS = [
  ts.SyntaxKind.Parameter,
  ts.SyntaxKind.TypeParameter,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
];

/** Returns the JSDoc comments in front of a node, without the comment markers. */
export function getContent(node: Node): string {
  const text = node.getSourceFile().getFullText();
  const ranges = [
    ...(ts.getLeadingCommentRanges(text, node.getPos()) ?? []),
    ...((KINDS_WITH_TRAILING_COMMENTS.includes(node.getKind()) &&
      ts.getTrailingCommentRanges(text, node.getPos())) ||
      []),
  ].filter(
    (range) =>
      range.kind === ts.SyntaxKind.MultiLineCommentTrivia &&
      text[range.pos + 2] === '*' &&
      text[range.pos + 3] !== '/',
  );

  return ranges
    .map((range) => {
      const comment = text
        .substring(range.pos + 3, range.end - 2)
        .replace(LEADING_STAR, '')
        .trim();
      return range.hasTrailingNewLine ? `${comment}\n` : comment;
    })
    .join('')
    .trim();
}

/**
 * The type as written in the source, or the initializer if there is no type. Reads the compiler
 * node, because ts-morph names the type differently per declaration kind (`getTypeNode`,
 * `getReturnTypeNode`, …).
 */
export function getDeclarationTypeText(declaration: Node): string {
  const { type, initializer } = declaration.compilerNode as {
    type?: ts.TypeNode;
    initializer?: ts.Expression;
  };
  const print = (node: ts.Node) =>
    printer.printNode(ts.EmitHint.Unspecified, node, declaration.getSourceFile().compilerNode);

  if (type) {
    return print(type);
  }

  if (Node.isTypeParameterDeclaration(declaration)) {
    return nodeToString(declaration);
  }

  if (!initializer) {
    return '';
  }

  if (ts.isNewExpression(initializer)) {
    const typeArguments = initializer.typeArguments?.map(print);
    return print(initializer.expression) + (typeArguments ? `<${typeArguments.join(', ')}>` : '');
  }

  return print(initializer);
}

export function getDecorators(declaration: Node): ParsedDecorator[] | undefined {
  const decorators = Node.isDecoratable(declaration) ? declaration.getDecorators() : [];

  if (!decorators.length) {
    return undefined;
  }

  return decorators.map((decorator) => {
    const callExpression = decorator.getCallExpression();

    if (!callExpression) {
      return {
        expression: decorator,
        isCallExpression: false,
        name: nodeToString(decorator.getExpression()),
      };
    }

    const args = callExpression.getArguments();
    return {
      argumentInfo: args.map(parseArgument),
      arguments: args.map((argument) => nodeToString(argument, ts.EmitHint.Expression)),
      expression: decorator,
      isCallExpression: true,
      name: nodeToString(callExpression.getExpression()),
    };
  });
}

function parseArgument(argument: Node): any {
  if (Node.isObjectLiteralExpression(argument)) {
    const result: { [name: string]: any } = {};
    argument.getProperties().forEach((property) => {
      if (Node.isPropertyAssignment(property)) {
        result[nodeToString(property.getNameNode())] = parseArgument(
          property.getInitializerOrThrow(),
        );
      }
    });
    return result;
  }

  if (Node.isArrayLiteralExpression(argument)) {
    return argument.getElements().map((element) => nodeToString(element));
  }

  return nodeToString(argument);
}
