import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonExamplesModule } from 'projects/ng-aquila/documentation/examples/button/button-examples.module';

import { NxButtonComponent } from './button.component';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Button',
    decorators: [
        moduleMetadata({
            declarations: [NxButtonComponent],
            imports: [CommonModule, ButtonExamplesModule],
        }),
    ],
    // tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/angular/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: args => ({
        props: args,
        template: `<button nxButton="primary">Test</button>`,
    }),
};

export const ButtonExample: Story = {
    render: args => ({ template: `<button-example></button-example>` }),
};
