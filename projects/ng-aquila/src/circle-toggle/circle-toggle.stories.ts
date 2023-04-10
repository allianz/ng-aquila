import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CircleToggleExamplesModule } from '../../documentation/examples/circle-toggle/circle-toggle-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'circle-toggle',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, CircleToggleExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CircleToggleGroup: Story = {
    render: args => ({ template: '<circle-toggle-group-example></circle-toggle-group-example>' }),
};

export const CircleToggleGroupExpert: Story = {
    render: args => ({ template: '<circle-toggle-group-expert-example></circle-toggle-group-expert-example>' }),
};

export const CircleToggleNegative: Story = {
    render: args => ({ template: '<circle-toggle-negative-example></circle-toggle-negative-example>' }),
};

export const CircleToggleReactive: Story = {
    render: args => ({ template: '<circle-toggle-reactive-example></circle-toggle-reactive-example>' }),
};

export const CircleToggleReactiveDisabled: Story = {
    render: args => ({ template: '<circle-toggle-reactive-disabled-example></circle-toggle-reactive-disabled-example>' }),
};

export const CircleToggleResponsive: Story = {
    render: args => ({ template: '<circle-toggle-responsive-example></circle-toggle-responsive-example>' }),
};

export const CircleToggleSimpleBinding: Story = {
    render: args => ({ template: '<circle-toggle-simple-binding-example></circle-toggle-simple-binding-example>' }),
};

export const CircleToggleStandalone: Story = {
    render: args => ({ template: '<circle-toggle-standalone-example></circle-toggle-standalone-example>' }),
};

export const CircleToggleTemplateDriven: Story = {
    render: args => ({ template: '<circle-toggle-template-driven-example></circle-toggle-template-driven-example>' }),
};

export const CircleToggleText: Story = {
    render: args => ({ template: '<circle-toggle-text-example></circle-toggle-text-example>' }),
};

export const CircleToggleValidation: Story = {
    render: args => ({ template: '<circle-toggle-validation-example></circle-toggle-validation-example>' }),
};
