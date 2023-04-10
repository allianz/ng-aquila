import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { CodeInputExamplesModule } from '../../documentation/examples/code-input/code-input-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'code-input',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, CodeInputExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const CodeInputDisabled: Story = {
    render: args => ({ template: '<code-input-disabled-example></code-input-disabled-example>' }),
};

export const CodeInputFourChar: Story = {
    render: args => ({ template: '<code-input-four-char-example></code-input-four-char-example>' }),
};

export const CodeInputLocalize: Story = {
    render: args => ({ template: '<code-input-localize-example></code-input-localize-example>' }),
};

export const CodeInputModel: Story = {
    render: args => ({ template: '<code-input-model-example></code-input-model-example>' }),
};

export const CodeInputNegative: Story = {
    render: args => ({ template: '<code-input-negative-example></code-input-negative-example>' }),
};

export const CodeInputSevenChar: Story = {
    render: args => ({ template: '<code-input-seven-char-example></code-input-seven-char-example>' }),
};

export const CodeInputSixChar: Story = {
    render: args => ({ template: '<code-input-six-char-example></code-input-six-char-example>' }),
};

export const CodeInputType: Story = {
    render: args => ({ template: '<code-input-type-example></code-input-type-example>' }),
};
