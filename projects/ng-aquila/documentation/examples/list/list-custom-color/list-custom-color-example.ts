import { Component } from '@angular/core';
import { NxListComponent, NxListIconComponent } from '@aposin/ng-aquila/list';

/**
 * @title Custom list item color example
 */
@Component({
    selector: 'list-custom-color-example',
    templateUrl: './list-custom-color-example.html',
    styleUrls: ['./list-custom-color-example.css'],
    standalone: true,
    imports: [NxListComponent, NxListIconComponent],
})
export class ListCustomColorExampleComponent {}
