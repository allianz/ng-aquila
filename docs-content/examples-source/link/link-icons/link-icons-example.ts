import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Link with icon example
 */
@Component({
  selector: 'link-icons-example',
  templateUrl: './link-icons-example.html',
  styleUrls: ['./link-icons-example.css'],
  imports: [NxLinkComponent, RouterLink, NxIconComponent],
})
export class LinkIconsExampleComponent {}
