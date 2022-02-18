import PACKAGE from 'projects/ng-aquila/src/package.json';
import VERSIONS from 'versions.json';

export const environment = {
    production: true,
    CURRENT_VERSION: PACKAGE.version,
    CURRENT_CHANNEL: 'stable',
    VERSIONS,
};
