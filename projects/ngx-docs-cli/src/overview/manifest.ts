import { basename, dirname } from 'path';
import { pipe } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { MarkdownFile } from '../shared/markdown-file';

const DEFAULT_CATEGORY = 'none';

// Generate a json with all component folders we found in lib/
// This will work as our our grouping in the viewer navigation
export const manifest = ({ key }) =>
    pipe(
        map((file: MarkdownFile) => {
            let attributes = file.yaml;
            const id = basename(dirname(file.filename));

            // establish some defaults then assign what is given by frontmatter
            attributes = {
                id,
                title: id,
                examples: file.examples,
                category: DEFAULT_CATEGORY,
                apiFile: `lib-viewer/api/${id}.html`,
                overviewFile: `lib-viewer/overview/${id}.html`,
                ...attributes,
            };

            return attributes;
        }),
        toArray(),
        map(value => ({ [key]: value })),
    );
