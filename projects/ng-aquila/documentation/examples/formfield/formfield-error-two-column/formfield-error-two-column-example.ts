import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import {
  NxInputDirective,
  NxInputDirective as NxInputDirective_1,
} from '@allianz/ng-aquila/input';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Two column example
 */
@Component({
  selector: 'formfield-error-two-column-example',
  templateUrl: './formfield-error-two-column-example.html',
  styleUrls: ['./formfield-error-two-column-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective_1,
    FormsModule,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class FormfieldErrorTwoColumnExampleComponent
  implements AfterContentInit
{
  @ViewChild('exampleErrorNgModel', { static: true })
  exampleErrorNgModel!: NxInputDirective;
  @ViewChild('exampleErrorNgModelHint', { static: true })
  exampleErrorNgModelHint!: NxInputDirective;

  valueSupplementError!: string;
  valueSupplementErrorHint!: string;

  ngAfterContentInit(): void {
    this.exampleErrorNgModel.ngControl?.control?.markAsTouched();
    this.exampleErrorNgModelHint.ngControl?.control?.markAsTouched();
  }
}
