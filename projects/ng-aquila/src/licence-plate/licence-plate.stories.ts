import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { LicencePlateExamplesModule } from '../../documentation/examples/licence-plate/licence-plate-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'licence-plate',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, LicencePlateExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const LicencePlateDisabled: Story = {
    render: args => ({ template: '<licence-plate-disabled-example></licence-plate-disabled-example>' }),
};

export const LicencePlateEuro: Story = {
    render: args => ({ template: '<licence-plate-euro-example></licence-plate-euro-example>' }),
};

export const LicencePlateExpert: Story = {
    render: args => ({ template: '<licence-plate-expert-example></licence-plate-expert-example>' }),
};

export const LicencePlateExpertStates: Story = {
    render: args => ({ template: '<licence-plate-expert-states-example></licence-plate-expert-states-example>' }),
};

export const LicencePlateNgmodel: Story = {
    render: args => ({ template: '<licence-plate-ngmodel-example></licence-plate-ngmodel-example>' }),
};

export const LicencePlateOther: Story = {
    render: args => ({ template: '<licence-plate-other-example></licence-plate-other-example>' }),
};

export const LicencePlateReactive: Story = {
    render: args => ({ template: '<licence-plate-reactive-example></licence-plate-reactive-example>' }),
};

export const LicencePlateSeasonal: Story = {
    render: args => ({ template: '<licence-plate-seasonal-example></licence-plate-seasonal-example>' }),
};

export const LicencePlateSpecial: Story = {
    render: args => ({ template: '<licence-plate-special-example></licence-plate-special-example>' }),
};

export const LicencePlateStandard: Story = {
    render: args => ({ template: '<licence-plate-standard-example></licence-plate-standard-example>' }),
};
