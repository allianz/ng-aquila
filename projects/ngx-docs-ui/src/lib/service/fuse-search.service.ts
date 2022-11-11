import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';

import { fuseOptions } from '../../../../ngx-docs-cli/src/shared/search.constants';

@Injectable({
    providedIn: 'root',
})
export class FuseSearchService {
    private fuse: any;

    init(): Promise<boolean> {
        return new Promise(resolve => {
            Promise.all([fetch('lib-viewer/fuse-search-index.json'), fetch('lib-viewer/fuse-search-entries.json')])
                .then(async res => Promise.all(res.map(r => r.json())))
                .then(results => {
                    const searchData = {
                        index: results[0],
                        entries: results[1],
                    };
                    const myIndex = Fuse.parseIndex(searchData.index);
                    // initialize Fuse with the index
                    this.fuse = new Fuse(searchData.entries, fuseOptions, myIndex);
                    resolve(true);
                });
        });
    }

    search(term: string) {
        const results = this.fuse.search(`'${term}`);
        return results;
    }
}
