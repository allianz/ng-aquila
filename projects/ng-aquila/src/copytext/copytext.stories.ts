import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CopytextExamplesModule } from '../../documentation/examples/copytext/copytext-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'copytext',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, CopytextExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CopytextNegative: Story = {
    render: args => ({ template: '<copytext-negative-example></copytext-negative-example>' }),
};

export const CopytextSizes: Story = {
    render: args => ({ template: '<copytext-sizes-example></copytext-sizes-example>' }),
};
