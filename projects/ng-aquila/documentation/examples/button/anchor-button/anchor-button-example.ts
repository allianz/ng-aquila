import {
  NxAnchorButtonComponent,
  NxAnchorIconButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Anchor Button Example
 */
@Component({
  selector: 'anchor-button-example',
  templateUrl: './anchor-button-example.html',
  styleUrls: ['./anchor-button-example.css'],
  imports: [
    NxAnchorButtonComponent,
    NxIconComponent,
    NxAnchorIconButtonComponent,
  ],
})
export class AnchorButtonExampleComponent {}
