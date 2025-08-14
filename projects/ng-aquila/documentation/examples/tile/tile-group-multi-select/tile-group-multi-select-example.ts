import { NxLabelComponent, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component, signal } from '@angular/core';

/**
 * @title Multi Select Tile Group Example
 */
@Component({
  selector: 'tile-group-multi-select-example',
  templateUrl: './tile-group-multi-select-example.html',
  styleUrls: ['./tile-group-multi-select-example.css'],
  standalone: true,
  imports: [
    NxTileComponent,
    NxTileGroupComponent,
    NxLabelModule,
    NxLabelComponent,
  ],
})
export class TileGroupMultiSelectExampleComponent {
  selectedValues: string[] = [];

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
