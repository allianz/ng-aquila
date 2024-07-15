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
 * @title Custom separators example
 */
@Component({
    selector: 'mask-separators-example',
    templateUrl: './mask-separators-example.html',
    styleUrls: ['./mask-separators-example.css'],
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
export class MaskSeparatorsExampleComponent {
    mask = '00-00 [00]';
    separators = ['-', '[', ']', ' '];
}
