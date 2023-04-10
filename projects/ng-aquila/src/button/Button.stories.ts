import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ButtonExamplesModule } from '../../documentation/examples/button/button-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'button',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ButtonExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AnchorButton: Story = {
    render: args => ({ template: '<anchor-button-example></anchor-button-example>' }),
};

export const Button: Story = {
    render: args => ({ template: '<button-example></button-example>' }),
};

export const ButtonBlock: Story = {
    render: args => ({ template: '<button-block-example></button-block-example>' }),
};

export const ButtonDanger: Story = {
    render: args => ({ template: '<button-danger-example></button-danger-example>' }),
};

export const ButtonIcon: Story = {
    render: args => ({ template: '<button-icon-example></button-icon-example>' }),
};

export const ButtonIconIndicator: Story = {
    render: args => ({ template: '<button-icon-indicator-example></button-icon-indicator-example>' }),
};

export const ButtonLarge: Story = {
    render: args => ({ template: '<button-large-example></button-large-example>' }),
};

export const ButtonMedium: Story = {
    render: args => ({ template: '<button-medium-example></button-medium-example>' }),
};

export const ButtonNegative: Story = {
    render: args => ({ template: '<button-negative-example></button-negative-example>' }),
};

export const ButtonPlain: Story = {
    render: args => ({ template: '<button-plain-example></button-plain-example>' }),
};

export const ButtonSmall: Story = {
    render: args => ({ template: '<button-small-example></button-small-example>' }),
};

export const ButtonSmallMedium: Story = {
    render: args => ({ template: '<button-small-medium-example></button-small-medium-example>' }),
};

export const ButtonWithIcon: Story = {
    render: args => ({ template: '<button-with-icon-example></button-with-icon-example>' }),
};
