import { pascalCase } from 'pascal-case';

export const storyTemplate = (componentName, exampleModule, examples) => `
import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
${examples
    .map(
        example =>
            `import { ${example.exampleComponent} } from '../../documentation/examples/${componentName}/${example.exampleName}/${example.exampleName}-example';`,
    )
    .join('\n')}
import { ${exampleModule.moduleName} } from '../../documentation/examples/${componentName}/${exampleModule.moduleFile.replace('.ts', '')}';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: '${componentName}',
    decorators: [
        moduleMetadata({
            //declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ${exampleModule.moduleName}],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

${examples
    .map(
        example => `export const ${pascalCase(example.exampleName)}: Story = {
    render: args => ({ template: '<${example.selector}></${example.selector}>' }),
};`,
    )
    .join('\n\n')}
`;
