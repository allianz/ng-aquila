import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { HeaderExamplesModule } from '../../documentation/examples/header/header-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'header',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, HeaderExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Header: Story = {
    render: args => ({ template: '<header-example></header-example>' }),
};

export const HeaderCobranding: Story = {
    render: args => ({ template: '<header-cobranding-example></header-cobranding-example>' }),
};

export const HeaderIcons: Story = {
    render: args => ({ template: '<header-icons-example></header-icons-example>' }),
};

export const HeaderTwoRows: Story = {
    render: args => ({ template: '<header-two-rows-example></header-two-rows-example>' }),
};
