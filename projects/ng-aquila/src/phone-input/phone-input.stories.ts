import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { PhoneInputExamplesModule } from '../../documentation/examples/phone-input/phone-input-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'phone-input',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, PhoneInputExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const PhoneInputCountryCode: Story = {
    render: args => ({ template: '<phone-input-country-code-example></phone-input-country-code-example>' }),
};

export const PhoneInputDisabled: Story = {
    render: args => ({ template: '<phone-input-disabled-example></phone-input-disabled-example>' }),
};

export const PhoneInputExpert: Story = {
    render: args => ({ template: '<phone-input-expert-example></phone-input-expert-example>' }),
};

export const PhoneInputFocusOut: Story = {
    render: args => ({ template: '<phone-input-focus-out-example></phone-input-focus-out-example>' }),
};

export const PhoneInputFormatting: Story = {
    render: args => ({ template: '<phone-input-formatting-example></phone-input-formatting-example>' }),
};

export const PhoneInputForms: Story = {
    render: args => ({ template: '<phone-input-forms-example></phone-input-forms-example>' }),
};

export const PhoneInputI18n: Story = {
    render: args => ({ template: '<phone-input-i18n-example></phone-input-i18n-example>' }),
};

export const PhoneInputRetail: Story = {
    render: args => ({ template: '<phone-input-retail-example></phone-input-retail-example>' }),
};

export const PhoneInputValidation: Story = {
    render: args => ({ template: '<phone-input-validation-example></phone-input-validation-example>' }),
};
