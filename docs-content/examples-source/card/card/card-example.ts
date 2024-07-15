import { Component } from '@angular/core';
import { NxCardComponent, NxCardHeaderComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Default Card Example
 */
@Component({
    selector: 'card-example',
    templateUrl: './card-example.html',
    styleUrls: ['./card-example.css'],
    standalone: true,
    imports: [
        NxCardComponent,
        NxCardHeaderComponent,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class CardExampleComponent {}
