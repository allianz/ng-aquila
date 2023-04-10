import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { OverlayExamplesModule } from '../../documentation/examples/overlay/overlay-examples.module';
// imports of example components and/or example module

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'overlay',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, OverlayExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const OverlayLimitingFallbacks: Story = {
    render: args => ({ template: '<overlay-limiting-fallbacks-example></overlay-limiting-fallbacks-example>' }),
};

export const OverlayPositioning: Story = {
    render: args => ({ template: '<overlay-positioning-example></overlay-positioning-example>' }),
};
