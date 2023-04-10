import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { TooltipExamplesModule } from '../../documentation/examples/tooltip/tooltip-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'tooltip',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, TooltipExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const TooltipBasic: Story = {
    render: args => ({ template: '<tooltip-basic-example></tooltip-basic-example>' }),
};

export const TooltipDelay: Story = {
    render: args => ({ template: '<tooltip-delay-example></tooltip-delay-example>' }),
};

export const TooltipDisabled: Story = {
    render: args => ({ template: '<tooltip-disabled-example></tooltip-disabled-example>' }),
};

export const TooltipFallbacksTable: Story = {
    render: args => ({ template: '<tooltip-fallbacks-table-example></tooltip-fallbacks-table-example>' }),
};

export const TooltipPositions: Story = {
    render: args => ({ template: '<tooltip-positions-example></tooltip-positions-example>' }),
};

export const TooltipProgrammatic: Story = {
    render: args => ({ template: '<tooltip-programmatic-example></tooltip-programmatic-example>' }),
};

export const TooltipScrollStrategyProvider: Story = {
    render: args => ({ template: '<tooltip-scroll-strategy-provider-example></tooltip-scroll-strategy-provider-example>' }),
};

export const TooltipSettings: Story = {
    render: args => ({ template: '<tooltip-settings-example></tooltip-settings-example>' }),
};

export const TooltipTrimText: Story = {
    render: args => ({ template: '<tooltip-trim-text-example></tooltip-trim-text-example>' }),
};
