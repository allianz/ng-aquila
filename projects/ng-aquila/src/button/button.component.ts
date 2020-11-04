import { NxTriggerButton } from '@aposin/ng-aquila/overlay';
import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { NxButtonBase } from './button-base';

@Component({
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  // tslint:disable-next-line:component-selector
  selector: 'button[nxButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxButton'],
  providers: [{provide: NxTriggerButton, useExisting: NxButtonComponent}]
})

export class NxButtonComponent extends NxButtonBase {
  constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
    super(changeDetectorRef, elementRef);
  }
}
