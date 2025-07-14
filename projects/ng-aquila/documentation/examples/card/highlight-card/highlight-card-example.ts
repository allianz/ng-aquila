import {
  NxCardComponent,
  NxCardHeaderComponent,
} from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Highlight Card Example
 */
@Component({
  selector: 'highlight-card-example',
  templateUrl: './highlight-card-example.html',
  styleUrls: ['./highlight-card-example.css'],
  imports: [
    NxCardComponent,
    NxCardHeaderComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class HighlightCardExampleComponent {}
