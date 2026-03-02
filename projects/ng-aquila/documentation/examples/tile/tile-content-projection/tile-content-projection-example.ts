import {
  NxTileComponent,
  NxTileGroupComponent,
  NxTileHintDirective,
  NxTileLabelDirective,
} from '@allianz/ng-aquila/tile';
import { Component } from '@angular/core';

/**
 * @title Content Projection Example
 */
@Component({
  selector: 'tile-content-projection-example',
  templateUrl: './tile-content-projection-example.html',
  styleUrl: './tile-content-projection-example.css',
  imports: [
    NxTileGroupComponent,
    NxTileComponent,
    NxTileLabelDirective,
    NxTileHintDirective,
  ],
})
export class TileContentProjectionExampleComponent {}
