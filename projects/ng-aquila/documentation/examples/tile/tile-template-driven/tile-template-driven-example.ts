import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Tile Template-driven Forms Example
 */
@Component({
  selector: 'tile-template-driven-example',
  templateUrl: './tile-template-driven-example.html',
  styleUrls: ['./tile-template-driven-example.css'],
  standalone: true,
  imports: [NxTileComponent, NxTileGroupComponent, FormsModule],
})
export class TileTemplateDrivenExampleComponent {
  selectedTile = 'car';
}
