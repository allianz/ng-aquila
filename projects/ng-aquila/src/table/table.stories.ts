import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { TableExamplesModule } from '../../documentation/examples/table/table-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'table',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, TableExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Table: Story = {
    render: args => ({ template: '<table-example></table-example>' }),
};

export const TableColumnHiding: Story = {
    render: args => ({ template: '<table-column-hiding-example></table-column-hiding-example>' }),
};

export const TableColumnReorder: Story = {
    render: args => ({ template: '<table-column-reorder-example></table-column-reorder-example>' }),
};

export const TableColumnResize: Story = {
    render: args => ({ template: '<table-column-resize-example></table-column-resize-example>' }),
};

export const TableCondensed: Story = {
    render: args => ({ template: '<table-condensed-example></table-condensed-example>' }),
};

export const TableExpandable: Story = {
    render: args => ({ template: '<table-expandable-example></table-expandable-example>' }),
};

export const TableFilterSortPaginate: Story = {
    render: args => ({ template: '<table-filter-sort-paginate-example></table-filter-sort-paginate-example>' }),
};

export const TableFormElements: Story = {
    render: args => ({ template: '<table-form-elements-example></table-form-elements-example>' }),
};

export const TableSelecting: Story = {
    render: args => ({ template: '<table-selecting-example></table-selecting-example>' }),
};

export const TableSingleSelect: Story = {
    render: args => ({ template: '<table-single-select-example></table-single-select-example>' }),
};

export const TableSorting: Story = {
    render: args => ({ template: '<table-sorting-example></table-sorting-example>' }),
};

export const TableSticky: Story = {
    render: args => ({ template: '<table-sticky-example></table-sticky-example>' }),
};

export const TableZebra: Story = {
    render: args => ({ template: '<table-zebra-example></table-zebra-example>' }),
};
