import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconModule, NxIconRegistry } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import {
  NxPopoverMainContentDirective,
  NxPopoverModule,
  NxPopoverTitleDirective,
} from '@allianz/ng-aquila/popover';
import { NxAccentColorComponent } from '@allianz/ng-aquila/text';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
    NxButtonModule,
    NxIconModule,
    NxPopoverModule,
    NxPopoverTitleDirective,
    NxPopoverMainContentDirective,
    NxHeadlineComponent,
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
  /** The input and value searched for with `input:value` or `:value`, or null for a normal search. */
  readonly inputValueQuery = computed(() =>
    this.fuseSearch.parseInputValueQuery(this.searchTerm() ?? ''),
  );
  /** Whether the search found anything. False until the first search has run, too. */
  readonly hasResults = computed(() => Object.keys(this.searchResults() ?? {}).length > 0);
  /** How many entries each category shows. Grows by maxEntriesPerCategory per "load more" click. */
  private readonly _visibleCounts = signal<{ [category: string]: number }>({});
  readonly componentGroups = computed(() => {
    const entries: any[] = this.visibleEntries('component');
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
  ) {
    const iconRegistry = inject(NxIconRegistry);
    iconRegistry.registerFont('fa', 'fas', 'fa-');
    iconRegistry.addFontIcon('circle-question', 'circle-question', 'fa');
  }

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
        // A new term starts over, so every category collapses back to the first page again.
        this._visibleCounts.set({});
        this.searchResults.set(this.groupResults(this.fuseSearch.search(this.searchTerm())));
      });
  }

  groupResults(entries: any[]) {
    const data: any = {};
    for (const entry of entries) {
      const type = entry.item?.searchDisplayType;
      (data[type] ??= { entries: [], total: 0 }).entries.push(entry);
      data[type].total++;
    }
    return data;
  }

  /** The slice of a category that is currently shown. Everything is searched already, so this is display only. */
  visibleEntries(category: string): any[] {
    const entries: any[] = this.searchResults()?.[category]?.entries ?? [];
    return entries.slice(0, this._visibleCounts()[category] ?? this.maxEntriesPerCategory);
  }

  hasMore(category: string): boolean {
    return this.visibleEntries(category).length < (this.searchResults()?.[category]?.total ?? 0);
  }

  showMore(category: string): void {
    this._visibleCounts.update((counts) => ({
      ...counts,
      [category]: this.visibleEntries(category).length + this.maxEntriesPerCategory,
    }));
  }

  countLabel(category: string): string {
    const total = this.searchResults()?.[category]?.total ?? 0;
    const shown = this.visibleEntries(category).length;
    return shown < total ? `${shown} of ${total}` : `${total}`;
  }

  /**
   * Inputs and outputs of the entry that the search term matched, so the result can show why it is
   * listed. The kind carries the same colour coding the api page uses for its Input/Output badges.
   */
  matchedMembers(entry: any): { name: string; kind: 'input' | 'output' }[] {
    return (entry.matches ?? [])
      .filter((match: any) => match.key === 'inputs' || match.key === 'outputs')
      .map((match: any) => ({
        name: match.value,
        kind: match.key === 'inputs' ? 'input' : 'output',
      }));
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
