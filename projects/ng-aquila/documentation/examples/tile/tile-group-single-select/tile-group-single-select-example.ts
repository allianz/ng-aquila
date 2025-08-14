import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component } from '@angular/core';

/**
 * @title Single Select Tile Group Example
 */
@Component({
  selector: 'tile-group-single-select-example',
  templateUrl: './tile-group-single-select-example.html',
  styleUrls: ['./tile-group-single-select-example.css'],
  standalone: true,
  imports: [NxTileComponent, NxTileGroupComponent],
})
export class TileGroupSingleSelectExampleComponent {
  selectedValue: string | null = null;
}
