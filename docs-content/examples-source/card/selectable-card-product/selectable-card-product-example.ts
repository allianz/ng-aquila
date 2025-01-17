import { Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import { NxSelectableCardComponent } from '@aposin/ng-aquila/card';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

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
