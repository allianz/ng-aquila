import { Node, Type } from 'ts-morph';

import { CategorizedPropertyMemberDoc } from './api-doc-definitions';

/**
 * Signal types that wrap the value of an input, mapped to the position of the type argument that
 * holds what a template may bind to it. For `InputSignalWithTransform<T, TransformT>` that is the
 * type the transform accepts, not the one it produces.
 */
const SIGNAL_VALUE_ARGUMENT: { [signalType: string]: number } = {
  InputSignal: 0,
  ModelSignal: 0,
  InputSignalWithTransform: 1,
};

/**
 * Lists the string values an input accepts, e.g. `['primary', 'secondary']` for an input typed
 * `'primary' | 'secondary'` or with a type alias or string enum that resolves to that. Inputs that
 * accept any string, or no string at all, have no list and return an empty array.
 */
export function getInputValues(propertyDoc: CategorizedPropertyMemberDoc): string[] {
  const valueType = unwrapSignal(getBindingType(propertyDoc));
  const members = valueType.isUnion() ? valueType.getUnionTypes() : [valueType];

  const values = members
    .filter((member) => member.isStringLiteral())
    .map((member) => member.getLiteralValue() as string)
    // An empty string only resets the input to its default, it is not a value to search for.
    .filter((value) => value !== '');

  return values.filter((value, index) => values.indexOf(value) === index);
}

/**
 * Resolves the type a template binds to. An input declared as a setter accepts the type of the
 * setter's parameter, which can be wider or narrower than what its getter returns.
 */
function getBindingType({ symbol }: CategorizedPropertyMemberDoc): Type {
  const setterParameter = symbol
    .getDeclarations()
    .filter((declaration) => Node.isSetAccessorDeclaration(declaration))
    .map((setter) => setter.getParameters()[0])
    .find((parameter) => parameter !== undefined);

  return setterParameter
    ? setterParameter.getType()
    : symbol.getTypeAtLocation(symbol.getValueDeclarationOrThrow());
}

/** Returns the value type inside an `input()` or `model()` signal, or the type as is otherwise. */
function unwrapSignal(type: Type): Type {
  const argumentIndex = SIGNAL_VALUE_ARGUMENT[type.getSymbol()?.getName() ?? ''];

  if (argumentIndex === undefined) {
    return type;
  }

  return type.getTypeArguments()[argumentIndex] ?? type;
}
