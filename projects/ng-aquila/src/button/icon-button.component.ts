import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NxButtonBase } from './button-base';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxIconButton]',
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxIconButton'],
  providers: [{provide: NxTriggerButton, useExisting: NxIconButtonComponent}]
})
export class NxIconButtonComponent extends NxButtonBase {
  constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, focusMonitor: FocusMonitor) {
    super(changeDetectorRef, elementRef, focusMonitor);
  }
}
