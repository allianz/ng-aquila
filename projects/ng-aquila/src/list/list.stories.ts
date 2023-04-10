import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ListExamplesModule } from '../../documentation/examples/list/list-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'list',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ListExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ListCircles: Story = {
    render: args => ({ template: '<list-circles-example></list-circles-example>' }),
};

export const ListCopytext: Story = {
    render: args => ({ template: '<list-copytext-example></list-copytext-example>' }),
};

export const ListCustomColor: Story = {
    render: args => ({ template: '<list-custom-color-example></list-custom-color-example>' }),
};

export const ListIcons: Story = {
    render: args => ({ template: '<list-icons-example></list-icons-example>' }),
};

export const ListNegative: Story = {
    render: args => ({ template: '<list-negative-example></list-negative-example>' }),
};

export const ListNesting: Story = {
    render: args => ({ template: '<list-nesting-example></list-nesting-example>' }),
};

export const ListOrdered: Story = {
    render: args => ({ template: '<list-ordered-example></list-ordered-example>' }),
};

export const ListUnordered: Story = {
    render: args => ({ template: '<list-unordered-example></list-unordered-example>' }),
};
