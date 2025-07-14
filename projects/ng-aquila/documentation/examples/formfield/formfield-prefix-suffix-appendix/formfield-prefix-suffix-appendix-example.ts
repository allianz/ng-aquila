import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Prefix, suffix and appendix examples
 */
@Component({
  selector: 'formfield-prefix-suffix-appendix-example',
  templateUrl: './formfield-prefix-suffix-appendix-example.html',
  styleUrls: ['./formfield-prefix-suffix-appendix-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldSuffixDirective,
    NxFormfieldAppendixDirective,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxIconButtonComponent,
  ],
})
export class FormfieldPrefixSuffixAppendixExampleComponent {
  value = 'Max';
}
