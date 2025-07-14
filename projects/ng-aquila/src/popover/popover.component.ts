import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  input,
  OnDestroy,
  OnInit,
  Output,
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
  imports: [NgClass, NgStyle, NxIconModule, NgTemplateOutlet, NxButtonModule],
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
  id!: string;

  /** @docs-private */
  direction!: string;

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
   * if triggerType='click' -> 0
   * if triggerType='manual' -> whatever is set on tabIndex. Defaults to 0 on 'manual'
   */
  get tabIndex(): number | null {
    if (this.triggerType === 'manual') {
      return this._tabIndex;
    }
    return this.triggerType === 'hover' ? null : 0;
  }
  private _tabIndex: number | null = 0;

  /** @docs-private */
  arrowStyle = {};

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
      $event.preventDefault();
    }
  }

  /** @docs-private */
  emitClosedEvent() {
    this.closed.emit();
  }

  /** @docs-private */
  get classList(): string {
    if (this.direction) {
      // Returning an array here caused an error that the classes were not set
      // after a prod build. Couldn't reproduce it properly in an isolated way.
      // As it doesn't make sense to return an array for a single value anyway
      // changed it to a string and that seems to work.
      return `nx-popover--${this.direction}`;
    }
    return '';
  }

  /** Prevent the popover from closing when the user clicks on the popover content. */
  _onClick(event: Event) {
    event.stopPropagation();
  }
}
