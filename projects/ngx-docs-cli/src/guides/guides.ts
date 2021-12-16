import { build } from './run-guides';
import * as path from 'path';

function run(source, dest) {
    return build({
        source: source,
        dest: path.resolve(dest),
    });
}

export default {
    run,
};
