import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CheckboxExamplesModule } from '../../documentation/examples/checkbox/checkbox-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'checkbox',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, CheckboxExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CheckboxGroupBasic: Story = {
    render: args => ({ template: '<checkbox-group-basic-example></checkbox-group-basic-example>' }),
};

export const CheckboxGroupDynamic: Story = {
    render: args => ({ template: '<checkbox-group-dynamic-example></checkbox-group-dynamic-example>' }),
};

export const CheckboxGroupHorizontal: Story = {
    render: args => ({ template: '<checkbox-group-horizontal-example></checkbox-group-horizontal-example>' }),
};

export const CheckboxGroupInheritance: Story = {
    render: args => ({ template: '<checkbox-group-inheritance-example></checkbox-group-inheritance-example>' }),
};

export const CheckboxGroupLabelSize: Story = {
    render: args => ({ template: '<checkbox-group-label-size-example></checkbox-group-label-size-example>' }),
};

export const CheckboxGroupReactive: Story = {
    render: args => ({ template: '<checkbox-group-reactive-example></checkbox-group-reactive-example>' }),
};

export const CheckboxGroupValidation: Story = {
    render: args => ({ template: '<checkbox-group-validation-example></checkbox-group-validation-example>' }),
};

export const CheckboxLabelSize: Story = {
    render: args => ({ template: '<checkbox-label-size-example></checkbox-label-size-example>' }),
};

export const CheckboxNegative: Story = {
    render: args => ({ template: '<checkbox-negative-example></checkbox-negative-example>' }),
};

export const CheckboxOutputs: Story = {
    render: args => ({ template: '<checkbox-outputs-example></checkbox-outputs-example>' }),
};

export const CheckboxReactive: Story = {
    render: args => ({ template: '<checkbox-reactive-example></checkbox-reactive-example>' }),
};

export const CheckboxSimpleBinding: Story = {
    render: args => ({ template: '<checkbox-simple-binding-example></checkbox-simple-binding-example>' }),
};

export const CheckboxStates: Story = {
    render: args => ({ template: '<checkbox-states-example></checkbox-states-example>' }),
};

export const CheckboxTemplateDriven: Story = {
    render: args => ({ template: '<checkbox-template-driven-example></checkbox-template-driven-example>' }),
};
