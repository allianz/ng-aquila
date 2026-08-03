import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
} from '@allianz/ng-aquila/popover';
import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * @title Inline example
 */
@Component({
  selector: 'formfield-inline-example',
  templateUrl: './formfield-inline-example.html',
  styleUrls: ['./formfield-inline-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldSuffixDirective,
    NxFormfieldErrorDirective,
    NxErrorComponent,
    NxSignalButtonComponent,
    NxPopoverTitleDirective,
    NxPopoverMainContentDirective,
    NxHeadlineComponent,
    ReactiveFormsModule,
  ],
})
export class FormfieldInlineExampleComponent {
  budgetControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(100),
  ]);

  constructor() {
    // Mark as touched so the inline error state is visible on load.
    this.budgetControl.markAsTouched();
  }
}
