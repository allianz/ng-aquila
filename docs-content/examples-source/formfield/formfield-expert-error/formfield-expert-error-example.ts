import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Expert error message example
 */
@Component({
    selector: 'formfield-expert-error-example',
    templateUrl: './formfield-expert-error-example.html',
    styleUrls: ['./formfield-expert-error-example.css'],
})
export class FormfieldExpertErrorExampleComponent implements AfterContentInit {
    @ViewChild('exampleErrorNgModel', { static: true })
    exampleErrorNgModel!: NxInputDirective;
    @ViewChild('exampleErrorWithHintNgModel', { static: true })
    exampleErrorWithHintNgModel!: NxInputDirective;

    valueError!: string;
    valueErrorWithHint!: string;

    ngAfterContentInit(): void {
        this.exampleErrorNgModel.ngControl?.control?.markAsTouched();
        this.exampleErrorWithHintNgModel.ngControl?.control?.markAsTouched();
    }
}
