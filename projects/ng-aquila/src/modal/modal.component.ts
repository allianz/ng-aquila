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
import { Subscription } from 'rxjs';
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
    private _closeButtonLabel: string = 'Close dialog';

    @ViewChild('closeButton') _closeButton!: ElementRef;

    /** Sets the 'aria-label' of the modal close button needed for accessibility.
     *
     * Default value is 'Close dialog'.
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
    @Input('nxBody') body!: TemplateRef<any>;

    /**
     * Whether the modal view should close when the user hits the escape key.
     * Default is true.
     */
    @Input('nxHideOnEsc') hideOnEsc: boolean = true;

    /**
     * Whether the modal view should close when the user clicks on the backdrop.
     * Default is true.
     */
    @Input('nxHideOnClickOutside') hideOnClickOutside: boolean = true;

    /**
     * Whether the modal view should have a close icon in the upper right corner.
     * Default is true.
     */
    @Input('nxShowCloseIcon') showCloseIcon: boolean = true;

    /**
     * Controls the width of the dialog.
     * On `auto` the width is controlled by the content width,
     * on `fixed` the dialog gets a fixed width of 736px if the viewport is big enough. */
    @Input('nxSize') size: 'fixed' | 'auto' = 'auto';

    /**
     * An event emitted when the user clicks on the backdrop or uses the built-in close button.
     * This event can be applied in conjunction with the custom open state handling
     * of a modal to close it when requested by the user.
     */
    @Output('nxClose') closeEvent = new EventEmitter<void>();

    private closeSubscription: Subscription = Subscription.EMPTY;
    private removeEventListener!: Function;

    constructor(
        private modalService: NxModalService,
        private eventManager: EventManager,
        private _cdr: ChangeDetectorRef,
        private _focusMonitor: FocusMonitor,
    ) {}

    ngOnInit() {
        this.closeSubscription = this.modalService.close$.subscribe(() => this.closeEvent.emit());

        this.removeEventListener = this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
            if (this.hideOnEsc) {
                this.modalService.close();
            }
        });
    }

    ngAfterViewInit() {
        if (this.showCloseIcon) {
            this._focusMonitor.monitor(this._closeButton);
        }
    }

    ngOnDestroy() {
        this.removeEventListener();
        this.closeSubscription.unsubscribe();
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
