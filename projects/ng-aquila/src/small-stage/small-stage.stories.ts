import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { SmallStageExamplesModule } from '../../documentation/examples/small-stage/small-stage-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'small-stage',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, SmallStageExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SmallStageContentVariation: Story = {
    render: args => ({ template: '<small-stage-content-variation-example></small-stage-content-variation-example>' }),
};

export const SmallStageDefault: Story = {
    render: args => ({ template: '<small-stage-default-example></small-stage-default-example>' }),
};

export const SmallStageExpertContentNarrow: Story = {
    render: args => ({ template: '<small-stage-expert-content-narrow-example></small-stage-expert-content-narrow-example>' }),
};

export const SmallStageExpertDefault: Story = {
    render: args => ({ template: '<small-stage-expert-default-example></small-stage-expert-default-example>' }),
};

export const SmallStageWBg: Story = {
    render: args => ({ template: '<small-stage-w-bg-example></small-stage-w-bg-example>' }),
};

export const SmallStageWHeader: Story = {
    render: args => ({ template: '<small-stage-w-header-example></small-stage-w-header-example>' }),
};
