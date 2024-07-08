import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
 * @title Drop special characters example
 */
@Component({
    selector: 'mask-drop-characters-example',
    templateUrl: './mask-drop-characters-example.html',
    styleUrls: ['./mask-drop-characters-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxMaskDirective,
        FormsModule,
        NxFormfieldHintDirective,
    ],
})
export class MaskDropCharactersExampleComponent {
    dateTimeDropped = '020618';
    dateTimeValue = '020618';
}
