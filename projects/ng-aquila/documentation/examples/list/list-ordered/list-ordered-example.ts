import { Component } from '@angular/core';
import { NxListComponent } from '@aposin/ng-aquila/list';

/**
 * @title Ordered list example
 */
@Component({
    selector: 'list-ordered-example',
    templateUrl: './list-ordered-example.html',
    styleUrls: ['./list-ordered-example.css'],
    standalone: true,
    imports: [NxListComponent],
})
export class ListOrderedExampleComponent {}
