import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NxButtonBase } from './button-base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxIconButton]',
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxIconButton']
})
export class NxIconButtonComponent extends NxButtonBase {
  constructor(changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef) {
    super(changeDetectorRef, elementRef);
  }
}
