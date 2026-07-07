import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxAccentColorComponent } from '@allianz/ng-aquila/text';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { FuseSearchService } from '../../service/fuse-search.service';
import { NxvComponentIconComponent } from '../component-icon/component-icon.component';

@Component({
  selector: 'nxv-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CdkScrollable,
    NxGridModule,
    NxLinkModule,
    NxBadgeModule,
    AsyncPipe,
    RouterModule,
    NxvComponentIconComponent,
    NxAccentColorComponent,
  ],
})
export class NxvSearchResultsComponent implements OnInit, OnDestroy {
  maxEntriesPerCategory = 15;
  readonly searchTerm = signal('');
  initializing = false;
  readonly searchResults = signal<any>(null);
  readonly componentGroups = computed(() => {
    const entries: any[] = this.searchResults()?.component?.entries ?? [];
    const groups = entries.reduce<{ [key: string]: any[] }>((acc, entry) => {
      const groupValue = entry.item.group;
      const groupKeys: string[] = Array.isArray(groupValue)
        ? groupValue.length > 0
          ? groupValue
          : ['Other']
        : [groupValue ?? 'Other'];
      // Combine multiple group labels into one key so each component appears only once
      const combinedKey = [...groupKeys].sort().join(', ');
      (acc[combinedKey] ??= []).push(entry);
      return acc;
    }, {});
    return Object.entries(groups)
      .map(([name, items]) => ({ name, entries: items }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });
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
        filter((status) => status),
        switchMap(() => this.activeRoute.params),
      )
      .subscribe((params) => {
        this.searchTerm.set(params.term);
        this.searchResults.set(this.groupResults(this.fuseSearch.search(this.searchTerm())));
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

  countLabel(category: { entries: any[]; total: number }): string {
    return category.entries.length < category.total
      ? `${category.entries.length} of ${category.total}`
      : `${category.entries.length}`;
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
