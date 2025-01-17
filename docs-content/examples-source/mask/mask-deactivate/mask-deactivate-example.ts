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
import { NxMaskDirective } from '@aposin/ng-aquila/mask';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Mask Deactivate example
 */
@Component({
    selector: 'mask-deactivate-example',
    templateUrl: './mask-deactivate-example.html',
    styleUrls: ['./mask-deactivate-example.css'],
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
export class MaskDeactivateExampleComponent {
    modelVal = 'SSAAAAA';
    templateModel = 'deactivate';
}
