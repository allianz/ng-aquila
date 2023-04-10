import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { HeadlineExamplesModule } from '../../documentation/examples/headline/headline-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'headline',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, HeadlineExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const HeadlineFontWeights: Story = {
    render: args => ({ template: '<headline-font-weights-example></headline-font-weights-example>' }),
};

export const HeadlineLinks: Story = {
    render: args => ({ template: '<headline-links-example></headline-links-example>' }),
};

export const HeadlineNegative: Story = {
    render: args => ({ template: '<headline-negative-example></headline-negative-example>' }),
};

export const HeadlineSizes: Story = {
    render: args => ({ template: '<headline-sizes-example></headline-sizes-example>' }),
};
