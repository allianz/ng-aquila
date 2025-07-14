import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Radio error message retail
 */
@Component({
  selector: 'radio-button-error-retail-example',
  templateUrl: './radio-button-error-retail-example.html',
  styleUrl: './radio-button-error-retail-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NxRadioModule,
    NxLabelComponent,
    NxErrorComponent,
    NxButtonComponent,
  ],
})
export class RadioButtonErrorRetailExampleComponent {
  readonly testForm = this.fb.group({
    radioTestReactive: [null, Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
