import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Error example
 */
@Component({
    selector: 'formfield-error-example',
    templateUrl: './formfield-error-example.html',
    styleUrls: ['./formfield-error-example.css'],
})
export class FormfieldErrorExampleComponent implements AfterContentInit {
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
