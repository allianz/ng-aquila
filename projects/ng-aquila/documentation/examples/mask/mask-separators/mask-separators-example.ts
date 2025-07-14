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
 * @title Custom separators example
 */
@Component({
  selector: 'mask-separators-example',
  templateUrl: './mask-separators-example.html',
  styleUrls: ['./mask-separators-example.css'],
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
export class MaskSeparatorsExampleComponent {
  mask = '00-00 [00]';
  separators = ['-', '[', ']', ' '];
}
