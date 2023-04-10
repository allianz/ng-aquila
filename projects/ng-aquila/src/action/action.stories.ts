import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ActionExamplesModule } from '../../documentation/examples/action/action-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'action',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ActionExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Action: Story = {
    render: args => ({ template: '<action-example></action-example>' }),
};

export const ActionIndicator: Story = {
    render: args => ({ template: '<action-indicator-example></action-indicator-example>' }),
};

export const ActionWithRouter: Story = {
    render: args => ({ template: '<action-with-router-example></action-with-router-example>' }),
};
