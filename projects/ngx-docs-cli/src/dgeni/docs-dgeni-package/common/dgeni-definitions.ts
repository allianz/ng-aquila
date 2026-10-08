import { ApiDoc } from 'dgeni-packages/typescript/api-doc-types/ApiDoc';
import { ClassExportDoc } from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import {
  ClassLikeExportDoc,
  HeritageInfo,
} from 'dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc';
import { MethodMemberDoc } from 'dgeni-packages/typescript/api-doc-types/MethodMemberDoc';
import { PropertyMemberDoc } from 'dgeni-packages/typescript/api-doc-types/PropertyMemberDoc';
import { ParsedDecorator } from 'dgeni-packages/typescript/services/TsParser/getDecorators';

/** Interface that describes categorized docs that can be deprecated. */
export interface DeprecationDoc extends ApiDoc {
  isDeprecated: boolean;
  deletionTarget: string | null;
}

/** Interface that describes Dgeni documents that have decorators. */
export interface HasDecoratorsDoc {
  decorators?: ParsedDecorator[];
}

/** Extended Dgeni class-like document that includes separated class members. */
export interface CategorizedClassLikeDoc extends ClassLikeExportDoc, DeprecationDoc {
  methods: CategorizedMethodMemberDoc[];
  properties: CategorizedPropertyMemberDoc[];
}

/** Extended Dgeni class document that includes extracted Angular metadata. */
export interface CategorizedClassDoc extends ClassExportDoc, CategorizedClassLikeDoc {
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

/** Extended Dgeni property-member document that includes extracted Angular metadata. */
export interface CategorizedPropertyMemberDoc extends PropertyMemberDoc, DeprecationDoc {
  description: string;
  isDirectiveInput: boolean;
  isDirectiveOutput: boolean;
  hasDecorator: boolean;
  directiveInputAlias: string;
  directiveOutputAlias: string;
  nameAlias: string;
  /** String values the input accepts, if its type is a union of string literals. */
  inputValues: string[];
}

/** Extended Dgeni method-member document that simplifies logic for the Dgeni template. */
export interface CategorizedMethodMemberDoc {
  [x: string]: any;
}

export class NormalizedMethodMemberDoc extends MethodMemberDoc {
  params?: MethodParameterInfo[];
}

export interface MethodParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
}
