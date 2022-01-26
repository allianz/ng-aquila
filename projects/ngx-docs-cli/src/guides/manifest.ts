import { basename, extname } from 'path';
import { pipe } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { MarkdownFile } from '../shared/markdown-file';

// Generate a json with all component folders we found in lib/
// This will work as our our grouping in the viewer navigation
export const manifest = ({ key }) =>
    pipe(
        map((file: MarkdownFile) => {
            let attributes = file.yaml;
            const defaultID = basename(file.filename, extname(file.filename));

            // establish some defaults then assign what is given by frontmatter
            attributes = {
                id: defaultID,
                title: defaultID,
                file: `lib-viewer/guides/${defaultID}.html`,
                ...attributes,
            };

            return attributes;
        }),
        toArray(),
        // map the data to the specified key,
        // this way we can easily combine the data in the manifest step processing
        // all those manifest sub steps.
        map(value => ({ [key]: value })),
    );
