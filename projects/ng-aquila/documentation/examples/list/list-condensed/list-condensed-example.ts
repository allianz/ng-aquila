import { Component } from '@angular/core';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxListModule } from '@aposin/ng-aquila/list';

/**
 * @title Condensed list example
 */
@Component({
    selector: 'list-condensed-example',
    templateUrl: './list-condensed-example.html',
    styleUrls: ['./list-condensed-example.css'],
    standalone: true,
    imports: [NxHeadlineModule, NxListModule],
})
export class ListCondensedExampleComponent {}
