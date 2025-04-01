import { DocCollection, Processor } from 'dgeni';
import { MethodMemberDoc } from 'dgeni-packages/typescript/api-doc-types/MethodMemberDoc';
import { ParsedDecorator } from 'dgeni-packages/typescript/services/TsParser/getDecorators';

import { decorateDeprecatedDoc, getDirectiveSelectors, isComponent, isDirective, isMethod, isNgModule, isProperty, isService } from '../common/decorators';
import { CategorizedClassDoc, CategorizedClassLikeDoc, CategorizedMethodMemberDoc, CategorizedPropertyMemberDoc } from '../common/dgeni-definitions';
import { getDirectiveMetadata } from '../common/directive-metadata';
import { normalizeMethodParameters } from '../common/normalize-method-parameters';
import { getInputBindingData, getOutputBindingData } from '../common/property-bindings';
import { sortCategorizedMembers } from '../common/sort-members';

/**
 * Processor to add properties to docs objects.
 *
 * isMethod     | Whether the doc is for a method on a class.
 * isComponent  | Whether the doc is for a @Component
 * isDirective  | Whether the doc is for a @Directive
 * isService    | Whether the doc is for an @Injectable
 * isNgModule   | Whether the doc is for an @NgModule
 */
export class Categorizer implements Processor {
    name = 'categorizer';
    $runBefore = ['docs-processed'];

    $process(docs: DocCollection) {
        docs.filter(doc => doc.docType === 'class' || doc.docType === 'interface').forEach(doc => this.decorateClassLikeDoc(doc));
    }

    /**
     * Decorates all class and interface docs inside of the dgeni pipeline.
     * - Members of a class and interface document will be extracted into separate variables.
     */
    private decorateClassLikeDoc(classLikeDoc: CategorizedClassLikeDoc) {
        // Resolve all methods and properties from the classDoc.
        // also list overloaded functions in the document.
        classLikeDoc.methods = classLikeDoc.members
            .filter(isMethod)
            .filter(filterDuplicateMembers)
            .map(member => member as CategorizedMethodMemberDoc)
            .flatMap(method => [method, ...method.overloads]);

        classLikeDoc.properties = classLikeDoc.members.filter(isProperty).filter(filterDuplicateMembers) as CategorizedPropertyMemberDoc[];

        // Special decorations for real class documents that don't apply for interfaces.
        if (classLikeDoc.docType === 'class') {
            this.decorateClassDoc(classLikeDoc as CategorizedClassDoc);
        }

        if (classLikeDoc.docType === 'interface') {
            if (this._isTestHarness(classLikeDoc as CategorizedClassDoc)) {
                (classLikeDoc as CategorizedClassDoc).isTestHarness = true;
            }
        }

        // Call decorate hooks that can modify the method and property docs.
        classLikeDoc.methods.forEach(doc => this.decorateMethodDoc(doc));
        classLikeDoc.properties.forEach(doc => this.decoratePropertyDoc(doc));

        decorateDeprecatedDoc(classLikeDoc);

        // Sort members
        classLikeDoc.methods.sort(sortCategorizedMembers);
        classLikeDoc.properties.sort(sortCategorizedMembers);
    }

    /**
     * Decorates all Dgeni class documents for a simpler use inside of the template.
     * - Identifies directives, services or NgModules and marks them them inside of the doc.
     * - Links the Dgeni document to the Dgeni document that the current class extends from.
     */
    private decorateClassDoc(classDoc: CategorizedClassDoc) {
        // Classes can only extend a single class. This means that there can't be multiple extend
        // clauses for the Dgeni document. To make the template syntax simpler and more readable,
        // store the extended class in a variable.
        classDoc.extendedDoc = classDoc.extendsClauses[0] ? classDoc.extendsClauses[0] : null;
        classDoc.directiveMetadata = getDirectiveMetadata(classDoc);

        // Categorize the current visited classDoc into its Angular type.
        if (this._isTestHarness(classDoc)) {
            classDoc.isTestHarness = true;
        } else if (isDirective(classDoc) && classDoc.directiveMetadata) {
            classDoc.isDirective = true;
            classDoc.directiveExportAs = classDoc.directiveMetadata.get('exportAs');
            classDoc.directiveSelectors = getDirectiveSelectors(classDoc);
        } else if (isComponent(classDoc) && classDoc.directiveMetadata) {
            classDoc.isComponent = true;
            classDoc.directiveExportAs = classDoc.directiveMetadata.get('exportAs');
            classDoc.directiveSelectors = getDirectiveSelectors(classDoc);
        } else if (isService(classDoc)) {
            classDoc.isService = true;
        } else if (isNgModule(classDoc)) {
            classDoc.isNgModule = true;
        }
    }

    /**
     * Method that will be called for each method doc. The parameters for the method-docs
     * will be normalized, so that they can be easily used inside of dgeni templates.
     */
    private decorateMethodDoc(methodDoc: CategorizedMethodMemberDoc) {
        normalizeMethodParameters(methodDoc as any);
        decorateDeprecatedDoc(methodDoc as any);

        if (!methodDoc.type) {
            const signature = methodDoc.typeChecker.getSignatureFromDeclaration(methodDoc.declaration);
            const returnType = methodDoc.typeChecker.getReturnTypeOfSignature(signature);
            methodDoc.type = methodDoc.typeChecker.typeToString(returnType);
        }

        // Mark methods with a `void` return type so we can omit show the return type in the docs.
        methodDoc.showReturns = methodDoc.type ? methodDoc.type !== 'void' : false;
    }

    /**
     * Method that will be called for each property doc. Properties that are Angular inputs or
     * outputs will be marked. Aliases for the inputs or outputs will be stored as well.
     */
    private decoratePropertyDoc(propertyDoc: CategorizedPropertyMemberDoc) {
        decorateDeprecatedDoc(propertyDoc);

        const metadata = propertyDoc.containerDoc.docType === 'class' ? (propertyDoc.containerDoc as CategorizedClassDoc).directiveMetadata : null;

        const inputMetadata = metadata ? getInputBindingData(propertyDoc, metadata) : null;
        const outputMetadata = metadata ? getOutputBindingData(propertyDoc, metadata) : null;

        // use inferred type
        const symbolType = propertyDoc.typeChecker.getTypeOfSymbolAtLocation(propertyDoc.symbol, propertyDoc.symbol.valueDeclaration);
        const inferredType = propertyDoc.typeChecker.typeToString(symbolType);

        const isSignalInput = isInputSignal(inferredType);
        const isSignalOutput = isOutputSignal(inferredType);

        propertyDoc.hasDecorator = propertyDoc.decorators && propertyDoc.decorators.length > 0;
        propertyDoc.isDirectiveInput = !!inputMetadata || isSignalInput;
        propertyDoc.directiveInputAlias = inputMetadata?.alias || '';
        propertyDoc.isDirectiveOutput = !!outputMetadata || isSignalOutput;
        propertyDoc.directiveOutputAlias = outputMetadata?.alias || '';

        if (propertyDoc.isDirectiveInput || propertyDoc.isDirectiveOutput) {
            propertyDoc.nameAlias = getAnnotationAlias(propertyDoc.decorators) || getsignalAlias(propertyDoc.type);
        }
        propertyDoc.type = inferredType;
    }

    private _isTestHarness(doc: CategorizedClassDoc): boolean {
        return doc.id.toLowerCase().includes('harness');
    }
}

function isInputSignal(type: string) {
    const regex = /InputSignal|ModelSignal/;
    return regex.test(type);
}

function isOutputSignal(type: string) {
    return type.includes('OutputEmitterRef');
}

function getsignalAlias(type: string) {
    const regex = /alias:\s*'([^']*)'/;
    const match = type.match(regex);
    return match ? match[1] : '';
}

function getAnnotationAlias(decorators: ParsedDecorator[]) {
    if (!decorators || decorators.length === 0) {
        return '';
    }
    const data = decorators[0].argumentInfo[0];
    return typeof data === 'string' ? data.replace(/'/g, '') : '';
}

function filterDuplicateMembers(item: MethodMemberDoc, _index: number, array: MethodMemberDoc[]) {
    return array.filter(memberDoc => memberDoc.name === item.name)[0] === item;
}
