import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

// imports of example components and/or example module
import { FileUploaderExamplesModule } from '../../documentation/examples/file-uploader/file-uploader-examples.module';

const meta: Meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/7.0/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'file-uploader',
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [CommonModule, FileUploaderExamplesModule],
        }),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const FileUploaderAuto: Story = {
    render: args => ({ template: '<file-uploader-auto-example></file-uploader-auto-example>' }),
};

export const FileUploaderBasic: Story = {
    render: args => ({ template: '<file-uploader-basic-example></file-uploader-basic-example>' }),
};

export const FileUploaderCustomItem: Story = {
    render: args => ({ template: '<file-uploader-custom-item-example></file-uploader-custom-item-example>' }),
};

export const FileUploaderDropZone: Story = {
    render: args => ({ template: '<file-uploader-drop-zone-example></file-uploader-drop-zone-example>' }),
};

export const FileUploaderExpert: Story = {
    render: args => ({ template: '<file-uploader-expert-example></file-uploader-expert-example>' }),
};

export const FileUploaderIntl: Story = {
    render: args => ({ template: '<file-uploader-intl-example></file-uploader-intl-example>' }),
};

export const FileUploaderMaxFileNumber: Story = {
    render: args => ({ template: '<file-uploader-max-file-number-example></file-uploader-max-file-number-example>' }),
};

export const FileUploaderReactive: Story = {
    render: args => ({ template: '<file-uploader-reactive-example></file-uploader-reactive-example>' }),
};

export const FileUploaderSeparateRequests: Story = {
    render: args => ({ template: '<file-uploader-separate-requests-example></file-uploader-separate-requests-example>' }),
};

export const FileUploaderTemplateDriven: Story = {
    render: args => ({ template: '<file-uploader-template-driven-example></file-uploader-template-driven-example>' }),
};

export const FileUploaderTypeValidation: Story = {
    render: args => ({ template: '<file-uploader-type-validation-example></file-uploader-type-validation-example>' }),
};

export const FileUploaderValidation: Story = {
    render: args => ({ template: '<file-uploader-validation-example></file-uploader-validation-example>' }),
};

export const FileUploaderWithRequest: Story = {
    render: args => ({ template: '<file-uploader-with-request-example></file-uploader-with-request-example>' }),
};
