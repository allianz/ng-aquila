import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDatefieldDirective,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
} from '@allianz/ng-aquila/datefield';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Start view example
 */
@Component({
  selector: 'datefield-startview-example',
  templateUrl: './datefield-startview-example.html',
  styleUrls: ['./datefield-startview-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxDatefieldDirective,
    FormsModule,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class DatefieldStartviewExampleComponent {}
