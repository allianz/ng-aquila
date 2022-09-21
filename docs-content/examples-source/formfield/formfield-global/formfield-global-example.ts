import {
    ERROR_DEFAULT_OPTIONS,
    ErrorDefaultOptions,
} from '@allianz/ng-aquila/base';
import {
    FORMFIELD_DEFAULT_OPTIONS,
    FormfieldDefaultOptions,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { AfterContentInit, Component, ViewChild } from '@angular/core';

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
    modelValue!: string;

    @ViewChild('errorNgModel', { static: true })
    errorNgModel!: NxInputDirective;

    ngAfterContentInit(): void {
        this.errorNgModel.ngControl?.control?.markAsTouched();
    }
}
