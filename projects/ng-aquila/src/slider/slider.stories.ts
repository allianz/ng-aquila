import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { SliderExamplesModule } from '../../documentation/examples/slider/slider-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'slider',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SliderExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SliderBasic: Story = {
    render: args => ({ template: '<slider-basic-example></slider-basic-example>' }),
};

export const SliderDecimal: Story = {
    render: args => ({ template: '<slider-decimal-example></slider-decimal-example>' }),
};

export const SliderDefault: Story = {
    render: args => ({ template: '<slider-default-example></slider-default-example>' }),
};

export const SliderDisabled: Story = {
    render: args => ({ template: '<slider-disabled-example></slider-disabled-example>' }),
};

export const SliderInverted: Story = {
    render: args => ({ template: '<slider-inverted-example></slider-inverted-example>' }),
};

export const SliderLabel: Story = {
    render: args => ({ template: '<slider-label-example></slider-label-example>' }),
};

export const SliderLabels: Story = {
    render: args => ({ template: '<slider-labels-example></slider-labels-example>' }),
};

export const SliderNegative: Story = {
    render: args => ({ template: '<slider-negative-example></slider-negative-example>' }),
};

export const SliderReactive: Story = {
    render: args => ({ template: '<slider-reactive-example></slider-reactive-example>' }),
};

export const SliderTemplate: Story = {
    render: args => ({ template: '<slider-template-example></slider-template-example>' }),
};

export const SliderTextual: Story = {
    render: args => ({ template: '<slider-textual-example></slider-textual-example>' }),
};

export const SliderThumb: Story = {
    render: args => ({ template: '<slider-thumb-example></slider-thumb-example>' }),
};

export const SliderTick: Story = {
    render: args => ({ template: '<slider-tick-example></slider-tick-example>' }),
};
