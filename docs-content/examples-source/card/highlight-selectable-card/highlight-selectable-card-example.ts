import { Component } from '@angular/core';
import { NxSelectableCardComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';

/**
 * @title Selectable cards states example
 */
@Component({
    selector: 'highlight-selectable-card-example',
    templateUrl: './highlight-selectable-card-example.html',
    styleUrls: ['./highlight-selectable-card-example.css'],
    imports: [NxSelectableCardComponent, NxCopytextComponent],
})
export class HighlightSelectableCardExampleComponent {}
