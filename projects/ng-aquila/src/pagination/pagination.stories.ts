import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { PaginationExamplesModule } from '../../documentation/examples/pagination/pagination-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'pagination',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, PaginationExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const PaginationAdvanced: Story = {
    render: args => ({ template: '<pagination-advanced-example></pagination-advanced-example>' }),
};

export const PaginationLocalize: Story = {
    render: args => ({ template: '<pagination-localize-example></pagination-localize-example>' }),
};

export const PaginationLocalizeAdvanced: Story = {
    render: args => ({ template: '<pagination-localize-advanced-example></pagination-localize-advanced-example>' }),
};

export const PaginationSimple: Story = {
    render: args => ({ template: '<pagination-simple-example></pagination-simple-example>' }),
};
