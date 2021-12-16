declare var require: any;

export const environment = {
    CURRENT_CHANNEL: 'stable',
    CURRENT_VERSION: require('projects/ng-aquila/src/package.json').version,
    VERSIONS: require('../../../../versions.json'),
    production: true,
};
