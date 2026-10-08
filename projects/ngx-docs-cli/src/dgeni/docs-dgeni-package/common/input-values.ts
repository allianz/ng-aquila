import { CategorizedPropertyMemberDoc } from './dgeni-definitions';

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
 *
 * Only the type checker handed over by dgeni is used, never the `typescript` module itself: dgeni
 * runs its own version of the compiler, and its types must not be mixed with another version.
 */
export function getInputValues(propertyDoc: CategorizedPropertyMemberDoc): string[] {
  const typeChecker = propertyDoc.typeChecker;
  const valueType = unwrapSignal(getBindingType(propertyDoc), typeChecker);
  const members = valueType.isUnion() ? valueType.types : [valueType];

  const values = members
    .filter((member) => member.isStringLiteral())
    .map((member) => (member as any).value as string)
    // An empty string only resets the input to its default, it is not a value to search for.
    .filter((value) => value !== '');

  return values.filter((value, index) => values.indexOf(value) === index);
}

/**
 * Resolves the type a template binds to. An input declared as a setter accepts the type of the
 * setter's parameter, which can be wider or narrower than what its getter returns.
 */
function getBindingType(propertyDoc: CategorizedPropertyMemberDoc) {
  const { symbol, typeChecker } = propertyDoc;
  const setterParameter = (symbol.declarations ?? [])
    .map((declaration: any) => declaration.parameters?.[0])
    .find((parameter) => parameter !== undefined);

  return setterParameter
    ? typeChecker.getTypeAtLocation(setterParameter)
    : typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
}

/** Returns the value type inside an `input()` or `model()` signal, or the type as is otherwise. */
function unwrapSignal(type: any, typeChecker: CategorizedPropertyMemberDoc['typeChecker']) {
  const argumentIndex = SIGNAL_VALUE_ARGUMENT[type.getSymbol()?.getName() ?? ''];

  if (argumentIndex === undefined) {
    return type;
  }

  return typeChecker.getTypeArguments(type)[argumentIndex] ?? type;
}
