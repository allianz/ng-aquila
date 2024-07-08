import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Sizes example
 */
@Component({
    selector: 'link-size-example',
    templateUrl: './link-size-example.html',
    styleUrls: ['./link-size-example.css'],
    standalone: true,
    imports: [NxLinkComponent, RouterLink],
})
export class LinkSizeExampleComponent {}
