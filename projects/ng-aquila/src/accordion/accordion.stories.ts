import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { AccordionExamplesModule } from '../../documentation/examples/accordion/accordion-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'accordion',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, AccordionExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Accordion: Story = {
    render: args => ({ template: '<accordion-example></accordion-example>' }),
};

export const AccordionError: Story = {
    render: args => ({ template: '<accordion-error-example></accordion-error-example>' }),
};

export const AccordionExtraLight: Story = {
    render: args => ({ template: '<accordion-extra-light-example></accordion-extra-light-example>' }),
};

export const AccordionExtraLightNegative: Story = {
    render: args => ({ template: '<accordion-extra-light-negative-example></accordion-extra-light-negative-example>' }),
};

export const AccordionLazy: Story = {
    render: args => ({ template: '<accordion-lazy-example></accordion-lazy-example>' }),
};

export const AccordionLight: Story = {
    render: args => ({ template: '<accordion-light-example></accordion-light-example>' }),
};

export const AccordionLightNegative: Story = {
    render: args => ({ template: '<accordion-light-negative-example></accordion-light-negative-example>' }),
};

export const AccordionMulti: Story = {
    render: args => ({ template: '<accordion-multi-example></accordion-multi-example>' }),
};

export const AccordionNegative: Story = {
    render: args => ({ template: '<accordion-negative-example></accordion-negative-example>' }),
};

export const AccordionStandalone: Story = {
    render: args => ({ template: '<accordion-standalone-example></accordion-standalone-example>' }),
};
