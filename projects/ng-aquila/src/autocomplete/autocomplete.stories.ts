import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { AutocompleteExamplesModule } from '../../documentation/examples/autocomplete/autocomplete-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'autocomplete',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, AutocompleteExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AutocompleteBasic: Story = {
    render: args => ({ template: '<autocomplete-basic-example></autocomplete-basic-example>' }),
};

export const AutocompleteDataBinding: Story = {
    render: args => ({ template: '<autocomplete-data-binding-example></autocomplete-data-binding-example>' }),
};

export const AutocompleteDefaultRendering: Story = {
    render: args => ({ template: '<autocomplete-default-rendering-example></autocomplete-default-rendering-example>' }),
};

export const AutocompleteFiltering: Story = {
    render: args => ({ template: '<autocomplete-filtering-example></autocomplete-filtering-example>' }),
};

export const AutocompleteOutline: Story = {
    render: args => ({ template: '<autocomplete-outline-example></autocomplete-outline-example>' }),
};

export const AutocompleteScrollStrategyProvider: Story = {
    render: args => ({ template: '<autocomplete-scroll-strategy-provider-example></autocomplete-scroll-strategy-provider-example>' }),
};
