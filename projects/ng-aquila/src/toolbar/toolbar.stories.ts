import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ToolbarExamplesModule } from '../../documentation/examples/toolbar/toolbar-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'toolbar',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ToolbarExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Toolbar: Story = {
    render: args => ({ template: '<toolbar-example></toolbar-example>' }),
};

export const ToolbarPositioningContent: Story = {
    render: args => ({ template: '<toolbar-positioning-content-example></toolbar-positioning-content-example>' }),
};
