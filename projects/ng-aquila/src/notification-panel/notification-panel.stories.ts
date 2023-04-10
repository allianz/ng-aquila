import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { NotificationPanelExamplesModule } from '../../documentation/examples/notification-panel/notification-panel-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'notification-panel',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, NotificationPanelExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const NotificationPanelActions: Story = {
    render: args => ({ template: '<notification-panel-actions-example></notification-panel-actions-example>' }),
};

export const NotificationPanelClickable: Story = {
    render: args => ({ template: '<notification-panel-clickable-example></notification-panel-clickable-example>' }),
};

export const NotificationPanelMixed: Story = {
    render: args => ({ template: '<notification-panel-mixed-example></notification-panel-mixed-example>' }),
};

export const NotificationPanelScrollStrategyProvider: Story = {
    render: args => ({ template: '<notification-panel-scroll-strategy-provider-example></notification-panel-scroll-strategy-provider-example>' }),
};
