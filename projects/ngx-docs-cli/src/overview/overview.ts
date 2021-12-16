import { build } from './run-overview';
import * as path from 'path';

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
