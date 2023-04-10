import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { RatingExamplesModule } from '../../documentation/examples/rating/rating-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'rating',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, RatingExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const RatingAccessibility: Story = {
    render: args => ({ template: '<rating-accessibility-example></rating-accessibility-example>' }),
};

export const RatingBasic: Story = {
    render: args => ({ template: '<rating-basic-example></rating-basic-example>' }),
};

export const RatingDisabled: Story = {
    render: args => ({ template: '<rating-disabled-example></rating-disabled-example>' }),
};

export const RatingNegative: Story = {
    render: args => ({ template: '<rating-negative-example></rating-negative-example>' }),
};

export const RatingReactive: Story = {
    render: args => ({ template: '<rating-reactive-example></rating-reactive-example>' }),
};

export const RatingSimple: Story = {
    render: args => ({ template: '<rating-simple-example></rating-simple-example>' }),
};

export const RatingSizes: Story = {
    render: args => ({ template: '<rating-sizes-example></rating-sizes-example>' }),
};

export const RatingTemplate: Story = {
    render: args => ({ template: '<rating-template-example></rating-template-example>' }),
};
