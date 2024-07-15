import { Component } from '@angular/core';
import { NxListComponent } from '@aposin/ng-aquila/list';

/**
 * @title Ordered list with circles example
 */
@Component({
    selector: 'list-circles-example',
    templateUrl: './list-circles-example.html',
    styleUrls: ['./list-circles-example.css'],
    standalone: true,
    imports: [NxListComponent],
})
export class ListCirclesExampleComponent {}
