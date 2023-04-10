import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { DropdownExamplesModule } from '../../documentation/examples/dropdown/dropdown-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'dropdown',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, DropdownExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const DropdownCustomLabel: Story = {
    render: args => ({ template: '<dropdown-custom-label-example></dropdown-custom-label-example>' }),
};

export const DropdownDisabledItems: Story = {
    render: args => ({ template: '<dropdown-disabled-items-example></dropdown-disabled-items-example>' }),
};

export const DropdownFilter: Story = {
    render: args => ({ template: '<dropdown-filter-example></dropdown-filter-example>' }),
};

export const DropdownFilterCustom: Story = {
    render: args => ({ template: '<dropdown-filter-custom-example></dropdown-filter-custom-example>' }),
};

export const DropdownFocusOut: Story = {
    render: args => ({ template: '<dropdown-focus-out-example></dropdown-focus-out-example>' }),
};

export const DropdownGroup: Story = {
    render: args => ({ template: '<dropdown-group-example></dropdown-group-example>' }),
};

export const DropdownLazy: Story = {
    render: args => ({ template: '<dropdown-lazy-example></dropdown-lazy-example>' }),
};

export const DropdownMultiSelect: Story = {
    render: args => ({ template: '<dropdown-multi-select-example></dropdown-multi-select-example>' }),
};

export const DropdownNegative: Story = {
    render: args => ({ template: '<dropdown-negative-example></dropdown-negative-example>' }),
};

export const DropdownOutline: Story = {
    render: args => ({ template: '<dropdown-outline-example></dropdown-outline-example>' }),
};

export const DropdownPlaceholder: Story = {
    render: args => ({ template: '<dropdown-placeholder-example></dropdown-placeholder-example>' }),
};

export const DropdownReactive: Story = {
    render: args => ({ template: '<dropdown-reactive-example></dropdown-reactive-example>' }),
};

export const DropdownRenderingItems: Story = {
    render: args => ({ template: '<dropdown-rendering-items-example></dropdown-rendering-items-example>' }),
};

export const DropdownScrollStrategyProvider: Story = {
    render: args => ({ template: '<dropdown-scroll-strategy-provider-example></dropdown-scroll-strategy-provider-example>' }),
};

export const DropdownSimpleBinding: Story = {
    render: args => ({ template: '<dropdown-simple-binding-example></dropdown-simple-binding-example>' }),
};

export const DropdownStandard: Story = {
    render: args => ({ template: '<dropdown-standard-example></dropdown-standard-example>' }),
};

export const DropdownTemplateDriven: Story = {
    render: args => ({ template: '<dropdown-template-driven-example></dropdown-template-driven-example>' }),
};

export const MultiSelect: Story = {
    render: args => ({ template: '<multi-select-example></multi-select-example>' }),
};

export const MultiSelectIntl: Story = {
    render: args => ({ template: '<multi-select-intl-example></multi-select-intl-example>' }),
};
