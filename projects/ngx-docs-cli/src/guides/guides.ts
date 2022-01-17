import * as path from 'path';
import { build } from './run-guides';

function run(source, dest) {
    return build({
        source: source,
        dest: path.resolve(dest),
    });
}

export default {
    run,
};
