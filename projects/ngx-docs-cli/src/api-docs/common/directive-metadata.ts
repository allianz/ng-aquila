import { Node } from 'ts-morph';

import { CategorizedClassDoc } from './api-doc-definitions';

/**
 * Determines the component or directive metadata from the specified class doc. The resolved
 * directive metadata will be stored in a Map.
 *
 * Currently only string literal assignments and array literal assignments are supported. Other
 * value types are not necessary because they are not needed for any user-facing documentation.
 *
 * ```ts
 * @Component({
 *   inputs: ["red", "blue"],
 *   exportAs: "test"
 * })
 * export class MyComponent {}
 * ```
 */
export function getDirectiveMetadata(classDoc: CategorizedClassDoc): Map<string, any> | null {
  const declaration = classDoc.symbol.getValueDeclaration();

  if (!Node.isClassDeclaration(declaration)) {
    return null;
  }

  const callExpression = declaration
    .getDecorators()
    .map((decorator) => decorator.getCallExpression())
    .find((expression) =>
      ['Component', 'Directive'].includes(expression?.getExpression().getText() ?? ''),
    );

  // The argument length of the CallExpression needs to be exactly one, because it's the single
  // JSON object in the @Component/@Directive decorator.
  const [objectExpression, ...otherArguments] = callExpression?.getArguments() ?? [];

  if (!Node.isObjectLiteralExpression(objectExpression) || otherArguments.length) {
    return null;
  }

  const resultMetadata = new Map<string, any>();

  objectExpression.getProperties().forEach((prop) => {
    if (!Node.isPropertyAssignment(prop)) {
      return;
    }

    const initializer = prop.getInitializerOrThrow();

    if (Node.isArrayLiteralExpression(initializer)) {
      // Identifiers keep their name, so that `imports: [NxIconModule]` still reads.
      const arrayData = initializer
        .getElements()
        .map((element) => (element.compilerNode as { text?: string }).text);

      resultMetadata.set(prop.getName(), arrayData);
    }

    if (Node.isStringLiteral(initializer) || Node.isNoSubstitutionTemplateLiteral(initializer)) {
      resultMetadata.set(prop.getName(), initializer.getLiteralText());
    }
  });

  return resultMetadata;
}
