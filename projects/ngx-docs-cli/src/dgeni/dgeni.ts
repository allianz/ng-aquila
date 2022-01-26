import * as path from 'path';

import { build } from './run-dgeni';

function run(source, dest) {
    return build({
        source: path.resolve(source),
        dest: path.resolve(dest),
    });
}

export default {
    run,
};
