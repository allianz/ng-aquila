import { Component } from '@angular/core';
import { NxCardComponent, NxCardHeaderComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Highlight Card Example
 */
@Component({
    selector: 'highlight-card-example',
    templateUrl: './highlight-card-example.html',
    styleUrls: ['./highlight-card-example.css'],
    standalone: true,
    imports: [
        NxCardComponent,
        NxCardHeaderComponent,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class HighlightCardExampleComponent {}
