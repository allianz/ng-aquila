import { NxLabelComponent, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxSurface } from '@allianz/ng-aquila/surface';
import {
  NxTileComponent,
  NxTileGroupComponent,
  NxTileSelectionMode,
} from '@allianz/ng-aquila/tile';
import { Component, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Inverse Tile Group Example
 */
@Component({
  selector: 'tile-group-negative-example',
  templateUrl: './tile-group-negative-example.html',
  styleUrls: ['./tile-group-negative-example.css'],
  standalone: true,
  imports: [
    NxTileComponent,
    NxTileGroupComponent,
    NxLabelModule,
    NxLabelComponent,
    NxSurface,
    FormsModule,
  ],
})
export class TileGroupNegativeExampleComponent {
  readonlySelectedValue = 'standard';
  disabledSelectedValue = 'standard';

  readonly selectionMode = signal<NxTileSelectionMode>('single');

  readonly toggleableValue = linkedSignal<
    NxTileSelectionMode,
    string | string[] | null
  >({
    source: this.selectionMode,
    computation: (mode) => (mode === 'multi' ? [] : null),
  });

  tiles = signal([
    {
      label: 'Standard',
      value: 'standard',
      hint: 'Standard option',
      icon: 'product-car',
    },
    {
      label: 'Premium',
      value: 'premium',
      hint: 'Premium option',
      icon: 'product-heart',
    },
    {
      label: 'Business',
      value: 'business',
      hint: 'Business option',
      icon: 'product-care-insurance',
    },
  ]);
}
