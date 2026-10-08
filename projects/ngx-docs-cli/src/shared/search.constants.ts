export enum SearchDisplayType {
  GUIDE = 'guide',
  COMPONENT = 'component',
  GENERAL = 'general',
  EXAMPLE = 'example',
  DIRECTIVE = 'directive',
  SERVICES = 'services',
  CLASSES = 'classes',
  INTERFACE = 'interface',
  TYPE_ALIAS = 'typeAlias',
  NG_MODULE = 'ngModule',
}

export const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: true,
  // shouldSort: true,
  // findAllMatches: false,
  // report which key matched, so a result can show why it is listed
  includeMatches: true,
  minMatchCharLength: 4,
  // location: 0,
  threshold: 0.6,
  // distance: 100,
  useExtendedSearch: true,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  keys: [
    'id',
    'examples',
    'category',
    'title',
    'name',
    // guide specific
    'content',

    // component specific
    'alias',
    'directiveSelectors',
    'directiveExportAs',
    'inputs',
    'outputs',
    'group',
  ],
};
