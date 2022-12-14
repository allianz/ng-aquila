import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Two column example
 */
@Component({
    selector: 'formfield-error-two-column-example',
    templateUrl: './formfield-error-two-column-example.html',
    styleUrls: ['./formfield-error-two-column-example.css'],
})
export class FormfieldErrorTwoColumnExampleComponent
    implements AfterContentInit
{
    @ViewChild('exampleErrorNgModel', { static: true })
    exampleErrorNgModel!: NxInputDirective;
    @ViewChild('exampleErrorNgModelHint', { static: true })
    exampleErrorNgModelHint!: NxInputDirective;

    valueSupplementError!: string;
    valueSupplementErrorHint!: string;

    ngAfterContentInit(): void {
        this.exampleErrorNgModel.ngControl?.control?.markAsTouched();
        this.exampleErrorNgModelHint.ngControl?.control?.markAsTouched();
    }
}
