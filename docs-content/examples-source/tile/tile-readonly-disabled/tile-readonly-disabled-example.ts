import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxTileComponent,
  NxTileGroupComponent,
  NxTileSelectionMode,
} from '@allianz/ng-aquila/tile';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Readonly and Disabled Tiles Example
 */
@Component({
  selector: 'tile-readonly-disabled-example',
  templateUrl: './tile-readonly-disabled-example.html',
  styleUrls: ['./tile-readonly-disabled-example.css'],
  standalone: true,
  imports: [
    NxTileComponent,
    NxTileGroupComponent,
    NxLabelComponent,
    FormsModule,
  ],
})
export class TileReadonlyDisabledExampleComponent {
  readonly selectionMode = model<NxTileSelectionMode>('single');
}
