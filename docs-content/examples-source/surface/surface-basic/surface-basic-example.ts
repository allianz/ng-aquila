import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxEyebrowModule } from '@allianz/ng-aquila/eyebrow';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxPriceModule } from '@allianz/ng-aquila/price';
import type {
  NxSurfaceAccentColor,
  NxSurfaceType,
} from '@allianz/ng-aquila/surface';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { Component, computed, signal } from '@angular/core';

/**
 * @title Surface basic example
 */
@Component({
  selector: 'surface-basic-example',
  templateUrl: './surface-basic-example.html',
  styleUrls: ['./surface-basic-example.css'],
  imports: [
    NxSurface,
    NxBadgeModule,
    NxButtonModule,
    NxPriceModule,
    NxEyebrowModule,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldComponent,
    NxHeadlineComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
  ],
})
export class SurfaceBasicExampleComponent {
  readonly surfaces: NxSurfaceType[] = [
    'default',
    'attention',
    'emphasis',
    'accent-attention',
  ];

  readonly accentColors: NxSurfaceAccentColor[] = [
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

  readonly surface = signal<NxSurfaceType>('attention');
  readonly accentColor = signal<NxSurfaceAccentColor>('blue');

  readonly accentColorDisabled = computed(
    () => this.surface() !== 'accent-attention',
  );
}
