import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface NxExpandable {
  /** Indicates if this expandable instance is open or not.  */
  expanded: BehaviorSubject<boolean>;

  /** Toggles the open state. */
  toggle(): void;

  /** Expands this component. */
  expand(): void;

  /** Closes this component. */
  close(): void;
}

/**
 * This toggle button can be clicked and toggles expandable elements.
 *
 * E.g. it can toggle a expandable table row or anything else that implements the `NxExpandable` interface.
 */
@Component({
  selector: 'nx-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconModule, NxPlainButtonComponent],
})
export class NxToggleButtonComponent implements AfterViewInit, OnDestroy {
  readonly _expanded = signal(false);
  readonly _ariaLabel = signal('');

  @ViewChild('button') _buttonElement!: ElementRef;

  /**
   * This is the expandable target that will be toggled when the user clicks the button.
   */
  @Input() set target(value: NxExpandable) {
    this._subscription?.unsubscribe();
    this._targetSignal.set(value);
    if (value) {
      this._subscription = value.expanded.subscribe((v) => this._expanded.set(v));
    }
  }
  private readonly _targetSignal = signal<NxExpandable | null>(null);
  private _subscription = Subscription.EMPTY;

  @Input() set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }

  constructor(private readonly _focusMonitor: FocusMonitor) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._buttonElement);
  }

  _onClick() {
    this._targetSignal()?.toggle();
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
    this._focusMonitor.stopMonitoring(this._buttonElement);
  }
}
