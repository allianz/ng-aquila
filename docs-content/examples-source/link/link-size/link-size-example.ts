import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Sizes example
 */
@Component({
  selector: 'link-size-example',
  templateUrl: './link-size-example.html',
  styleUrls: ['./link-size-example.css'],
  imports: [NxLinkComponent, RouterLink],
})
export class LinkSizeExampleComponent {}
