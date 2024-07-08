import { Component } from '@angular/core';
import { NxListComponent, NxListIconComponent } from '@aposin/ng-aquila/list';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'list-negative-example',
    templateUrl: './list-negative-example.html',
    styleUrls: ['./list-negative-example.css'],
    standalone: true,
    imports: [NxListComponent, NxListIconComponent],
})
export class ListNegativeExampleComponent {}
