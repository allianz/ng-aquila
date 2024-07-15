import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ERROR_DEFAULT_OPTIONS,
    ErrorDefaultOptions,
    NxErrorComponent,
} from '@aposin/ng-aquila/base';
import {
    FORMFIELD_DEFAULT_OPTIONS,
    FormfieldDefaultOptions,
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldPrefixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxInputDirective,
    NxInputDirective as NxInputDirective_1,
} from '@aposin/ng-aquila/input';

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
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxInputDirective_1,
        NxFormfieldPrefixDirective,
        NxIconComponent,
        NxFormfieldAppendixDirective,
        FormsModule,
        NxErrorComponent,
        NxFormfieldErrorDirective,
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
