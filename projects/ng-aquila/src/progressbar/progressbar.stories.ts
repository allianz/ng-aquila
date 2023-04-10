import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ProgressbarExamplesModule } from '../../documentation/examples/progressbar/progressbar-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'progressbar',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ProgressbarExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Progressbar: Story = {
    render: args => ({ template: '<progressbar-example></progressbar-example>' }),
};

export const ProgressbarBasic: Story = {
    render: args => ({ template: '<progressbar-basic-example></progressbar-basic-example>' }),
};
