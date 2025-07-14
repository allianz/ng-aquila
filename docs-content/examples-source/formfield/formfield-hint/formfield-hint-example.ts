import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Hint example
 */
@Component({
  selector: 'formfield-hint-example',
  templateUrl: './formfield-hint-example.html',
  styleUrls: ['./formfield-hint-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxFormfieldAppendixDirective,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxIconButtonComponent,
  ],
})
export class FormfieldHintExampleComponent {}
