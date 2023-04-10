import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ContextMenuExamplesModule } from '../../documentation/examples/context-menu/context-menu-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'context-menu',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ContextMenuExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ContextMenuBasic: Story = {
    render: args => ({ template: '<context-menu-basic-example></context-menu-basic-example>' }),
};

export const ContextMenuCursorMode: Story = {
    render: args => ({ template: '<context-menu-cursor-mode-example></context-menu-cursor-mode-example>' }),
};

export const ContextMenuData: Story = {
    render: args => ({ template: '<context-menu-data-example></context-menu-data-example>' }),
};

export const ContextMenuDisabled: Story = {
    render: args => ({ template: '<context-menu-disabled-example></context-menu-disabled-example>' }),
};

export const ContextMenuIcons: Story = {
    render: args => ({ template: '<context-menu-icons-example></context-menu-icons-example>' }),
};

export const ContextMenuIndicator: Story = {
    render: args => ({ template: '<context-menu-indicator-example></context-menu-indicator-example>' }),
};

export const ContextMenuLazy: Story = {
    render: args => ({ template: '<context-menu-lazy-example></context-menu-lazy-example>' }),
};

export const ContextMenuNested: Story = {
    render: args => ({ template: '<context-menu-nested-example></context-menu-nested-example>' }),
};

export const ContextMenuProgrammatic: Story = {
    render: args => ({ template: '<context-menu-programmatic-example></context-menu-programmatic-example>' }),
};

export const ContextMenuScrollStrategy: Story = {
    render: args => ({ template: '<context-menu-scroll-strategy-example></context-menu-scroll-strategy-example>' }),
};

export const ContextMenuScrollStrategyProvider: Story = {
    render: args => ({ template: '<context-menu-scroll-strategy-provider-example></context-menu-scroll-strategy-provider-example>' }),
};

export const ContextMenuSelectMultiple: Story = {
    render: args => ({ template: '<context-menu-selecti-multiple-example></context-menu-selecti-multiple-example>' }),
};

export const ContextMenuSelection: Story = {
    render: args => ({ template: '<context-menu-selection-example></context-menu-selection-example>' }),
};
