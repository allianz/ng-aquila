import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Negative Styling Example
 */
@Component({
  selector: 'radio-toggle-negative-example',
  templateUrl: './radio-toggle-negative-example.html',
  styleUrls: ['./radio-toggle-negative-example.css'],
  imports: [
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
    ReactiveFormsModule,
  ],
})
export class RadioToggleNegativeExampleComponent implements OnInit {
  readonly criticalForm = this.fb.group({
    critical: ['B', () => ({ invalid: true })],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.criticalForm.markAllAsTouched();
  }
}
