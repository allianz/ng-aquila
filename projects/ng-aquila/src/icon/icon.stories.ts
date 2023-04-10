import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { IconExamplesModule } from '../../documentation/examples/icon/icon-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'icon',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, IconExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const IconEssentialIcons: Story = {
    render: args => ({ template: '<icon-essential-icons-example></icon-essential-icons-example>' }),
};

export const IconEssentialOverride: Story = {
    render: args => ({ template: '<icon-essential-override-example></icon-essential-override-example>' }),
};

export const IconFilled: Story = {
    render: args => ({ template: '<icon-filled-example></icon-filled-example>' }),
};

export const IconGeneral: Story = {
    render: args => ({ template: '<icon-general-example></icon-general-example>' }),
};

export const IconOutline: Story = {
    render: args => ({ template: '<icon-outline-example></icon-outline-example>' }),
};

export const IconRegistry: Story = {
    render: args => ({ template: '<icon-registry-example></icon-registry-example>' }),
};

export const IconSizes: Story = {
    render: args => ({ template: '<icon-sizes-example></icon-sizes-example>' }),
};
