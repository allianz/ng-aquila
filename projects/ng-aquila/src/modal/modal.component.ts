import { animateChild, query, transition, trigger, useAnimation } from '@angular/animations';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { NxStatusIconType } from '@aposin/ng-aquila/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fadeIn, fadeOut, scaleDown, scaleUp } from './animations';
import { NxModalService } from './modal.service';

/** Container for the action buttons in a modal. Has a fixed position at the bottom of the modal on scroll. */
@Directive({
    selector: '[nxModalActions]',
    host: {
        '[class.nx-modal__actions]': 'true',
    },
})
export class NxModalActionsDirective {}

/** Scrollable container for the content of a modal. */
@Directive({
    selector: '[nxModalContent]',
    host: {
        '[class.nx-modal__content]': 'true',
    },
})
export class NxModalContentDirective {}

/** Title of a modal. */
@Component({
    selector: '[nxModalTitle]',
    host: {
        '[class.nx-modal__title]': 'true',
    },
    template: `<nx-status-icon *ngIf="status" [type]="status" class="nx-modal__status"></nx-status-icon><ng-content></ng-content>`,
})
export class NxModalTitleComponent {
    /**
     * Show icon based on status type.
     *
     * Default: `undefined`.
     */
    @Input() status?: NxStatusIconType;
}

@Component({
    selector: 'nx-modal',
    templateUrl: 'modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./modal.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [useAnimation(fadeIn), query('@scaleUpDown', [animateChild()])]),
            transition(':leave', [query('@scaleUpDown', [animateChild()]), useAnimation(fadeOut)]),
        ]),
        trigger('scaleUpDown', [transition(':enter', useAnimation(scaleDown)), transition(':leave', useAnimation(scaleUp))]),
    ],
    host: {
        '[@fadeInOut]': '',
        '[class.nx-modal--fixed-width]': 'size === "fixed"',
    },
})
export class NxModalComponent implements OnInit, AfterViewInit, OnDestroy {
    private _closeButtonLabel = 'Close dialog';

    @ViewChild('closeButton') _closeButton!: ElementRef;

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
    @Input('modalBody') body!: TemplateRef<any>;

    /**
     * Whether the modal view should close when the user hits the escape key.
     * Default: `true`.
     */
    @Input() hideOnEsc = true;

    /**
     * Whether the modal view should close when the user clicks on the backdrop.
     * Default: `true`.
     */
    @Input() hideOnClickOutside = true;

    /**
     * Whether the modal view should have a close icon in the upper right corner.
     * Default: `true`.
     */
    @Input() showCloseIcon = true;

    /**
     * Controls the width of the dialog.
     * On `auto` the width is controlled by the content width,
     * on `fixed` the dialog gets a fixed width of 736px if the viewport is big enough.
     */
    @Input('windowSize') size: 'fixed' | 'auto' = 'auto';

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
        this.modalService.close$.pipe(takeUntil(this._destroyed)).subscribe(() => this.closeEvent.emit());

        this.removeEventListener = this.eventManager.addEventListener(document.body, 'keyup.esc', () => {
            if (this.hideOnEsc) {
                this.modalService.close();
            }
        }) as () => void;
    }

    ngAfterViewInit(): void {
        if (this.showCloseIcon) {
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
        if (this.hideOnClickOutside) {
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
