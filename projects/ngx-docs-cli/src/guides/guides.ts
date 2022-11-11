import * as path from 'path';

import { build } from './run-guides';

function run(source, dest, searchDest) {
    return build({
        source,
        dest: path.resolve(dest),
        searchDest,
    });
}

export default {
    run,
};
