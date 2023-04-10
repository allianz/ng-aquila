import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { TabsExamplesModule } from '../../documentation/examples/tabs/tabs-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'tabs',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, TabsExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const TabsAppearance: Story = {
    render: args => ({ template: '<tabs-appearance-example></tabs-appearance-example>' }),
};

export const TabsAutoManualSelect: Story = {
    render: args => ({ template: '<tabs-auto-manual-select-example></tabs-auto-manual-select-example>' }),
};

export const TabsBasic: Story = {
    render: args => ({ template: '<tabs-basic-example></tabs-basic-example>' }),
};

export const TabsDisabled: Story = {
    render: args => ({ template: '<tabs-disabled-example></tabs-disabled-example>' }),
};

export const TabsDynamic: Story = {
    render: args => ({ template: '<tabs-dynamic-example></tabs-dynamic-example>' }),
};

export const TabsInjectionToken: Story = {
    render: args => ({ template: '<tabs-injection-token-example></tabs-injection-token-example>' }),
};

export const TabsLazy: Story = {
    render: args => ({ template: '<tabs-lazy-example></tabs-lazy-example>' }),
};

export const TabsNavBar: Story = {
    render: args => ({ template: '<tabs-nav-bar-example></tabs-nav-bar-example>' }),
};

export const TabsNavBarAppearance: Story = {
    render: args => ({ template: '<tabs-nav-bar-appearance-example></tabs-nav-bar-appearance-example>' }),
};

export const TabsNavBarInjectionToken: Story = {
    render: args => ({ template: '<tabs-nav-bar-injection-token-example></tabs-nav-bar-injection-token-example>' }),
};

export const TabsNavBarWithIndicator: Story = {
    render: args => ({ template: '<tabs-nav-bar-with-indicator-example></tabs-nav-bar-with-indicator-example>' }),
};

export const TabsNegative: Story = {
    render: args => ({ template: '<tabs-negative-example></tabs-negative-example>' }),
};

export const TabsOutputEvents: Story = {
    render: args => ({ template: '<tabs-output-events-example></tabs-output-events-example>' }),
};

export const TabsResponsive: Story = {
    render: args => ({ template: '<tabs-responsive-example></tabs-responsive-example>' }),
};

export const TabsStyling: Story = {
    render: args => ({ template: '<tabs-styling-example></tabs-styling-example>' }),
};

export const TabsTemplate: Story = {
    render: args => ({ template: '<tabs-template-example></tabs-template-example>' }),
};

export const TabsWithIndicator: Story = {
    render: args => ({ template: '<tabs-with-indicator-example></tabs-with-indicator-example>' }),
};
