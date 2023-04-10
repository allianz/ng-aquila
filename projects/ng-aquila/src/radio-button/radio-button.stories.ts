import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { RadioButtonExamplesModule } from '../../documentation/examples/radio-button/radio-button-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'radio-button',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, RadioButtonExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const RadioButton: Story = {
    render: args => ({ template: '<radio-button-example></radio-button-example>' }),
};

export const RadioButtonDisabled: Story = {
    render: args => ({ template: '<radio-button-disabled-example></radio-button-disabled-example>' }),
};

export const RadioButtonEvent: Story = {
    render: args => ({ template: '<radio-button-event-example></radio-button-event-example>' }),
};

export const RadioButtonForm: Story = {
    render: args => ({ template: '<radio-button-form-example></radio-button-form-example>' }),
};

export const RadioButtonGroup: Story = {
    render: args => ({ template: '<radio-button-group-example></radio-button-group-example>' }),
};

export const RadioButtonGroupHorizontal: Story = {
    render: args => ({ template: '<radio-button-group-horizontal-example></radio-button-group-horizontal-example>' }),
};

export const RadioButtonGroupLabelSize: Story = {
    render: args => ({ template: '<radio-button-group-label-size-example></radio-button-group-label-size-example>' }),
};

export const RadioButtonGroupValidation: Story = {
    render: args => ({ template: '<radio-button-group-validation-example></radio-button-group-validation-example>' }),
};

export const RadioButtonNegative: Story = {
    render: args => ({ template: '<radio-button-negative-example></radio-button-negative-example>' }),
};

export const RadioButtonReactive: Story = {
    render: args => ({ template: '<radio-button-reactive-example></radio-button-reactive-example>' }),
};

export const RadioButtonSample: Story = {
    render: args => ({ template: '<radio-button-sample-example></radio-button-sample-example>' }),
};

export const RadioButtonSizes: Story = {
    render: args => ({ template: '<radio-button-sizes-example></radio-button-sizes-example>' }),
};
