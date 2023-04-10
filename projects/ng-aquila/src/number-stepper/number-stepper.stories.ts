import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { NumberStepperExamplesModule } from '../../documentation/examples/number-stepper/number-stepper-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'number-stepper',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, NumberStepperExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const NumberStepperA11y: Story = {
    render: args => ({ template: '<number-stepper-a11y-example></number-stepper-a11y-example>' }),
};

export const NumberStepperAdditions: Story = {
    render: args => ({ template: '<number-stepper-additions-example></number-stepper-additions-example>' }),
};

export const NumberStepperAutoResizing: Story = {
    render: args => ({ template: '<number-stepper-auto-resizing-example></number-stepper-auto-resizing-example>' }),
};

export const NumberStepperCustomLabel: Story = {
    render: args => ({ template: '<number-stepper-custom-label-example></number-stepper-custom-label-example>' }),
};

export const NumberStepperDisabledExplicit: Story = {
    render: args => ({ template: '<number-stepper-disabled-explicit-example></number-stepper-disabled-explicit-example>' }),
};

export const NumberStepperDisabledImplicit: Story = {
    render: args => ({ template: '<number-stepper-disabled-implicit-example></number-stepper-disabled-implicit-example>' }),
};

export const NumberStepperFloatingPoint: Story = {
    render: args => ({ template: '<number-stepper-floating-point-example></number-stepper-floating-point-example>' }),
};

export const NumberStepperFormatting: Story = {
    render: args => ({ template: '<number-stepper-formatting-example></number-stepper-formatting-example>' }),
};

export const NumberStepperLocalize: Story = {
    render: args => ({ template: '<number-stepper-localize-example></number-stepper-localize-example>' }),
};

export const NumberStepperNegative: Story = {
    render: args => ({ template: '<number-stepper-negative-example></number-stepper-negative-example>' }),
};

export const NumberStepperReactive: Story = {
    render: args => ({ template: '<number-stepper-reactive-example></number-stepper-reactive-example>' }),
};

export const NumberStepperSimpleBinding: Story = {
    render: args => ({ template: '<number-stepper-simple-binding-example></number-stepper-simple-binding-example>' }),
};

export const NumberStepperSizes: Story = {
    render: args => ({ template: '<number-stepper-sizes-example></number-stepper-sizes-example>' }),
};

export const NumberStepperStandalone: Story = {
    render: args => ({ template: '<number-stepper-standalone-example></number-stepper-standalone-example>' }),
};

export const NumberStepperTemplateDriven: Story = {
    render: args => ({ template: '<number-stepper-template-driven-example></number-stepper-template-driven-example>' }),
};

export const NumberStepperValidation: Story = {
    render: args => ({ template: '<number-stepper-validation-example></number-stepper-validation-example>' }),
};
