import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { DataDisplayExamplesModule } from '../../documentation/examples/data-display/data-display-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'data-display',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, DataDisplayExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const DataDisplayCondensed: Story = {
    render: args => ({ template: '<data-display-condensed-example></data-display-condensed-example>' }),
};

export const DataDisplayHorizontal: Story = {
    render: args => ({ template: '<data-display-horizontal-example></data-display-horizontal-example>' }),
};

export const DataDisplayResponsive: Story = {
    render: args => ({ template: '<data-display-responsive-example></data-display-responsive-example>' }),
};

export const DataDisplayStandard: Story = {
    render: args => ({ template: '<data-display-standard-example></data-display-standard-example>' }),
};
