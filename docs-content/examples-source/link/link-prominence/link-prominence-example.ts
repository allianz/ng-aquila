import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Prominence example
 */
@Component({
  selector: 'link-prominence-example',
  templateUrl: './link-prominence-example.html',
  styleUrls: ['./link-prominence-example.css'],
  imports: [NxLinkComponent, RouterLink],
})
export class LinkProminenceExampleComponent {}
