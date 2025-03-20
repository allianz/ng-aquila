import { ApiDoc } from 'dgeni-packages/typescript/api-doc-types/ApiDoc';
import { ClassExportDoc } from 'dgeni-packages/typescript/api-doc-types/ClassExportDoc';
import { ClassLikeExportDoc, HeritageInfo } from 'dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc';
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
}

/** Extended Dgeni property-member document that includes extracted Angular metadata. */
export interface CategorizedPropertyMemberDoc extends PropertyMemberDoc, DeprecationDoc {
    description: string;
    isDirectiveInput: boolean;
    isDirectiveOutput: boolean;
    directiveInputAlias: string;
    directiveOutputAlias: string;
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
