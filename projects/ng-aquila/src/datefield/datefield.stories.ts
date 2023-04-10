import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { DatefieldExamplesModule } from '../../documentation/examples/datefield/datefield-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'datefield',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, DatefieldExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const DatefieldBasic: Story = {
    render: args => ({ template: '<datefield-basic-example></datefield-basic-example>' }),
};

export const DatefieldDisabled: Story = {
    render: args => ({ template: '<datefield-disabled-example></datefield-disabled-example>' }),
};

export const DatefieldFilter: Story = {
    render: args => ({ template: '<datefield-filter-example></datefield-filter-example>' }),
};

export const DatefieldFormatInjection: Story = {
    render: args => ({ template: '<datefield-format-injection-example></datefield-format-injection-example>' }),
};

export const DatefieldFormatting: Story = {
    render: args => ({ template: '<datefield-formatting-example></datefield-formatting-example>' }),
};

export const DatefieldInjectionToken: Story = {
    render: args => ({ template: '<datefield-injection-token-example></datefield-injection-token-example>' }),
};

export const DatefieldIso: Story = {
    render: args => ({ template: '<datefield-iso-example></datefield-iso-example>' }),
};

export const DatefieldLocalizeDate: Story = {
    render: args => ({ template: '<datefield-localize-date-example></datefield-localize-date-example>' }),
};

export const DatefieldLocalizeTexts: Story = {
    render: args => ({ template: '<datefield-localize-texts-example></datefield-localize-texts-example>' }),
};

export const DatefieldManual: Story = {
    render: args => ({ template: '<datefield-manual-example></datefield-manual-example>' }),
};

export const DatefieldMinMax: Story = {
    render: args => ({ template: '<datefield-min-max-example></datefield-min-max-example>' }),
};

export const DatefieldParsing: Story = {
    render: args => ({ template: '<datefield-parsing-example></datefield-parsing-example>' }),
};

export const DatefieldRange: Story = {
    render: args => ({ template: '<datefield-range-example></datefield-range-example>' }),
};

export const DatefieldReactive: Story = {
    render: args => ({ template: '<datefield-reactive-example></datefield-reactive-example>' }),
};

export const DatefieldScrollStrategyProvider: Story = {
    render: args => ({ template: '<datefield-scroll-strategy-provider-example></datefield-scroll-strategy-provider-example>' }),
};

export const DatefieldStartview: Story = {
    render: args => ({ template: '<datefield-startview-example></datefield-startview-example>' }),
};

export const DatefieldToggleFocus: Story = {
    render: args => ({ template: '<datefield-toggle-focus-example></datefield-toggle-focus-example>' }),
};
