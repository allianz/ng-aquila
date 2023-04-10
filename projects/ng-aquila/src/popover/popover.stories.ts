import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { PopoverExamplesModule } from '../../documentation/examples/popover/popover-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'popover',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, PopoverExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const PopoverClickOutside: Story = {
    render: args => ({ template: '<popover-click-outside-example></popover-click-outside-example>' }),
};

export const PopoverCustom: Story = {
    render: args => ({ template: '<popover-custom-example></popover-custom-example>' }),
};

export const PopoverHover: Story = {
    render: args => ({ template: '<popover-hover-example></popover-hover-example>' }),
};

export const PopoverI18n: Story = {
    render: args => ({ template: '<popover-i18n-example></popover-i18n-example>' }),
};

export const PopoverLazyload: Story = {
    render: args => ({ template: '<popover-lazyload-example></popover-lazyload-example>' }),
};

export const PopoverModal: Story = {
    render: args => ({ template: '<popover-modal-example></popover-modal-example>' }),
};

export const PopoverPositioning: Story = {
    render: args => ({ template: '<popover-positioning-example></popover-positioning-example>' }),
};

export const PopoverScroll: Story = {
    render: args => ({ template: '<popover-scroll-example></popover-scroll-example>' }),
};

export const PopoverScrollStrategyProvider: Story = {
    render: args => ({ template: '<popover-scroll-strategy-provider-example></popover-scroll-strategy-provider-example>' }),
};

export const PopoverScrollable: Story = {
    render: args => ({ template: '<popover-scrollable-example></popover-scrollable-example>' }),
};

export const PopoverTable: Story = {
    render: args => ({ template: '<popover-table-example></popover-table-example>' }),
};

export const PopoverTrigger: Story = {
    render: args => ({ template: '<popover-trigger-example></popover-trigger-example>' }),
};
