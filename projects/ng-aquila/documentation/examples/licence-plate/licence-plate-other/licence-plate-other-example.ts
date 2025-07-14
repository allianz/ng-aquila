import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxLicencePlateValidatorDirective } from '@allianz/ng-aquila/licence-plate';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Licence plate other
 */
@Component({
  selector: 'licence-plate-other-example',
  templateUrl: 'licence-plate-other-example.html',
  styleUrls: ['licence-plate-other-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxLicencePlateValidatorDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class LicencePlateOtherExampleComponent {
  value = '';
}
