import {
  NxErrorComponent,
  NxLabelComponent,
  NxLabelModule,
} from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { AfterViewInit, Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tile Validation Error State Example
 */
@Component({
  selector: 'tile-validation-error-state-example',
  standalone: true,
  templateUrl: './tile-validation-error-state-example.html',
  styleUrls: ['./tile-validation-error-state-example.css'],
  imports: [
    ReactiveFormsModule,
    NxTileComponent,
    NxTileGroupComponent,
    NxIconModule,
    NxButtonModule,
    NxErrorComponent,
    NxLabelModule,
    NxLabelComponent,
  ],
})
export class TileValidationErrorStateExample implements AfterViewInit {
  tileControl = new FormControl('car');
  tiles = [
    { value: 'standard', label: 'Standard', icon: 'product-car' },
    { value: 'premium', label: 'Premium', icon: 'product-heart' },
    { value: 'family', label: 'Family', icon: 'product-plane' },
  ];
  group = viewChild(NxTileGroupComponent);

  ngAfterViewInit() {
    this.tileControl.markAsTouched();
    this.tileControl.updateValueAndValidity();
    this.tileControl.setErrors({ someError: true }, { emitEvent: true });
  }
}
