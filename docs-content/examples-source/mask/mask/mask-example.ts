import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMaskDirective } from '@allianz/ng-aquila/mask';
import { Component } from '@angular/core';

/**
 * @title Mask example
 */
@Component({
  selector: 'mask-example',
  templateUrl: './mask-example.html',
  styleUrls: ['./mask-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxMaskDirective,
    NxFormfieldHintDirective,
  ],
})
export class MaskExampleComponent {}
