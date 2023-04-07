export const storyTemplate = (componentName, exampleModule, examples) => `
import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
${examples.forEach(
    example => `import { ${example.exampleName} } from '../../documentation/examples/${componentName}/${example.exampleName}/${example.exampleName}-example';`,
)}
import { ${exampleModule.moduleName} } from '../../documentation/examples/${componentName}/${exampleModule.moduleName.replace('.ts', '')}';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: ${componentName}',
    decorators: [
        moduleMetadata({
            //declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ${exampleModule.moduleName}],
        }),
    ],
    // tags: ['autodocs'],
};

export default meta;
//type Story = StoryObj<NxButtonComponent>;

${examples.forEach(
    example => `export const ${example.exampleName}: Story = {
    render: args => ({ template: '<${example.selector}></${example.selector}>' }),
};`,
)}
`;
