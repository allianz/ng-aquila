import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'link-negative-example',
  templateUrl: './link-negative-example.html',
  styleUrls: ['./link-negative-example.css'],
  imports: [NxLinkComponent, RouterLink],
})
export class LinkNegativeExampleComponent {}
