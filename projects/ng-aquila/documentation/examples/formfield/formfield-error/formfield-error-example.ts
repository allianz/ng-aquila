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
 * @title Error example
 */
@Component({
    selector: 'formfield-error-example',
    templateUrl: './formfield-error-example.html',
    styleUrls: ['./formfield-error-example.css'],
    standalone: true,
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
