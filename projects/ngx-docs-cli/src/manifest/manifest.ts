import { processManifestData } from './run-manifest';

// asssemble our manifest file from the information collected in all sub tasks
function run(manifestFile) {
    return processManifestData(manifestFile);
}

export default {
    run,
};
