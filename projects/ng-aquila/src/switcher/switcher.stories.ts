import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { SwitcherExamplesModule } from '../../documentation/examples/switcher/switcher-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'switcher',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SwitcherExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SwitcherDefault: Story = {
    render: args => ({ template: '<switcher-default-example></switcher-default-example>' }),
};

export const SwitcherDisabled: Story = {
    render: args => ({ template: '<switcher-disabled-example></switcher-disabled-example>' }),
};

export const SwitcherLabelLeft: Story = {
    render: args => ({ template: '<switcher-label-left-example></switcher-label-left-example>' }),
};

export const SwitcherLabelSmall: Story = {
    render: args => ({ template: '<switcher-label-small-example></switcher-label-small-example>' }),
};

export const SwitcherLarge: Story = {
    render: args => ({ template: '<switcher-large-example></switcher-large-example>' }),
};

export const SwitcherNegative: Story = {
    render: args => ({ template: '<switcher-negative-example></switcher-negative-example>' }),
};

export const SwitcherReactiveForm: Story = {
    render: args => ({ template: '<switcher-reactive-form-example></switcher-reactive-form-example>' }),
};

export const SwitcherTemplateDriven: Story = {
    render: args => ({ template: '<switcher-template-driven-example></switcher-template-driven-example>' }),
};
