import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxInputDirective,
  NxInputDirective as NxInputDirective_1,
} from '@allianz/ng-aquila/input';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Change detection trigger event example
 */
@Component({
  selector: 'formfield-changedetection-example',
  templateUrl: './formfield-changedetection-example.html',
  styleUrls: ['./formfield-changedetection-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective_1,
    FormsModule,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class FormfieldChangedetectionExampleComponent implements AfterContentInit {
  modelValue!: string;

  @ViewChild('errorNgModel', { static: true })
  errorNgModel!: NxInputDirective;

  ngAfterContentInit(): void {
    this.errorNgModel.ngControl?.control?.markAsTouched();
  }
}
