import * as path from 'path';
import { build } from './run-overview';

function run(source, dest, { ignorePrivateExamples }) {
    return build({
        source: path.resolve(source),
        dest: path.resolve(dest),
        ignorePrivateExamples: ignorePrivateExamples,
    });
}

export default {
    run,
};
