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
import { NxMaskDirective } from '@allianz/ng-aquila/mask';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Drop special characters example
 */
@Component({
  selector: 'mask-drop-characters-example',
  templateUrl: './mask-drop-characters-example.html',
  styleUrls: ['./mask-drop-characters-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxMaskDirective,
    FormsModule,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class MaskDropCharactersExampleComponent {
  dateTimeDropped = '020618';
  dateTimeValue = '020618';
}
