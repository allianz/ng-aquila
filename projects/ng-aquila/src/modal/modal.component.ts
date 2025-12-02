import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule, NxStatusIconType } from '@allianz/ng-aquila/icon';
import { CdkTrapFocus, FocusMonitor } from '@angular/cdk/a11y';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { NxModalService } from './modal.service';

/** Container for the action buttons in a modal. Has a fixed position at the bottom of the modal on scroll. */
@Directive({
  selector: '[nxModalActions]',
  host: {
    '[class.nx-modal__actions]': 'true',
  },
  standalone: true,
})
export class NxModalActionsDirective {}

/** Scrollable container for the content of a modal. */
@Directive({
  selector: '[nxModalContent]',
  host: {
    '[class.nx-modal__content]': 'true',
  },
  standalone: true,
})
export class NxModalContentDirective {}

/** Title of a modal. */
@Component({
  selector: '[nxModalTitle]',
  host: {
    '[class.nx-modal__title]': 'true',
  },
  template: `@if (status()) {
      <nx-status-icon [type]="status()!" class="nx-modal__status"></nx-status-icon>
    }
    <ng-content></ng-content>`,
  imports: [NxIconModule],
})
export class NxModalTitleComponent {
  /**
   * Show icon based on status type.
   *
   * Default: `undefined`.
   */
  readonly status = input<NxStatusIconType>();
}

@Component({
  selector: 'nx-modal',
  templateUrl: 'modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./modal.component.scss'],
  host: {
    '[class.nx-modal--fixed-width]': 'size() === "fixed"',
    '[class.nx-modal--entering]': 'true',
    '[class.nx-modal--leaving]': '_isLeaving()',
  },
  imports: [CdkTrapFocus, NxIconModule, CdkScrollable, NgTemplateOutlet, NxButtonModule],
})
export class NxModalComponent implements OnInit, AfterViewInit, OnDestroy {
  private _closeButtonLabel = 'Close dialog';

  @ViewChild('closeButton') _closeButton!: ElementRef;

  /** @docs-private */
  protected _isLeaving = signal(false);

  /**
   * Sets the 'aria-label' of the modal close button needed for accessibility.
   *
   * Default: `'Close dialog'`.
   */
  @Input()
  set closeButtonLabel(value: string) {
    if (value !== this._closeButtonLabel) {
      this._closeButtonLabel = value;
      this._cdr.markForCheck();
    }
  }
  get closeButtonLabel(): string {
    return this._closeButtonLabel;
  }

  /**
   * A template reference variable pointing to the template
   * which contains the content of the modal view.
   */
  readonly body = input<TemplateRef<any>>(undefined, { alias: 'modalBody' });

  /**
   * Whether the modal view should close when the user hits the escape key.
   * Default: `true`.
   */
  readonly hideOnEsc = input(true);

  /**
   * Whether the modal view should close when the user clicks on the backdrop.
   * Default: `true`.
   */
  readonly hideOnClickOutside = input(true);

  /**
   * Whether the modal view should have a close icon in the upper right corner.
   * Default: `true`.
   */
  readonly showCloseIcon = input(true);

  /**
   * Controls the width of the dialog.
   * On `auto` the width is controlled by the content width,
   * on `fixed` the dialog gets a fixed width of 736px if the viewport is big enough.
   */
  readonly size = input<'fixed' | 'auto'>('auto', { alias: 'windowSize' });

  /**
   * An event emitted when the user clicks on the backdrop or uses the built-in close button.
   * This event can be applied in conjunction with the custom open state handling
   * of a modal to close it when requested by the user.
   */
  @Output('onModalClose') readonly closeEvent = new EventEmitter<void>();

  private readonly _destroyed = new Subject<void>();

  private removeEventListener!: () => void;

  constructor(
    private readonly modalService: NxModalService,
    private readonly eventManager: EventManager,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}

  ngOnInit(): void {
    this.modalService.close$
      .pipe(
        tap(() => this._isLeaving.set(true)),
        takeUntil(this._destroyed),
      )
      .subscribe(() => this.closeEvent.emit());

    this.removeEventListener = this.eventManager.addEventListener(
      document.body,
      'keyup.esc',
      () => {
        if (this.hideOnEsc()) {
          this.modalService.close();
        }
      },
    ) as () => void;
  }

  ngAfterViewInit(): void {
    if (this.showCloseIcon()) {
      this._focusMonitor.monitor(this._closeButton);
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this.removeEventListener();
    this._focusMonitor.stopMonitoring(this._closeButton);
  }

  /** @docs-private */
  clickOutsideModal() {
    if (this.hideOnClickOutside()) {
      this.modalService.close();
    }
  }

  /** @docs-private */
  closeButtonClick() {
    this.modalService.close();
  }

  /** @docs-private */
  cancelClick(evt: MouseEvent) {
    evt.stopPropagation();
  }
}
