import {
  ERROR_DEFAULT_OPTIONS,
  ErrorDefaultOptions,
  NxErrorComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import {
  FORMFIELD_DEFAULT_OPTIONS,
  FormfieldDefaultOptions,
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldPrefixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

const myDefaultOptions: FormfieldDefaultOptions = {
  appearance: 'outline',
  nxFloatLabel: 'always',
  updateOn: 'change',
};

const myErrorOptions: ErrorDefaultOptions = {
  appearance: 'text',
};

/**
 * @title Global default settings example
 */
@Component({
  selector: 'formfield-global-example',
  templateUrl: './formfield-global-example.html',
  styleUrls: ['./formfield-global-example.css'],
  providers: [
    { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: myDefaultOptions },
    { provide: ERROR_DEFAULT_OPTIONS, useValue: myErrorOptions },
  ],
  imports: [
    NxFormfieldComponent,
    NxFormfieldPrefixDirective,
    FormsModule,
    NxInputDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
    NxInfoIconComponent,
    NxLabelInfoDirective,
  ],
})
export class FormfieldGlobalExampleComponent implements AfterContentInit {
  modelValue!: string;

  @ViewChild('errorNgModel', { static: true })
  errorNgModel!: NxInputDirective;

  ngAfterContentInit(): void {
    this.errorNgModel.ngControl?.control?.markAsTouched();
  }
}
