import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { FooterExamplesModule } from '../../documentation/examples/footer/footer-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'footer',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, FooterExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const FooterBasic: Story = {
    render: args => ({ template: '<footer-basic-example></footer-basic-example>' }),
};

export const FooterDefaultCopyright: Story = {
    render: args => ({ template: '<footer-default-copyright-example></footer-default-copyright-example>' }),
};
