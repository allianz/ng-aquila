import { Component } from '@angular/core';
import { NxListComponent } from '@aposin/ng-aquila/list';

/**
 * @title Nested lists
 */
@Component({
    selector: 'list-nesting-example',
    templateUrl: './list-nesting-example.html',
    styleUrls: ['./list-nesting-example.css'],
    standalone: true,
    imports: [NxListComponent],
})
export class ListNestingExampleComponent {}
