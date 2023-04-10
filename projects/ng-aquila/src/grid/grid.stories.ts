import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { GridExamplesModule } from '../../documentation/examples/grid/grid-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'grid',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, GridExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const GridAlignContent: Story = {
    render: args => ({ template: '<grid-align-content-example></grid-align-content-example>' }),
};

export const GridAlignItems: Story = {
    render: args => ({ template: '<grid-align-items-example></grid-align-items-example>' }),
};

export const GridAlignSelf: Story = {
    render: args => ({ template: '<grid-align-self-example></grid-align-self-example>' }),
};

export const GridColOrder: Story = {
    render: args => ({ template: '<grid-col-order-example></grid-col-order-example>' }),
};

export const GridInGrid: Story = {
    render: args => ({ template: '<grid-in-grid-example></grid-in-grid-example>' }),
};

export const GridJustify: Story = {
    render: args => ({ template: '<grid-justify-example></grid-justify-example>' }),
};

export const GridMaxwidth: Story = {
    render: args => ({ template: '<grid-maxwidth-example></grid-maxwidth-example>' }),
};

export const GridMultiInputs_1: Story = {
    render: args => ({ template: '<grid-multi-inputs-1-example></grid-multi-inputs-1-example>' }),
};

export const GridMultiInputs_2: Story = {
    render: args => ({ template: '<grid-multi-inputs-2-example></grid-multi-inputs-2-example>' }),
};

export const GridNogutter: Story = {
    render: args => ({ template: '<grid-nogutter-example></grid-nogutter-example>' }),
};

export const GridOffset: Story = {
    render: args => ({ template: '<grid-offset-example></grid-offset-example>' }),
};

export const GridOneInput: Story = {
    render: args => ({ template: '<grid-one-input-example></grid-one-input-example>' }),
};
