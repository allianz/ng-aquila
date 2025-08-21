import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tile Reactive Forms Example
 */
@Component({
  selector: 'tile-reactive-forms-example',
  templateUrl: './tile-reactive-forms-example.html',
  styleUrls: ['./tile-reactive-forms-example.css'],
  standalone: true,
  imports: [NxTileComponent, NxTileGroupComponent, ReactiveFormsModule],
})
export class TileReactiveFormsExampleComponent {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      tileGroup: ['car'],
    });
  }
}
