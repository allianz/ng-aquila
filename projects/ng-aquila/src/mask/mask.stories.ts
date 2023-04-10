import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { MaskExamplesModule } from '../../documentation/examples/mask/mask-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'mask',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, MaskExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const IbanMask: Story = {
    render: args => ({ template: '<iban-mask-example></iban-mask-example>' }),
};

export const Mask: Story = {
    render: args => ({ template: '<mask-example></mask-example>' }),
};

export const MaskCase: Story = {
    render: args => ({ template: '<mask-case-example></mask-case-example>' }),
};

export const MaskDeactivate: Story = {
    render: args => ({ template: '<mask-deactivate-example></mask-deactivate-example>' }),
};

export const MaskDropCharacters: Story = {
    render: args => ({ template: '<mask-drop-characters-example></mask-drop-characters-example>' }),
};

export const MaskSeparators: Story = {
    render: args => ({ template: '<mask-separators-example></mask-separators-example>' }),
};

export const MaskValidation: Story = {
    render: args => ({ template: '<mask-validation-example></mask-validation-example>' }),
};
