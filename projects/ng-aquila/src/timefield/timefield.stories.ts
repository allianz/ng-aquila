import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { TimefieldExamplesModule } from '../../documentation/examples/timefield/timefield-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'timefield',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, TimefieldExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const TimefieldDisabled: Story = {
    render: args => ({ template: '<timefield-disabled-example></timefield-disabled-example>' }),
};

export const TimefieldFormatToggler: Story = {
    render: args => ({ template: '<timefield-format-toggler-example></timefield-format-toggler-example>' }),
};

export const TimefieldLocalize: Story = {
    render: args => ({ template: '<timefield-localize-example></timefield-localize-example>' }),
};

export const TimefieldNegative: Story = {
    render: args => ({ template: '<timefield-negative-example></timefield-negative-example>' }),
};

export const TimefieldReactive: Story = {
    render: args => ({ template: '<nx-timefield-reactive-example></nx-timefield-reactive-example>' }),
};

export const TimefieldTemplateDriven: Story = {
    render: args => ({ template: '<timefield-template-driven-example></timefield-template-driven-example>' }),
};
