import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component } from '@angular/core';

/**
 * @title Tile Layouts Example
 */
@Component({
  selector: 'tile-layouts-example',
  templateUrl: './tile-layouts-example.html',
  styleUrls: ['./tile-layouts-example.css'],
  standalone: true,
  imports: [NxTileComponent, NxTileGroupComponent],
})
export class TileLayoutsExampleComponent {}
