import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableColorScheme,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderEyebrow,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { NxSurfaceAccentColor } from '@allianz/ng-aquila/surface';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

/** @title Header and footer colour scheme */
@Component({
  selector: 'comparison-table-color-scheme-example',
  templateUrl: './comparison-table-color-scheme-example.html',
  styleUrls: ['./comparison-table-color-scheme-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableDescriptionCell,
    NxComparisonTablePopularCell,
    NxComparisonTableSelectButton,
    NxComparisonTableHeaderEyebrow,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxEyebrowComponent,
    NxHeadlineComponent,
    NxPriceComponent,
    NxPlainButtonComponent,
    NxIconComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class ComparisonTableColorSchemeExampleComponent {
  readonly colorScheme = signal<NxComparisonTableColorScheme>('attention');
  readonly accentColor = signal<NxSurfaceAccentColor>('purple');
  readonly popularAccentColor = signal<NxSurfaceAccentColor>('purple');
  readonly selectedIndex = signal(1);

  readonly colorSchemeOptions: NxComparisonTableColorScheme[] = [
    'default',
    'attention',
    'emphasis',
    'accent-attention',
  ];

  readonly accentColorOptions: NxSurfaceAccentColor[] = [
    'yellow',
    'orange',
    'red',
    'purple',
    'aqua',
    'blue',
    'teal',
    'green',
    'gray',
  ];

  /** The accent hue only takes effect with an `accent-attention` colour scheme. */
  readonly accentColorApplies = computed(
    () => this.colorScheme() === 'accent-attention',
  );
}
