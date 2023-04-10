import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { BreadcrumbExamplesModule } from '../../documentation/examples/breadcrumb/breadcrumb-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'breadcrumb',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, BreadcrumbExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Breadcrumb: Story = {
    render: args => ({ template: '<breadcrumb-example></breadcrumb-example>' }),
};

export const BreadcrumbLink: Story = {
    render: args => ({ template: '<breadcrumb-link-example></breadcrumb-link-example>' }),
};

export const BreadcrumbNegative: Story = {
    render: args => ({ template: '<breadcrumb-negative-example></breadcrumb-negative-example>' }),
};
