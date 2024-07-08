import { Component } from '@angular/core';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMaskDirective } from '@aposin/ng-aquila/mask';

/**
 * @title Mask example
 */
@Component({
    selector: 'mask-example',
    templateUrl: './mask-example.html',
    styleUrls: ['./mask-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxMaskDirective,
        NxFormfieldHintDirective,
    ],
})
export class MaskExampleComponent {}
