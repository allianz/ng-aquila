import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Manual control example
 */
@Component({
  selector: 'datefield-manual-example',
  templateUrl: './datefield-manual-example.html',
  styleUrls: ['./datefield-manual-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxDatefieldDirective,
    FormsModule,
    NxDatepickerComponent,
    NxButtonComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldManualExampleComponent {}
