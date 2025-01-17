import { Component } from '@angular/core';
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
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { MaskConversionTypes, NxMaskDirective } from '@aposin/ng-aquila/mask';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Set case example
 */
@Component({
    selector: 'mask-case-example',
    templateUrl: './mask-case-example.html',
    styleUrls: ['./mask-case-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxRadioGroupComponent,
        FormsModule,
        NxRadioComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxMaskDirective,
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class MaskCaseExampleComponent {
    modelVal!: string;
    templateModel: MaskConversionTypes = 'upper';
}
