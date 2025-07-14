import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
