import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { PageSearchExamplesModule } from '../../documentation/examples/page-search/page-search-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'page-search',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, PageSearchExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const PageSearchAutocomplete: Story = {
    render: args => ({ template: '<page-search-autocomplete-example></page-search-autocomplete-example>' }),
};

export const PageSearchClick: Story = {
    render: args => ({ template: '<page-search-click-example></page-search-click-example>' }),
};

export const PageSearchHidden: Story = {
    render: args => ({ template: '<page-search-hidden-example></page-search-hidden-example>' }),
};

export const PageSearchInput: Story = {
    render: args => ({ template: '<page-search-input-example></page-search-input-example>' }),
};
