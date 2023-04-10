import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { MenuExamplesModule } from '../../documentation/examples/menu/menu-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'menu',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, MenuExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Menu: Story = {
    render: args => ({ template: '<menu-example></menu-example>' }),
};

export const MenuButton: Story = {
    render: args => ({ template: '<menu-button-example></menu-button-example>' }),
};

export const MenuItem: Story = {
    render: args => ({ template: '<menu-item-example></menu-item-example>' }),
};

export const MenuItemWithIcons: Story = {
    render: args => ({ template: '<menu-item-with-icons-example></menu-item-with-icons-example>' }),
};

export const MenuLink: Story = {
    render: args => ({ template: '<menu-link-example></menu-link-example>' }),
};
