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
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { MaskConversionTypes, NxMaskDirective } from '@allianz/ng-aquila/mask';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Set case example
 */
@Component({
  selector: 'mask-case-example',
  templateUrl: './mask-case-example.html',
  styleUrls: ['./mask-case-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxRadioGroupComponent,
    FormsModule,
    NxRadioComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxMaskDirective,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class MaskCaseExampleComponent {
  modelVal!: string;
  templateModel: MaskConversionTypes = 'upper';
}
