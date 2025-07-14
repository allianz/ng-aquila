import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
