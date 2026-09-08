import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Toggle Button Example
 */
@Component({
  selector: 'radio-toggle-example',
  templateUrl: './radio-toggle-example.html',
  styleUrls: ['./radio-toggle-example.css'],
  imports: [
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
    ReactiveFormsModule,
  ],
})
export class RadioToggleExampleComponent implements OnInit {
  readonly criticalForm = this.fb.group({
    critical: ['B', () => ({ invalid: true })],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.criticalForm.markAllAsTouched();
  }
}
