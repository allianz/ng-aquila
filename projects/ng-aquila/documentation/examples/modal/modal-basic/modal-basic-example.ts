import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxModalComponent,
  NxOpenModalOnClickDirective,
} from '@allianz/ng-aquila/modal';
import { Component } from '@angular/core';

/**
 * @title Basic use case example
 */
@Component({
  selector: 'modal-basic-example',
  templateUrl: './modal-basic-example.html',
  styleUrls: ['./modal-basic-example.css'],
  imports: [
    NxButtonComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxOpenModalOnClickDirective,
    NxModalComponent,
  ],
})
export class ModalBasicExampleComponent {}
