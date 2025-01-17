import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import {
    NxInputDirective,
    NxInputDirective as NxInputDirective_1,
} from '@aposin/ng-aquila/input';

/**
 * @title Expert error message example
 */
@Component({
    selector: 'formfield-expert-error-example',
    templateUrl: './formfield-expert-error-example.html',
    styleUrls: ['./formfield-expert-error-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective_1,
        FormsModule,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxFormfieldHintDirective,
    ],
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
