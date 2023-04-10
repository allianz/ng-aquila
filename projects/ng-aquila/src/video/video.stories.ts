import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { VideoExamplesModule } from '../../documentation/examples/video/video-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'video',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, VideoExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Video: Story = {
    render: args => ({ template: '<video-example></video-example>' }),
};

export const VideoAdvanced: Story = {
    render: args => ({ template: '<video-advanced-example></video-advanced-example>' }),
};

export const VideoCustom: Story = {
    render: args => ({ template: '<video-custom-example></video-custom-example>' }),
};
