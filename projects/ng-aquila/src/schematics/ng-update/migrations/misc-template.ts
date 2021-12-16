import { findInputsOnElementWithTag, Migration, ResolvedResource, TargetVersion, UpgradeData } from '@angular/cdk/schematics';

/**
 * Migration that walks through every template and reports if there are
 * instances of outdated Angular CDK API that can't be migrated automatically.
 *
 * TODO: make it reusable across major versions, e.g. with a custom data object
 * similar to the CDK UpgradeData
 */
export class MiscTemplateMigration extends Migration<UpgradeData> {
    // For the first version we need it for V11 but we might need the same
    // functionality for future major versions as well
    enabled = this.targetVersion === TargetVersion.V11;

    visitTemplate(template: ResolvedResource): void {
        let relativeOffsets: number[] = [];
        const limitedTo = ['nx-single-stepper', 'nx-multi-stepper', 'nx-progress-stepper'];
        relativeOffsets.push(...findInputsOnElementWithTag(template.content, 'title', limitedTo));

        relativeOffsets
            .map(offset => template.start + offset)
            .forEach(start => {
                this.failures.push({
                    filePath: template.filePath,
                    position: template.getCharacterAndLineOfPosition(start),
                    message:
                        `Found deprecated input "title" on nx-single-stepper, nx-multi-stepper or ` +
                        `nx-progress-stepper. Please use a "nx-label" element inside the content instead.`,
                });
            });

        // nxAriaLabel on nx-dropdown
        relativeOffsets = [];
        relativeOffsets.push(...findInputsOnElementWithTag(template.content, 'nxAriaLabel', ['nx-dropdown']));

        relativeOffsets
            .map(offset => template.start + offset)
            .forEach(start => {
                this.failures.push({
                    filePath: template.filePath,
                    position: template.getCharacterAndLineOfPosition(start),
                    message: `Found deprecated input "nxAriaLabel" on nx-dropdown. Please remove the input.`,
                });
            });
    }
}
