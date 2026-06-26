import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { NxTableModule } from '@allianz/ng-aquila/table';
import { NxTagComponent, NxTagGroupComponent } from '@allianz/ng-aquila/taglist';
import { NX_DOCS_GITHUB_LINK, ThemeSwitcherService } from '@allianz/ngx-docs-ui';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ComponentDescriptor } from '../../../core/manifest';
import { GithubLinkConfig } from '../../../core/types';
import { NxvComponentIconComponent } from '../../../documentation/component-icon/component-icon.component';
import { ManifestService } from '../../../service/manifest.service';

type A1FilterTag = 'a1Light' | 'densities' | 'a1Full' | 'ndbxOnly';

@Component({
  selector: 'nxv-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxInputModule,
    NxTableModule,
    RouterLink,
    NxBadgeModule,
    NxIconComponent,
    NxIndicatorComponent,
    NxInfoIconComponent,
    NxTagGroupComponent,
    NxTagComponent,
    NxPlainButtonComponent,
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
    FormsModule,
    NxLinkComponent,
    NxvComponentIconComponent,
  ],
})
export class NxvOverviewComponent {
  protected readonly _components = inject(ManifestService).groupedComponents;
  issueBoardLink: string;

  protected readonly _themeService = inject(ThemeSwitcherService);
  protected readonly _isAquilaDocs = computed(() =>
    this._themeService.selectedTheme().name.includes('aquila'),
  );

  protected readonly _isNonA1Theme = computed(
    () => !this._themeService.selectedTheme().name.startsWith('allianz-one'),
  );

  readonly filterTags: { value: A1FilterTag; label: string }[] = [
    { value: 'a1Light', label: 'A1 Light' },
    { value: 'densities', label: 'A1 Ready' },
    { value: 'a1Full', label: 'A1 Full' },
    { value: 'ndbxOnly', label: 'NDBX Only' },
  ];

  readonly selectedFilters = signal<A1FilterTag[]>([]);

  readonly searchQuery = signal('');

  readonly selectedGroup = signal<string>('all');

  readonly componentGroups = [
    'Navigation',
    'Forms & Inputs',
    'Data Display',
    'Overlays',
    'Layout',
    'Actions',
    'Utilities',
  ] as const;

  clearAllFilters(): void {
    this.searchQuery.set('');
    this.selectedFilters.set([]);
  }

  constructor(
    @Inject(NX_DOCS_GITHUB_LINK) private readonly githubLinkConfig: GithubLinkConfig,
    private readonly _router: Router,
  ) {
    this.issueBoardLink = `${githubLinkConfig.repoLink}/issues`;
  }

  readonly noneSelected = computed(() => this.selectedFilters().length === 0);
  readonly totalCount = computed(() =>
    (this._components() ?? []).reduce((sum, cat) => sum + cat.children.length, 0),
  );
  readonly filteredCount = computed(() =>
    this.filteredComponents().reduce((sum, cat) => sum + cat.children.length, 0),
  );

  navigateToComponent(component: { component: { id: string | number } }) {
    this._router.navigate(['/documentation', component.component.id]);
  }

  getComponentGroup(group: string | string[] | undefined): string | undefined {
    return Array.isArray(group) ? group.join(', ') : group;
  }

  readonly filteredComponents = computed(() => {
    const selected = new Set<A1FilterTag>(this.selectedFilters());
    const query = this.searchQuery().trim().toLowerCase();
    const group = this.selectedGroup();
    return (this._components() ?? []).map((cat) => ({
      ...cat,
      totalChildren: cat.children.length,
      children: cat.children.filter((child) => {
        const categories = this._getA1Categories(child.component);
        const matchesA1Progress = selected.size === 0 || categories.some((c) => selected.has(c));
        const matchesSearch = !query || this._matchesSearch(child, query);
        const groups = child.component.group;
        const matchesGroup =
          group === 'all' || (Array.isArray(groups) ? groups.includes(group) : groups === group);
        return matchesA1Progress && matchesSearch && matchesGroup;
      }),
    }));
  });

  private _matchesSearch(
    child: { label: string; component: ComponentDescriptor },
    query: string,
  ): boolean {
    if (child.label.toLowerCase().includes(query)) return true;
    if (child.component.alias) {
      return child.component.alias
        .split(',')
        .some((part) => part.trim().toLowerCase().includes(query));
    }
    return false;
  }

  private _getA1Categories(c: ComponentDescriptor): A1FilterTag[] {
    const categories: A1FilterTag[] = [];
    if (c.a1 === false) categories.push('ndbxOnly');
    if (c.a1Full) {
      categories.push('a1Full');
    } else if (c.a1Densities) {
      categories.push('densities');
    } else if (c.a1Light) {
      categories.push('a1Light');
    }
    return categories;
  }
}
