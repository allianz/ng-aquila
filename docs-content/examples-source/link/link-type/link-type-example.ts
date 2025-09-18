import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Types example
 */
@Component({
  selector: 'link-type-example',
  templateUrl: './link-type-example.html',
  styleUrls: ['./link-type-example.css'],
  imports: [NxLinkComponent, RouterLink],
})
export class LinkTypeExampleComponent {}
