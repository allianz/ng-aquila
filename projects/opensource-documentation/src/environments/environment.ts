declare var require: any;

export const environment = {
  production: false,
  CURRENT_VERSION: require('projects/ng-aquila/src/package.json').version,
  CURRENT_CHANNEL: 'stable',
  VERSIONS: require('../../../../versions.json')
};
