import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Black link example
 */
@Component({
  selector: 'link-black-example',
  templateUrl: './link-black-example.html',
  styleUrls: ['./link-black-example.css'],
  imports: [NxLinkComponent, RouterLink],
})
export class LinkBlackExampleComponent {}
