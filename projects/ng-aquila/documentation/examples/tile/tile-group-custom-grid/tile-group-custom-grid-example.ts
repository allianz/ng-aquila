import { NxLabelComponent, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';

import { Component, signal } from '@angular/core';

/**
 * @title Tile Group Custom Grid Example
 */
@Component({
  selector: 'tile-group-custom-grid-example',
  standalone: true,
  imports: [
    NxTileGroupComponent,
    NxTileComponent,
    NxIconModule,
    NxLabelModule,
    NxLabelComponent,
  ],
  templateUrl: './tile-group-custom-grid-example.html',
  styleUrls: ['./tile-group-custom-grid-example.css'],
})
export class TileGroupCustomGridExampleComponent {
  tiles = signal([
    { label: 'Standard', value: 1, icon: 'product-car' },
    { label: 'Premium', value: 2, icon: 'product-heart' },
    { label: 'Family', value: 3, icon: 'product-plane' },
    { label: 'Business', value: 4, icon: 'product-care-insurance' },
    { label: 'Student', value: 5, icon: 'file' },
    { label: 'Senior', value: 6, icon: 'globe' },
  ]);
}
