import {
  NxCardComponent,
  NxCardHeaderComponent,
} from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Default Card Example
 */
@Component({
  selector: 'card-example',
  templateUrl: './card-example.html',
  styleUrls: ['./card-example.css'],
  imports: [
    NxCardComponent,
    NxCardHeaderComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class CardExampleComponent {}
