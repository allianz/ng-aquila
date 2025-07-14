import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxTimefieldModule } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Timefield without timepicker example
 */
@Component({
  selector: 'timefield-default-example',
  templateUrl: './timefield-default-example.html',
  styleUrls: ['./timefield-default-example.css'],
  imports: [NxTimefieldModule, NxErrorModule, ReactiveFormsModule],
})
export class TimefieldDefaultExampleComponent {
  readonly testForm = this.fb.group({
    timefieldReactive: ['22:54', Validators.required],
  });

  constructor(private readonly fb: FormBuilder) {}
}
