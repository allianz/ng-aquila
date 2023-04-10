import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { BadgeExamplesModule } from '../../documentation/examples/badge/badge-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'badge',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, BadgeExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Badge: Story = {
    render: args => ({ template: '<badge-example></badge-example>' }),
};

export const BadgeVibrant: Story = {
    render: args => ({ template: '<badge-vibrant-example></badge-vibrant-example>' }),
};
