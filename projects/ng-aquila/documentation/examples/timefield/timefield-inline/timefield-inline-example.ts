import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';
import { NxTimefieldModule } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Timefield inline example
 */
@Component({
  selector: 'timefield-inline-example',
  templateUrl: './timefield-inline-example.html',
  styleUrl: './timefield-inline-example.css',
  imports: [
    NxTimefieldModule,
    ReactiveFormsModule,
    NxGridModule,
    NxErrorComponent,
    NxSignalButtonComponent,
    NxListComponent,
    NxInfoIconComponent,
  ],
})
export class TimefieldInlineExampleComponent {
  timeControl = new FormControl('', [Validators.required]);

  constructor() {
    // Mark as touched so the inline error state is visible on load.
    this.timeControl.markAsTouched();
    this.timeControl.updateValueAndValidity();
  }
}
