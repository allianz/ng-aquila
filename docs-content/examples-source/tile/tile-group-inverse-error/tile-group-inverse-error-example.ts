import {
  NxErrorComponent,
  NxLabelComponent,
  NxLabelModule,
} from '@allianz/ng-aquila/base';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { AfterViewInit, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

const premiumOnly = (control: AbstractControl): ValidationErrors | null => {
  const selected: readonly string[] = Array.isArray(control.value)
    ? control.value
    : [control.value];

  return selected.every((value) => value === 'premium')
    ? null
    : { premiumOnly: true };
};

/**
 * @title Inverse Tile Group Error State Example
 */
@Component({
  selector: 'tile-group-inverse-error-example',
  standalone: true,
  templateUrl: './tile-group-inverse-error-example.html',
  styleUrls: ['./tile-group-inverse-error-example.css'],
  imports: [
    ReactiveFormsModule,
    NxTileComponent,
    NxTileGroupComponent,
    NxErrorComponent,
    NxLabelModule,
    NxLabelComponent,
    NxSurface,
  ],
})
export class TileGroupInverseErrorExampleComponent implements AfterViewInit {
  tileControl = new FormControl('standard', [Validators.required, premiumOnly]);
  multiTileControl = new FormControl(
    ['standard', 'family'],
    [Validators.required, premiumOnly],
  );
  tiles = [
    { value: 'standard', label: 'Standard', icon: 'product-car' },
    { value: 'premium', label: 'Premium', icon: 'product-heart' },
    { value: 'family', label: 'Family', icon: 'product-plane' },
  ];

  ngAfterViewInit() {
    this.tileControl.markAsTouched();
    this.multiTileControl.markAsTouched();
  }
}
