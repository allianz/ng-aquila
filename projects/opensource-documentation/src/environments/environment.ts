import PACKAGE from 'projects/ng-aquila/src/package.json';
import VERSIONS from 'versions.json';

export const environment = {
    production: false,
    CURRENT_VERSION: PACKAGE.version,
    CURRENT_CHANNEL: 'stable',
    VERSIONS,
};
