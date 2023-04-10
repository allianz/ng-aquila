import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ProgressStepperExamplesModule } from '../../documentation/examples/progress-stepper/progress-stepper-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'progress-stepper',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ProgressStepperExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ProgressStepper: Story = {
    render: args => ({ template: '<progress-stepper-example></progress-stepper-example>' }),
};

export const ProgressStepperCustom: Story = {
    render: args => ({ template: '<progress-stepper-custom-example></progress-stepper-custom-example>' }),
};

export const ProgressStepperForm: Story = {
    render: args => ({ template: '<progress-stepper-form-example></progress-stepper-form-example>' }),
};

export const ProgressStepperMulti: Story = {
    render: args => ({ template: '<progress-stepper-multi-example></progress-stepper-multi-example>' }),
};

export const ProgressStepperMultiGroups: Story = {
    render: args => ({ template: '<progress-stepper-multi-groups-example></progress-stepper-multi-groups-example>' }),
};

export const ProgressStepperMultiVertical: Story = {
    render: args => ({ template: '<progress-stepper-multi-vertical-example></progress-stepper-multi-vertical-example>' }),
};

export const ProgressStepperNonlinear: Story = {
    render: args => ({ template: '<progress-stepper-nonlinear-example></progress-stepper-nonlinear-example>' }),
};

export const ProgressStepperProgress: Story = {
    render: args => ({ template: '<progress-stepper-progress-example></progress-stepper-progress-example>' }),
};

export const ProgressStepperReactivemulti: Story = {
    render: args => ({ template: '<progress-stepper-reactivemulti-example></progress-stepper-reactivemulti-example>' }),
};

export const ProgressStepperReactivesingle: Story = {
    render: args => ({ template: '<progress-stepper-reactivesingle-example></progress-stepper-reactivesingle-example>' }),
};

export const ProgressStepperStep: Story = {
    render: args => ({ template: '<progress-stepper-step-example></progress-stepper-step-example>' }),
};

export const ProgressStepperTitle: Story = {
    render: args => ({ template: '<progress-stepper-title-example></progress-stepper-title-example>' }),
};
