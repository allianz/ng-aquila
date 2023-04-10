import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { TaglistExamplesModule } from '../../documentation/examples/taglist/taglist-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'taglist',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, TaglistExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Taglist: Story = {
    render: args => ({ template: '<taglist-example></taglist-example>' }),
};

export const TaglistA11y: Story = {
    render: args => ({ template: '<taglist-a11y-example></taglist-a11y-example>' }),
};

export const TaglistBasic: Story = {
    render: args => ({ template: '<taglist-basic-example></taglist-basic-example>' }),
};

export const TaglistDelete: Story = {
    render: args => ({ template: '<taglist-delete-example></taglist-delete-example>' }),
};

export const TaglistFormatter: Story = {
    render: args => ({ template: '<taglist-formatter-example></taglist-formatter-example>' }),
};

export const TaglistKeyword: Story = {
    render: args => ({ template: '<taglist-keyword-example></taglist-keyword-example>' }),
};

export const TaglistObjects: Story = {
    render: args => ({ template: '<taglist-objects-example></taglist-objects-example>' }),
};

export const TaglistOutput: Story = {
    render: args => ({ template: '<taglist-output-example></taglist-output-example>' }),
};

export const TaglistReactive: Story = {
    render: args => ({ template: '<taglist-reactive-example></taglist-reactive-example>' }),
};

export const TaglistTemplatedriven: Story = {
    render: args => ({ template: '<taglist-templatedriven-example></taglist-templatedriven-example>' }),
};
