import { Component, ViewChild, AfterContentInit } from '@angular/core';
import {
    FORMFIELD_DEFAULT_OPTIONS,
    FormfieldDefaultOptions,
} from '@aposin/ng-aquila/formfield';
import {
    ERROR_DEFAULT_OPTIONS,
    ErrorDefaultOptions,
} from '@aposin/ng-aquila/base';
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
