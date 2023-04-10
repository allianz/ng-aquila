import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { RadioToggleExamplesModule } from '../../documentation/examples/radio-toggle/radio-toggle-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'radio-toggle',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, RadioToggleExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const RadioToggle: Story = {
    render: args => ({ template: '<radio-toggle-example></radio-toggle-example>' }),
};

export const RadioToggleCustom: Story = {
    render: args => ({ template: '<radio-toggle-custom-example></radio-toggle-custom-example>' }),
};

export const RadioToggleForm: Story = {
    render: args => ({ template: '<radio-toggle-form-example></radio-toggle-form-example>' }),
};

export const RadioToggleNegative: Story = {
    render: args => ({ template: '<radio-toggle-negative-example></radio-toggle-negative-example>' }),
};

export const RadioToggleReactive: Story = {
    render: args => ({ template: '<radio-toggle-reactive-example></radio-toggle-reactive-example>' }),
};

export const RadioToggleValidation: Story = {
    render: args => ({ template: '<radio-toggle-validation-example></radio-toggle-validation-example>' }),
};
