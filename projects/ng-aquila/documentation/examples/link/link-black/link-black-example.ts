import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Black link example
 */
@Component({
    selector: 'link-black-example',
    templateUrl: './link-black-example.html',
    styleUrls: ['./link-black-example.css'],
    standalone: true,
    imports: [NxLinkComponent, RouterLink],
})
export class LinkBlackExampleComponent {}
