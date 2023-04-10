import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { FormfieldExamplesModule } from '../../documentation/examples/formfield/formfield-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'formfield',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, FormfieldExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const FormfieldAppearance: Story = {
    render: args => ({ template: '<formfield-appearance-example></formfield-appearance-example>' }),
};

export const FormfieldBasic: Story = {
    render: args => ({ template: '<formfield-basic-example></formfield-basic-example>' }),
};

export const FormfieldChangedetection: Story = {
    render: args => ({ template: '<formfield-changedetection-example></formfield-changedetection-example>' }),
};

export const FormfieldCharacterCount: Story = {
    render: args => ({ template: '<formfield-character-count-example></formfield-character-count-example>' }),
};

export const FormfieldCustom: Story = {
    render: args => ({ template: '<formfield-custom-example></formfield-custom-example>' }),
};

export const FormfieldCustomLabel: Story = {
    render: args => ({ template: '<formfield-custom-label-example></formfield-custom-label-example>' }),
};

export const FormfieldCustomTelInput: Story = {
    render: args => ({ template: '<formfield-custom-tel-input-example></formfield-custom-tel-input-example>' }),
};

export const FormfieldError: Story = {
    render: args => ({ template: '<formfield-error-example></formfield-error-example>' }),
};

export const FormfieldErrorTwoColumn: Story = {
    render: args => ({ template: '<formfield-error-two-column-example></formfield-error-two-column-example>' }),
};

export const FormfieldExpertError: Story = {
    render: args => ({ template: '<formfield-expert-error-example></formfield-expert-error-example>' }),
};

export const FormfieldFloating: Story = {
    render: args => ({ template: '<formfield-floating-example></formfield-floating-example>' }),
};

export const FormfieldGlobal: Story = {
    render: args => ({ template: '<formfield-global-example></formfield-global-example>' }),
};

export const FormfieldHint: Story = {
    render: args => ({ template: '<formfield-hint-example></formfield-hint-example>' }),
};

export const FormfieldMultipleErrors: Story = {
    render: args => ({ template: '<formfield-multiple-errors-example></formfield-multiple-errors-example>' }),
};

export const FormfieldNegative: Story = {
    render: args => ({ template: '<formfield-negative-example></formfield-negative-example>' }),
};

export const FormfieldNote: Story = {
    render: args => ({ template: '<formfield-note-example></formfield-note-example>' }),
};

export const FormfieldNoteAndError: Story = {
    render: args => ({ template: '<formfield-note-and-error-example></formfield-note-and-error-example>' }),
};

export const FormfieldOptionalLabel: Story = {
    render: args => ({ template: '<formfield-optional-label-example></formfield-optional-label-example>' }),
};

export const FormfieldPasswordVisibility: Story = {
    render: args => ({ template: '<formfield-password-visibility-example></formfield-password-visibility-example>' }),
};

export const FormfieldPlaceholder: Story = {
    render: args => ({ template: '<formfield-placeholder-example></formfield-placeholder-example>' }),
};

export const FormfieldPrefixSuffixAppendix: Story = {
    render: args => ({ template: '<formfield-prefix-suffix-appendix-example></formfield-prefix-suffix-appendix-example>' }),
};

export const FormfieldSimpleForm: Story = {
    render: args => ({ template: '<formfield-simple-form-example></formfield-simple-form-example>' }),
};
