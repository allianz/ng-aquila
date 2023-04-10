import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { SpinnerExamplesModule } from '../../documentation/examples/spinner/spinner-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'spinner',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SpinnerExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SpinnerNegative: Story = {
    render: args => ({ template: '<spinner-negative-example></spinner-negative-example>' }),
};

export const SpinnerSizes: Story = {
    render: args => ({ template: '<spinner-sizes-example></spinner-sizes-example>' }),
};
