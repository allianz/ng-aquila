import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { LayoutExamplesModule } from '../../documentation/examples/layout/layout-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'layout',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, LayoutExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const HiddenClasses: Story = {
    render: args => ({ template: '<hidden-classes-example></hidden-classes-example>' }),
};

export const MarginSizes: Story = {
    render: args => ({ template: '<margin-sizes-example></margin-sizes-example>' }),
};

export const MarginUsage: Story = {
    render: args => ({ template: '<margin-usage-example></margin-usage-example>' }),
};
