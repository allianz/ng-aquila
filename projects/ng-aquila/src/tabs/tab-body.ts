import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  SimpleChanges,
  OnChanges,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { NxTabComponent } from './tab';
import { NxTabGroupBase } from './tab-group-base';

/** @docs-private */
@Component({
  selector: 'nx-tab-body',
  templateUrl: 'tab-body.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tab-body.scss']
})
export class NxTabBodyComponent implements OnInit, OnDestroy, OnChanges {
  private _appearanceSubscription: Subscription;

  @ViewChild('outlet', { static: true, read: ViewContainerRef }) _outlet: ViewContainerRef;

  @Input() tab: NxTabComponent;

  private _active: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if ('active' in changes) {
      const change = changes.active;
      if (change.currentValue) {
        this.attach();
      } else {
        this.detach();
      }
    }
  }

  @Input()
  set active(value: boolean) {
    this._active = coerceBooleanProperty(value);
  }
  get active(): boolean {
    return this._active;
  }

  constructor(
    private _tabGroup: NxTabGroupBase,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef
  ) {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnInit() {
    this._appearanceSubscription = this._tabGroup._appearanceChange.subscribe(() => {
      this.detach();
    });
  }

  ngOnDestroy() {
    this._appearanceSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  attach() {
    this._outlet.insert(this.tab.contentViewRef);
  }

  detach() {
    const index = this._outlet.indexOf(this.tab.contentViewRef);
    if (index !== -1) {
      this._outlet.detach(index);
    }
  }

  static ngAcceptInputType_active: BooleanInput;
}
