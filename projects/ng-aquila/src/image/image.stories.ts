import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ImageExamplesModule } from '../../documentation/examples/image/image-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'image',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ImageExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ImageAttribute: Story = {
    render: args => ({ template: '<image-attribute-example></image-attribute-example>' }),
};

export const ImageDefault: Story = {
    render: args => ({ template: '<image-default-example></image-default-example>' }),
};

export const ImageFixedRatios: Story = {
    render: args => ({ template: '<image-fixed-ratios-example></image-fixed-ratios-example>' }),
};

export const ImageRounded: Story = {
    render: args => ({ template: '<image-rounded-example></image-rounded-example>' }),
};
