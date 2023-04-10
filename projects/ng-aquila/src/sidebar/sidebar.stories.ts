import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { SidebarExamplesModule } from '../../documentation/examples/sidebar/sidebar-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'sidebar',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SidebarExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Sidebar: Story = {
    render: args => ({ template: '<sidebar-example></sidebar-example>' }),
};

export const SidebarFooter: Story = {
    render: args => ({ template: '<sidebar-footer-example></sidebar-footer-example>' }),
};

export const SidebarMethods: Story = {
    render: args => ({ template: '<sidebar-methods-example></sidebar-methods-example>' }),
};

export const SidebarOutputs: Story = {
    render: args => ({ template: '<sidebar-outputs-example></sidebar-outputs-example>' }),
};

export const SidebarResizeable: Story = {
    render: args => ({ template: '<sidebar-resizeable-example></sidebar-resizeable-example>' }),
};
