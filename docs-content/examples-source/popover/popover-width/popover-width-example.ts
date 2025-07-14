import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
  POPOVER_DEFAULT_OPTIONS,
  PopoverDefaultOptions,
} from '@allianz/ng-aquila/popover';
import { Component } from '@angular/core';

const myDefaultOptions: PopoverDefaultOptions = {
  popoverWidth: '800px',
  popoverMaxWidth: '100%',
};

/**
 * @title Popover Width Example
 */
@Component({
  selector: 'popover-width-example',
  templateUrl: './popover-width-example.html',
  styleUrls: ['./popover-width-example.css'],
  providers: [{ provide: POPOVER_DEFAULT_OPTIONS, useValue: myDefaultOptions }],
  imports: [NxButtonComponent, NxPopoverTriggerDirective, NxPopoverComponent],
})
export class PopoverWidthExampleComponent {
  popoverWidth = '100%';
  popoverMaxWidth = '100%';
}
