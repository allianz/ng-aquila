import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { ModalExamplesModule } from '../../documentation/examples/modal/modal-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'modal',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, ModalExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ModalBasic: Story = {
    render: args => ({ template: '<modal-basic-example></modal-basic-example>' }),
};

export const ModalClosing: Story = {
    render: args => ({ template: '<modal-closing-example></modal-closing-example>' }),
};

export const ModalClosingBehaviour: Story = {
    render: args => ({ template: '<modal-closing-behaviour-example></modal-closing-behaviour-example>' }),
};

export const ModalContentActions: Story = {
    render: args => ({ template: '<modal-content-actions-example></modal-content-actions-example>' }),
};

export const ModalDataInjection: Story = {
    render: args => ({ template: '<modal-data-injection-example></modal-data-injection-example>' }),
};

export const ModalFixedWidth: Story = {
    render: args => ({ template: '<modal-fixed-width-example></modal-fixed-width-example>' }),
};

export const ModalOpening: Story = {
    render: args => ({ template: '<modal-opening-example></modal-opening-example>' }),
};

export const ModalWithDirection: Story = {
    render: args => ({ template: '<modal-with-direction-example></modal-with-direction-example>' }),
};
