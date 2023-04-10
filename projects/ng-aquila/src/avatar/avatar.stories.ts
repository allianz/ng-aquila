import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { AvatarExamplesModule } from '../../documentation/examples/avatar/avatar-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'avatar',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, AvatarExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Avatar: Story = {
    render: args => ({ template: '<avatar-example></avatar-example>' }),
};

export const AvatarButton: Story = {
    render: args => ({ template: '<avatar-button-example></avatar-button-example>' }),
};

export const AvatarColors: Story = {
    render: args => ({ template: '<avatar-colors-example></avatar-colors-example>' }),
};

export const AvatarSize: Story = {
    render: args => ({ template: '<avatar-colors-example></avatar-colors-example>' }),
};
