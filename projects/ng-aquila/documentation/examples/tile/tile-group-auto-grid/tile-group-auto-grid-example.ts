import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxLabelComponent, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';

import { Component, signal } from '@angular/core';

/**
 * @title Tile Group Auto Grid Example
 */
@Component({
  selector: 'tile-group-auto-grid-example',
  imports: [
    NxTileGroupComponent,
    NxTileComponent,
    NxIconModule,
    NxBadgeComponent,
    NxSliderComponent,
    NxLabelModule,
    NxLabelComponent,
  ],
  templateUrl: './tile-group-auto-grid-example.html',
  styleUrls: ['./tile-group-auto-grid-example.css'],
})
export class TileGroupAutoGridExampleComponent {
  tiles = signal([
    { label: 'Standard', value: 1, icon: 'product-car' },
    { label: 'Premium', value: 2, icon: 'product-heart' },
    { label: 'Family', value: 3, icon: 'product-plane' },
    { label: 'Business', value: 4, icon: 'product-care-insurance' },
    { label: 'Student', value: 5, icon: 'file' },
    { label: 'Senior', value: 6, icon: 'globe' },
  ]);
  maxColumns = signal(4);
}
