import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { NaturalLanguageFormExamplesModule } from '../../documentation/examples/natural-language-form/natural-language-form-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'natural-language-form',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, NaturalLanguageFormExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const NaturalLanguageFormBasic: Story = {
    render: args => ({ template: '<natural-language-form-basic-example></natural-language-form-basic-example>' }),
};

export const NaturalLanguageFormExtended: Story = {
    render: args => ({ template: '<natural-language-form-extended-example></natural-language-form-extended-example>' }),
};

export const NaturalLanguageFormNegative: Story = {
    render: args => ({ template: '<natural-language-form-negative-example></natural-language-form-negative-example>' }),
};

export const NaturalLanguageFormSizes: Story = {
    render: args => ({ template: '<natural-language-form-sizes-example></natural-language-form-sizes-example>' }),
};
