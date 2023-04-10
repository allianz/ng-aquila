import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ComparisonTableExamplesModule } from '../../documentation/examples/comparison-table/comparison-table-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'comparison-table',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ComparisonTableExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const BreakdownTable: Story = {
    render: args => ({ template: '<breakdown-table-example></breakdown-table-example>' }),
};

export const BreakdownTableExpert: Story = {
    render: args => ({ template: '<breakdown-table-expert-example></breakdown-table-expert-example>' }),
};

export const ComparisonTable: Story = {
    render: args => ({ template: '<comparison-table-example></comparison-table-example>' }),
};

export const ComparisonTableDisabledColumns: Story = {
    render: args => ({ template: '<comparison-table-disabled-columns-example></comparison-table-disabled-columns-example>' }),
};

export const ComparisonTableDynamic: Story = {
    render: args => ({ template: '<comparison-table-dynamic-example></comparison-table-dynamic-example>' }),
};

export const ComparisonTableExpandableArea: Story = {
    render: args => ({ template: '<comparison-table-expandable-area-example></comparison-table-expandable-area-example>' }),
};

export const ComparisonTableFormElements: Story = {
    render: args => ({ template: '<comparison-table-form-elements-example></comparison-table-form-elements-example>' }),
};

export const ComparisonTableHiddenColumns: Story = {
    render: args => ({ template: '<nx-comparison-table-hidden-columns-example></nx-comparison-table-hidden-columns-example>' }),
};

export const ComparisonTableNonStickyHeader: Story = {
    render: args => ({ template: '<comparison-table-example-non-sticky-header></comparison-table-example-non-sticky-header>' }),
};

export const ComparisonTableRowGroup: Story = {
    render: args => ({ template: '<comparison-table-row-group-example></comparison-table-row-group-example>' }),
};

export const ComparisonTableStatic: Story = {
    render: args => ({ template: '<comparison-table-static-example></comparison-table-static-example>' }),
};

export const ComparisonTableWithIntersection: Story = {
    render: args => ({ template: '<comparison-table-with-intersection-example></comparison-table-with-intersection-example>' }),
};

export const ComparisonTableWithToggleSections: Story = {
    render: args => ({ template: '<comparison-table-with-toggle-sections-example></comparison-table-with-toggle-sections-example>' }),
};

export const RecommendationTable: Story = {
    render: args => ({ template: '<recommendation-table-example></recommendation-table-example>' }),
};

export const RecommendationTableExpert: Story = {
    render: args => ({ template: '<recommendation-table-expert-example></recommendation-table-expert-example>' }),
};
