import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxFigureComponent } from '@aposin/ng-aquila/image';

/**
 * @title Images Attribute styling example
 */
@Component({
    selector: 'image-attribute-example',
    templateUrl: './image-attribute-example.html',
    styleUrls: ['./image-attribute-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFigureComponent,
    ],
})
export class ImageAttributeExampleComponent {}
