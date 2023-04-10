import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata, Preview } from '@storybook/angular';
import { NxDocumentationIconModule } from 'projects/ng-aquila/src/documentation-icons/documentation-icons';

import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
    decorators: [
        moduleMetadata({
            // declarations: [NxButtonComponent, ButtonExampleComponent],
            imports: [NxDocumentationIconModule],
        }),
    ],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
