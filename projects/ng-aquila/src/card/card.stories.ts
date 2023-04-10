import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { CardExamplesModule } from '../../documentation/examples/card/card-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'card',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, CardExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Card: Story = {
    render: args => ({ template: '<card-example></card-example>' }),
};

export const SelectableCardBasic: Story = {
    render: args => ({ template: '<selectable-card-basic-example></selectable-card-basic-example>' }),
};

export const SelectableCardDynamic: Story = {
    render: args => ({ template: '<selectable-card-dynamic-example></selectable-card-dynamic-example>' }),
};

export const SelectableCardExpert: Story = {
    render: args => ({ template: '<selectable-card-expert-example></selectable-card-expert-example>' }),
};

export const SelectableCardProduct: Story = {
    render: args => ({ template: '<selectable-card-product-example></selectable-card-product-example>' }),
};

export const SelectableCardReactive: Story = {
    render: args => ({ template: '<selectable-card-reactive-example></selectable-card-reactive-example>' }),
};

export const SelectableCardStates: Story = {
    render: args => ({ template: '<selectable-card-states-example></selectable-card-states-example>' }),
};
