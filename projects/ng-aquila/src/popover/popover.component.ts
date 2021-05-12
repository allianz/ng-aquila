import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  OnDestroy,
  Optional,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import {NxPopoverContentDirective} from './popover-content';
import {ENTER, SPACE} from '@angular/cdk/keycodes';

@Component({
  selector: 'nx-popover',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./popover.component.scss'],
  exportAs: 'nxPopover'
})
export class NxPopoverComponent implements OnDestroy {
  /** @docs-private */
  @ViewChild(TemplateRef)
  templateRef: TemplateRef<any>;

  /** Content that will be rendered lazily. */
  @ContentChild(NxPopoverContentDirective) _lazyContent: NxPopoverContentDirective;

  /** Event emitted when the popover is closed. */
  @Output('nxClosed')
  closed = new EventEmitter<void>();

  /** @docs-private */
  closeButtonClick = new Subject<void>();

  /** @docs-private */
  id: string;

  /** @docs-private */
  direction;

  /** @docs-private */
  showCloseButton: boolean = false;

  /** @docs-private */
  arrowStyle = {};

  /** The text direction of the containing app. */
  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  constructor(@Optional() private _dir: Directionality) {}

  ngOnDestroy() {
    this.closed.complete();
  }

  // emit to notify the popover trigger directive that the close button was clicked
  /** @docs-private */
  emitCloseButtonClick() {
    this.closeButtonClick.next();
  }

  /** @docs-private */
  _onCloseKeyup($event) {
    if ($event && ($event.keyCode === ENTER || $event.keyCode === SPACE)) {
      this.emitCloseButtonClick();
    }
    $event.preventDefault();
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
  }

  /** Prevent the popover from closing when the user clicks on the popover content. */
  _onClick(event) {
    event.stopPropagation();
  }
}
