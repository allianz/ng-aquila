import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxSelectableCardComponent } from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

/**
 * @title Selectable cards product example
 */
@Component({
  selector: 'selectable-card-product-example',
  templateUrl: './selectable-card-product-example.html',
  styleUrls: ['./selectable-card-product-example.css'],
  imports: [
    NxSelectableCardComponent,
    NxCopytextComponent,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
  ],
})
export class SelectableCardProductExampleComponent {}
