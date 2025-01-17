import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Default link example
 */
@Component({
    selector: 'link-default-example',
    templateUrl: './link-default-example.html',
    styleUrls: ['./link-default-example.css'],
    imports: [NxLinkComponent, RouterLink],
})
export class LinkDefaultExampleComponent {}
