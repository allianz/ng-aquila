import { AfterContentInit, Component, ViewChild } from '@angular/core';
import {
    ErrorDefaultOptions,
    ERROR_DEFAULT_OPTIONS,
} from '@aposin/ng-aquila/base';
import {
    FormfieldDefaultOptions,
    FORMFIELD_DEFAULT_OPTIONS,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

const myDefaultOptions: FormfieldDefaultOptions = {
    appearance: 'outline',
    nxFloatLabel: 'always',
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
})
export class FormfieldGlobalExampleComponent implements AfterContentInit {
    public modelValue!: string;
    @ViewChild('errorNgModel', { static: true })
    errorNgModel!: NxInputDirective;

    ngAfterContentInit() {
        this.errorNgModel.ngControl.control?.markAsTouched();
    }
}
