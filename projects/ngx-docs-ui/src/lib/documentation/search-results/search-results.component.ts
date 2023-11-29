import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { FuseSearchService } from '../../service/fuse-search.service';

@Component({
    selector: 'nxv-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
})
export class NxvSearchResultsComponent implements OnInit, OnDestroy {
    maxEntriesPerCategory = 15;
    searchTerm = '';
    initializing = false;
    searchResults: any;
    initReady$ = new BehaviorSubject(false);
    searchChanged$ = new BehaviorSubject('');
    private readonly _destroyed = new Subject<void>();

    _searchInput = '';
    @Input() set searchInput(value: string) {
        this._searchInput = value;
        this.searchChanged$.next(value);
    }

    get searchInput() {
        return this._searchInput;
    }

    constructor(
        private readonly activeRoute: ActivatedRoute,
        private readonly fuseSearch: FuseSearchService,
    ) {}

    ngOnInit() {
        this.initSearch();
    }

    initSearch(): void {
        this.initializing = true;
        this.fuseSearch.init().then(() => {
            this.initReady$.next(true);
        });

        this.initReady$
            .pipe(
                takeUntil(this._destroyed),
                filter(status => status),
                switchMap(() => this.activeRoute.params),
            )
            .subscribe(params => {
                this.searchTerm = params.term;
                this.searchResults = this.groupResults(this.fuseSearch.search(params.term));
            });
    }

    groupResults(entries: any[]) {
        const data: any = {};
        for (const entry of entries) {
            const item = entry.item;
            if (!data[item?.searchDisplayType]) {
                data[item.searchDisplayType] = { entries: [], total: 0 };
            } else if (data[item.searchDisplayType].entries.length === this.maxEntriesPerCategory) {
                data[item.searchDisplayType].total++;
                continue;
            }
            data[item.searchDisplayType].entries.push(entry);
            data[item.searchDisplayType].total++;
        }
        return data;
    }

    getApiBadge(type: string) {
        switch (type) {
            case 'directive':
                return 'active';
            case 'component':
                return 'positive';
            case 'service':
                return 'critical';
            case 'interface':
                return 'negative';
            default:
                return '';
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
