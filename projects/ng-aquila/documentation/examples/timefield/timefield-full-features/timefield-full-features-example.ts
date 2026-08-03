import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxTimefieldModule } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Timefield full features example
 */
@Component({
  selector: 'timefield-full-features-example',
  templateUrl: './timefield-full-features-example.html',
  styleUrl: './timefield-full-features-example.css',
  imports: [
    NxTimefieldModule,
    ReactiveFormsModule,
    NxErrorComponent,
    NxInfoIconComponent,
    NxIconComponent,
    NxIconButtonComponent,
  ],
})
export class TimefieldFullFeaturesExampleComponent {
  timeControl = new FormControl('', [Validators.required]);

  constructor() {
    // Mark as touched so the error state is visible on load.
    this.timeControl.markAsTouched();
    this.timeControl.updateValueAndValidity();
  }
}
