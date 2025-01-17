import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Link within text example
 */
@Component({
    selector: 'link-within-text-example',
    templateUrl: './link-within-text-example.html',
    styleUrls: ['./link-within-text-example.css'],
    imports: [NxCopytextComponent, NxLinkComponent, RouterLink],
})
export class LinkWithinTextExampleComponent {}
