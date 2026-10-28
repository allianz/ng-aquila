import { Decorator, ExpressionWithTypeArguments, Node, Symbol, TypeChecker } from 'ts-morph';

import { ParsedTag, TagCollection } from './jsdoc-tags';

/** The source file an API doc was read from. */
export interface FileInfo {
  basePath: string;
  filePath: string;
  relativePath: string;
}

/** Properties that every API doc has, whatever it documents. */
export interface ApiDoc {
  docType: string;
  name: string;
  id: string;
  basePath: string;
  fileInfo: FileInfo;
  /** The JSDoc comment of the doc, without the comment markers. */
  content: string;
  tags: TagCollection;
  description: string;
  /** Text of the `@deprecated` tag. */
  deprecated?: string;
}

/** A source file, documented so that its folder gets a component group even if nothing in it is shown. */
export interface ModuleDoc extends ApiDoc {
  docType: 'module';
}

/** A symbol exported by a source file. Re-exports of the same symbol each get a doc of their own. */
export interface ExportDoc extends ApiDoc {
  docType: 'class' | 'interface' | 'type-alias';
  moduleDoc: ModuleDoc;
  symbol: Symbol;
  declaration: Node;
  typeChecker: TypeChecker;
}

/** Interface that describes categorized docs that can be deprecated. */
export interface DeprecationDoc {
  isDeprecated: boolean;
  deletionTarget: string | null;
}

export interface ParsedDecorator {
  name: string;
  isCallExpression: boolean;
  /** Printed source of the arguments. */
  arguments?: string[];
  /** Arguments parsed into strings, string arrays and objects of those. */
  argumentInfo?: any[];
  expression: Decorator;
}

/** Interface that describes docs that have decorators. */
export interface HasDecoratorsDoc {
  decorators?: ParsedDecorator[];
}

/** An `extends` or `implements` clause of a class or interface. */
export interface HeritageInfo {
  type: ExpressionWithTypeArguments;
  text: string;
  /** The doc of the class or interface the clause refers to, if that one is documented. */
  doc?: ClassLikeExportDoc;
}

export interface ClassLikeExportDoc extends ExportDoc, HasDecoratorsDoc {
  docType: 'class' | 'interface';
  extendsClauses: HeritageInfo[];
  implementsClauses: HeritageInfo[];
  typeParams: string;
  members: MemberDoc[];
}

export interface TypeAliasExportDoc extends ExportDoc {
  docType: 'type-alias';
  typeDefinition: string;
}

/** A property, accessor or method of a class or interface. */
export interface MemberDoc extends ApiDoc, HasDecoratorsDoc {
  docType: 'member';
  memberType: 'method' | 'property';
  containerDoc: ClassLikeExportDoc;
  symbol: Symbol;
  declaration: Node;
  typeChecker: TypeChecker;
  startingLine: number;
  /** The type as written in the source, or the initializer when it has none. */
  type: string;
  isOptional: boolean;
  isGetAccessor: boolean;
  isSetAccessor: boolean;
}

export interface PropertyMemberDoc extends MemberDoc {
  memberType: 'property';
}

export interface MethodMemberDoc extends MemberDoc {
  memberType: 'method';
  /** The parameters as `name?: type = default`. */
  parameters: string[];
  overloads: MethodMemberDoc[];
  /** The `@param` tags, merged with the parameters by `normalizeMethodParameters`. */
  params?: MethodParameterInfo[];
  returns?: ParsedTag;
}

/** Extended class-like document that includes separated class members. */
export interface CategorizedClassLikeDoc extends ClassLikeExportDoc, DeprecationDoc {
  methods: CategorizedMethodMemberDoc[];
  properties: CategorizedPropertyMemberDoc[];
}

/** Extended class document that includes extracted Angular metadata. */
export interface CategorizedClassDoc extends CategorizedClassLikeDoc {
  isComponent: boolean;
  isDirective: boolean;
  isService: boolean;
  isNgModule: boolean;
  isTestHarness: boolean;

  directiveExportAs?: string | null;
  directiveSelectors?: string[];
  directiveMetadata: Map<string, any> | null;
  extendedDoc: HeritageInfo | null;
  /** Only set on components and directives, by the content slot linker. */
  contentSlots?: ContentSlot[];
  /** Only set on components and directives, by the content slot linker. */
  contentSlotSelectors?: ContentSlotSelector[];
}

/** A single `<ng-content>` slot of a component or directive template. */
export interface ContentSlot {
  /** The `select` attribute of the slot, empty for the default slot. */
  select: string;
  /** Whether this is the default slot, i.e. the one without a `select`. */
  isDefault: boolean;
  /** Description of the slot, taken from an `<!-- @slot … -->` comment in the template. */
  description: string;
  /** Documented directives and components that the slot projects. */
  targets: ContentSlotTarget[];
}

/** One of the selectors a directive that has content slots is used by. */
export interface ContentSlotSelector {
  /** The selector itself. */
  text: string;
  /** Whether the selector is only an element name, so that it can be rendered as a tag. */
  isElement: boolean;
}

/** A directive or component that is projected into a content slot. */
export interface ContentSlotTarget {
  /** Class name of the directive or component. */
  name: string;
  /** Name of the component group the directive or component is documented in. */
  groupName: string;
}

/** Extended property-member document that includes extracted Angular metadata. */
export interface CategorizedPropertyMemberDoc extends PropertyMemberDoc, DeprecationDoc {
  isDirectiveInput: boolean;
  isDirectiveOutput: boolean;
  hasDecorator: boolean;
  directiveInputAlias: string;
  directiveOutputAlias: string;
  nameAlias: string;
  /** String values the input accepts, if its type is a union of string literals. */
  inputValues: string[];
}

/** Extended method-member document that simplifies logic for the template. */
export interface CategorizedMethodMemberDoc extends MethodMemberDoc, DeprecationDoc {
  showReturns: boolean;
}

/** A `@param` tag, or a parameter that has none. */
export interface MethodParameterInfo {
  name: string;
  type?: string;
  isOptional?: boolean;
  description?: string;
}
