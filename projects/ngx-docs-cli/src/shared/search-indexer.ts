import * as fs from 'fs';

import { fuseOptions, SearchDisplayType } from './search.constants';

const Fuse = require('fuse.js');

const mapComponent = (type?: string) => comp => {
    // set display type
    comp.searchDisplayType = type || SearchDisplayType.COMPONENT;

    return comp;
};

const mapApi = type => v =>
    v[type].map(attr => ({
        id: v.id,
        ...attr,
        searchDisplayType: 'api',
        type,
    }));

export const buildSearchIndex = ({ manifest, guides }) => {
    const manifestJson = JSON.parse(fs.readFileSync(manifest).toString());
    const guidesJson = JSON.parse(fs.readFileSync(guides).toString());
    const basePath = manifest.replace('manifest.json', '');

    const directive = manifestJson.api.flatMap(mapApi(SearchDisplayType.DIRECTIVE));
    const component = manifestJson.api.flatMap(mapApi(SearchDisplayType.COMPONENT));
    const services = manifestJson.api.flatMap(mapApi(SearchDisplayType.SERVICES));
    const interfaces = manifestJson.api.flatMap(mapApi(SearchDisplayType.INTERFACE));
    const typeAlias = manifestJson.api.flatMap(mapApi(SearchDisplayType.TYPE_ALIAS));
    const classes = manifestJson.api.flatMap(mapApi(SearchDisplayType.CLASSES));
    const ngModule = manifestJson.api.map(v => ({
        id: v.id,
        name: v.ngModule,
        type: SearchDisplayType.NG_MODULE,
        searchDisplayType: 'api',
    }));

    const searchEntries = [
        ...manifestJson.components.map(mapComponent()),
        ...manifestJson.examples.map(mapComponent(SearchDisplayType.EXAMPLE)),
        ...directive,
        ...component,
        ...services,
        ...interfaces,
        ...typeAlias,
        ...ngModule,
        ...classes,
        // ...manifestJson.plugins.map(mapComponent),
        ...manifestJson.guides.map(guide => {
            guide.content = guidesJson.find(g => g.id === guide.id).content;
            guide.searchDisplayType = SearchDisplayType.GUIDE;
            return guide;
        }),
    ];

    const searchIndex = Fuse.createIndex(fuseOptions.keys, searchEntries);
    // Serialize and save it
    fs.writeFileSync(basePath + 'fuse-search-index.json', JSON.stringify(searchIndex));
    fs.writeFileSync(basePath + 'fuse-search-entries.json', JSON.stringify(searchEntries));
};
