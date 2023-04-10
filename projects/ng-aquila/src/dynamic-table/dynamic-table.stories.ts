import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { DynamicTableExamplesModule } from '../../documentation/examples/dynamic-table/dynamic-table-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'dynamic-table',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, DynamicTableExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const DynamicTable: Story = {
    render: args => ({ template: '<dynamic-table-example></dynamic-table-example>' }),
};

export const DynamicTableColumnOptions: Story = {
    render: args => ({ template: '<dynamic-table-column-options-example></dynamic-table-column-options-example>' }),
};

export const DynamicTableData: Story = {
    render: args => ({ template: '<dynamic-table-data-example></dynamic-table-data-example>' }),
};

export const DynamicTableEvent: Story = {
    render: args => ({ template: '<dynamic-table-event-example></dynamic-table-event-example>' }),
};

export const DynamicTableWithoutData: Story = {
    render: args => ({ template: '<dynamic-table-without-data-example></dynamic-table-without-data-example>' }),
};
