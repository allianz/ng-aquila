import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { InputExamplesModule } from '../../documentation/examples/input/input-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'input',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, InputExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Input: Story = {
    render: args => ({ template: '<input-example></input-example>' }),
};

export const InputAutoresize: Story = {
    render: args => ({ template: '<input-autoresize-example></input-autoresize-example>' }),
};

export const InputMode: Story = {
    render: args => ({ template: '<input-mode-example></input-mode-example>' }),
};

export const InputReactive: Story = {
    render: args => ({ template: '<input-reactive-example></input-reactive-example>' }),
};

export const InputStandalone: Story = {
    render: args => ({ template: '<input-standalone-example></input-standalone-example>' }),
};

export const InputTemplateDriven: Story = {
    render: args => ({ template: '<input-template-driven-example></input-template-driven-example>' }),
};

export const InputWithoutFormfield: Story = {
    render: args => ({ template: '<input-without-formfield-example></input-without-formfield-example>' }),
};
