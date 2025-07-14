import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxTabComponent,
  NxTabContentDirective,
  NxTabGroupComponent,
} from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/** @title Lazy loading content */
@Component({
  selector: 'tabs-lazy-example',
  templateUrl: './tabs-lazy-example.html',
  styleUrls: ['./tabs-lazy-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxTabContentDirective,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class TabsLazyExampleComponent {}
