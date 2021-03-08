import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NxButtonBase } from './button-base';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  // tslint:disable-next-line:component-selector
  selector: 'button[nxButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxButton'],
  providers: [{provide: NxTriggerButton, useExisting: NxButtonComponent}],
  host: {
    '[class.nx-button]': 'true',
  },
})

export class NxButtonComponent extends NxButtonBase {
  constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
    super(changeDetectorRef, elementRef, focusMonitor);
  }
}
