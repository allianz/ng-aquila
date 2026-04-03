import { NxButtonModule } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { A11yModule, FocusOrigin } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  Directive,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxPopoverContentDirective } from './popover-content';
import { NxPopoverIntl } from './popover-intl';
import { PopoverTriggerType } from './popover-trigger.directive';
/** Container for the header of a popover. */
@Directive({
  selector: '[nxPopoverTitle]',
  host: {
    '[class.nx-popover__title]': 'true',
  },
  standalone: true,
})
export class NxPopoverTitleDirective {}

/** Scrollable container for the content of a popover. */
@Directive({
  selector: '[nxPopoverMainContent]',
  host: {
    '[class.nx-popover__main-content]': 'true',
  },
  standalone: true,
})
export class NxPopoverMainContentDirective {}

/** Container for the action buttons in a popover. Has a fixed position at the bottom of the popover on scroll. */
@Directive({
  selector: '[nxPopoverActions]',
  host: {
    '[class.nx--popover__actions]': 'true',
    '[style.justify-content]': 'alignment()',
  },
  standalone: true,
})
export class NxPopoverActionsDirective {
  alignment = input<'left' | 'center' | 'right'>('left');
}

@Component({
  selector: 'nx-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./popover.component.scss'],
  exportAs: 'nxPopover',
  imports: [NgClass, NgStyle, NxIconModule, NgTemplateOutlet, NxButtonModule, A11yModule],
})
export class NxPopoverComponent implements OnDestroy, OnInit {
  /** @docs-private */
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

  /** Content that will be rendered lazily. */
  @ContentChild(NxPopoverContentDirective) _lazyContent?: NxPopoverContentDirective;

  /** Event emitted when the popover is closed. */
  @Output() readonly closed = new EventEmitter<void>();

  /** @docs-private */
  readonly closeButtonClick = new Subject<void>();

  /** @docs-private */
  readonly _lastFocusOrigin = signal<FocusOrigin | null>(null);

  /** @docs-private */
  id!: string;

  /** @docs-private */
  direction = signal<string>('');

  private readonly isVerticalDirection = computed(
    () => this.direction() === 'left' || this.direction() === 'right',
  );

  /** @docs-private */
  hidePopoverArrow = false;

  /** @docs-private */
  showCloseButton = false;

  /** @docs-private */
  triggerType: PopoverTriggerType = 'click';

  // necessary for direct usages of popover where the popover should not be traversable through tabs like in the natural language form
  /** Sets the tabIndex for the popover. Will only be considered if triggerType is 'manual' */
  set tabIndex(value: number | null) {
    this._tabIndex = value;
  }

  /**
   * gets the tabindex for the popover
   * if triggerType='hover' -> null
   * if triggerType='click' -> -1
   * if triggerType='manual' -> whatever is set on tabIndex. Defaults to 0 on 'manual'
   */
  get tabIndex(): number | null {
    if (this.triggerType === 'manual') {
      return this._tabIndex;
    }
    return this.triggerType === 'hover' ? null : -1;
  }
  private _tabIndex: number | null = -1;

  /** @docs-private */
  arrowStyle = {};

  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly isAllianzOne = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  /** @docs-private */
  protected readonly svgTrianglePath = computed<string>(() => {
    if (this.isAllianzOne()) {
      // Allianz One: filled triangle shape with a rounded tip (cubic bezier) on one side.
      return this.isVerticalDirection()
        ? 'M0.88097 0.43185C0.94670 0.46407 0.94774 0.51684 0.88328 0.54970L0 1L0 0Z'
        : 'M0.56815 0.88097C0.53593 0.94670 0.48316 0.94774 0.45030 0.88328L0 0L1 0Z';
    }
    // Default theme: filled sharp triangle shape.
    return this.isVerticalDirection() ? 'M1 0.50980L0 0L0 1Z' : 'M0.50980 1L0 0L1 0Z';
  });

  /**
   * Outer edges the arrow only used for the border stroke.
   * @docs-private
   */
  protected readonly svgTriangleBorderPath = computed<string>(() => {
    if (this.isAllianzOne()) {
      // Allianz One: open path with a rounded tip (cubic bezier), tracing two visible sides of the triangle.
      return this.isVerticalDirection()
        ? 'M0 0L0.88097 0.43185C0.94670 0.46407 0.94774 0.51684 0.88328 0.54970L0 1'
        : 'M1 0L0.56815 0.88097C0.53593 0.94670 0.48316 0.94774 0.45030 0.88328L0 0';
    }
    // Default theme: open sharp path tracing the two visible sides of the triangle.
    return this.isVerticalDirection() ? 'M0.04 0L1 0.50980L0.04 1' : 'M0 0.04L0.50980 1L1 0.04';
  });

  private readonly _destroyed = new Subject<void>();

  constructor(
    readonly _intl: NxPopoverIntl,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.closed.complete();
  }

  /**
   * Emits event to notify the popover trigger directive that the close button was clicked.
   * @docs-private
   */
  emitCloseButtonClick() {
    this.closeButtonClick.next();
  }

  /** @docs-private */
  _onCloseKeyup($event: KeyboardEvent) {
    if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
      this.emitCloseButtonClick();
    }
    $event.preventDefault();
  }

  /** @docs-private */
  _onCloseKeydown($event: KeyboardEvent) {
    if ($event.keyCode === SPACE) {
      this.emitCloseButtonClick();
      $event.preventDefault();
    }
  }

  protected _onFocusChange(event: FocusOrigin | null) {
    this._lastFocusOrigin.set(event);
  }

  /** @docs-private */
  emitClosedEvent() {
    this.closed.emit();
  }

  /** @docs-private */
  get classList(): string {
    if (this.direction()) {
      // Returning an array here caused an error that the classes were not set
      // after a prod build. Couldn't reproduce it properly in an isolated way.
      // As it doesn't make sense to return an array for a single value anyway
      // changed it to a string and that seems to work.
      return `nx-popover--${this.direction()}`;
    }
    return '';
  }

  /** Prevent the popover from closing when the user clicks on the popover content. */
  _onClick(event: Event) {
    event.stopPropagation();
  }
}
