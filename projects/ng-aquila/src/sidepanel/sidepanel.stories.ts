import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { SidepanelExamplesModule } from '../../documentation/examples/sidepanel/sidepanel-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'sidepanel',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SidepanelExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SidepanelDark: Story = {
    render: args => ({ template: '<sidepanel-dark-example></sidepanel-dark-example>' }),
};

export const SidepanelFloating: Story = {
    render: args => ({ template: '<sidepanel-floating-example></sidepanel-floating-example>' }),
};

export const SidepanelFocus: Story = {
    render: args => ({ template: '<sidepanel-focus-example></sidepanel-focus-example>' }),
};

export const SidepanelLight: Story = {
    render: args => ({ template: '<sidepanel-light-example></sidepanel-light-example>' }),
};

export const SidepanelStatic: Story = {
    render: args => ({ template: '<sidepanel-static-example></sidepanel-static-example>' }),
};

export const SidepanelWithTabs: Story = {
    render: args => ({ template: '<sidepanel-with-tabs-example></sidepanel-with-tabs-example>' }),
};
