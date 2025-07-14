import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Multiple modifiers example
 */
@Component({
  selector: 'link-multiple-example',
  templateUrl: './link-multiple-example.html',
  styleUrls: ['./link-multiple-example.css'],
  imports: [NxLinkComponent, RouterLink, NxIconComponent],
})
export class LinkMultipleExampleComponent {}
