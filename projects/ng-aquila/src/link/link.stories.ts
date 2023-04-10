import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { LinkExamplesModule } from '../../documentation/examples/link/link-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'link',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, LinkExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const LinkBlack: Story = {
    render: args => ({ template: '<link-black-example></link-black-example>' }),
};

export const LinkDefault: Story = {
    render: args => ({ template: '<link-default-example></link-default-example>' }),
};

export const LinkIcons: Story = {
    render: args => ({ template: '<link-icons-example></link-icons-example>' }),
};

export const LinkMultiple: Story = {
    render: args => ({ template: '<link-multiple-example></link-multiple-example>' }),
};

export const LinkNegative: Story = {
    render: args => ({ template: '<link-negative-example></link-negative-example>' }),
};

export const LinkSize: Story = {
    render: args => ({ template: '<link-size-example></link-size-example>' }),
};

export const LinkWithinText: Story = {
    render: args => ({ template: '<link-within-text-example></link-within-text-example>' }),
};
