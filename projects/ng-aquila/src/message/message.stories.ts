import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { MessageExamplesModule } from '../../documentation/examples/message/message-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'message',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, MessageExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const MessageBanner: Story = {
    render: args => ({ template: '<message-banner-example></message-banner-example>' }),
};

export const MessageClosable: Story = {
    render: args => ({ template: '<message-closable-example></message-closable-example>' }),
};

export const MessageError: Story = {
    render: args => ({ template: '<message-error-example></message-error-example>' }),
};

export const MessageInfo: Story = {
    render: args => ({ template: '<message-info-example></message-info-example>' }),
};

export const MessageSuccess: Story = {
    render: args => ({ template: '<message-success-example></message-success-example>' }),
};

export const MessageToastCustomSettings: Story = {
    render: args => ({ template: '<message-toast-custom-settings-example></message-toast-custom-settings-example>' }),
};

export const MessageToastOpening: Story = {
    render: args => ({ template: '<message-toast-opening-example></message-toast-opening-example>' }),
};

export const MessageWarning: Story = {
    render: args => ({ template: '<message-warning-example></message-warning-example>' }),
};
